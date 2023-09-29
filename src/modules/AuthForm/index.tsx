import { useEffect, useState } from "react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from "@simplewebauthn/typescript-types";
import { observer } from "mobx-react";
import { useRootContext } from "../../context";
import { type IChallenge, type IForm } from "./entities";

import s from "./index.module.css";

export const AuthForm = observer(() => {
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
    if (challenge.request == null) return;

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
    if (challenge.creation == null) return;

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
  };

  const handleSubmit = async function (e: React.SyntheticEvent) {
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
      <div className={s.main}>
        <form onSubmit={handleSubmit}>
          <div className={s.item}>
            <div className={s.label}>E-mail</div>

            <div className={s.input}>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className={s.desc}>
              Регаться и входить можно будет через Face ID, но пока для
              эксперимента на всякий случай добавил e-mail
            </div>
          </div>

          {!isRegister && (
            <button type="submit" className={s.button}>
              Войти
            </button>
          )}

          {isRegister && (
            <>
              <div>
                <input
                  value={form.first_name}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  value={form.last_name}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={
                  form.first_name.length < 3 || form.last_name.length < 3
                }
              >
                Register
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
});
