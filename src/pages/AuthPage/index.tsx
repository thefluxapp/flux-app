import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from "@simplewebauthn/typescript-types";
import axios from "axios";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ResponseData } from "./data";
import { type IChallenge, type IForm } from "./entities";
import { useRootContext } from "../../context";

import s from "./index.module.css";

export const AuthPage = observer(() => {
  const rootStore = useRootContext();
  const navigate = useNavigate();

  const [form, setForm] = useState<IForm>({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [challenge, setChallenge] = useState<IChallenge>({
    request: null,
    creation: null,
  });

  const tryJoin = async () => {
    const res = (
      await axios.post<{
        id: string;
        challenge: {
          creation_challenge_response?: {
            publicKey: PublicKeyCredentialCreationOptionsJSON;
          };
          request_challenge_response?: {
            publicKey: PublicKeyCredentialRequestOptionsJSON;
          };
        };
      }>("/api/auth/join", { email: form.email })
    ).data;

    if (res.challenge.creation_challenge_response) {
      setChallenge({
        creation: {
          id: res.id,
          key: res.challenge.creation_challenge_response.publicKey,
        },
        request: null,
      });
    } else if (res.challenge.request_challenge_response) {
      setChallenge({
        request: {
          id: res.id,
          key: res.challenge.request_challenge_response.publicKey,
        },
        creation: null,
      });
    } else {
      setChallenge({
        request: null,
        creation: null,
      });
    }
  };

  const isRegister = challenge?.creation !== null;

  const tryLogin = async () => {
    if (challenge.request == null) return null;

    const auth = await startAuthentication(challenge.request.key, false);
    const data = (
      await axios.post<ResponseData>("/api/auth/login", {
        id: challenge.request.id,
        auth,
      })
    ).data;

    rootStore.authStore.auth(data.token);
    navigate("/");
  };

  const tryRegister = async () => {
    if (challenge.creation == null) return null;

    const reg = await startRegistration(challenge.creation.key);
    const data = (
      await axios.post<ResponseData>("/api/auth/complete", {
        id: challenge.creation.id,
        reg,
        first_name: form.first_name,
        last_name: form.last_name,
      })
    ).data;

    rootStore.authStore.auth(data.token);
    navigate("/");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (challenge.creation != null) {
      tryRegister();
    }
    if (challenge.request == null) {
      tryJoin();
    }
  };

  useEffect(() => {
    if (rootStore.isAuth) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (challenge.request !== null) {
      tryLogin();
    }
  }, [challenge]);

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit}>
        {!isRegister && (
          <>
            <div className={s.text}>
              <div className={s.title}>Аутентификация</div>
              <div className={s.desc}>
                Войти и зарегаться можно через Passkey (Face ID или отпечаток
                пальца). Почта на всякий случай для восстановления.
              </div>
            </div>

            <div className={s.item}>
              <div className={s.label}>E-mail</div>

              <div className={s.input}>
                <input
                  value={form.email}
                  type="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className={s.submit}>
              <button
                type="submit"
                className={s.button}
                disabled={form.email.trim() === ""}
              >
                Войти
              </button>
            </div>
          </>
        )}

        {isRegister && (
          <>
            <div className={s.text}>
              <div className={s.title}>Регистрация</div>
              <div className={s.desc}>
                Нет юзера с такой почтой, но это не проблема, нужно указать лишь
                имя и фамилию чтобы начать пользоваться. Имя обязательно нужно
                нормальное для AI, фамилия пофик.
              </div>
            </div>

            <div className={s.item}>
              <div className={s.label}>Имя</div>

              <div className={s.input}>
                <input
                  value={form.first_name}
                  name="first_name"
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className={s.item}>
              <div className={s.label}>Фамилия</div>

              <div className={s.input}>
                <input
                  value={form.last_name}
                  name="last_name"
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className={s.submit}>
              <button
                className={s.button}
                type="submit"
                disabled={
                  form.first_name.length < 3 || form.last_name.length < 3
                }
              >
                Зарегаться
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
});
