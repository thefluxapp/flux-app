import type { CredentialCreationOptionsJSON } from "@github/webauthn-json";
import { createExtended } from "@github/webauthn-json/extended";
import { useNavigate } from "@solidjs/router";
import type { JSX } from "solid-js";
import { createStore } from "solid-js/store";

import { useAPI } from "../../../contexts/api";
import { useRoot } from "../../../contexts/root";

import s from "./index.module.css";

export const Complete = ({
  creation,
}: { creation: CredentialCreationOptionsJSON }) => {
  const { updateToken } = useRoot();
  const api = useAPI();
  const navigate = useNavigate();

  const [form, setForm] = createStore({
    first_name: "",
    last_name: "",
  });

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e,
  ) => {
    e.preventDefault();

    const credential = await createExtended(creation);
    const public_key = credential.response.getPublicKey?.();
    const public_key_algorithm = credential.response.getPublicKeyAlgorithm?.();

    if (public_key != null && public_key_algorithm != null) {
      const data = await api.auth.complete({
        first_name: form.first_name,
        last_name: form.first_name,
        credential: {
          ...credential,
          response: {
            ...credential.response,
            publicKey: public_key,
            publicKeyAlgorithm: public_key_algorithm,
          },
        },
      });

      updateToken(data.jwt);
      navigate("/streams");
    }
  };

  return (
    <div class={s.root}>
      <div class={s.title}>
        Нет аккаунта с такой почтой, нужно завершить регистрацию
      </div>

      <div class={s.desc}>
        Имя и фамилия используются нейросетью, поэтому их обязательно нужно
        заполнить, а если указать ненастоящие, то возможно алгоритмы будут хуже
        работать.
      </div>

      <form class={s.form} onSubmit={handleSubmit}>
        <div class={s.field}>
          <label class={s.label} for="first_name">
            Имя
          </label>

          <input
            class={s.input}
            type="text"
            name="first_name"
            id="first_name"
            required
            value={form.first_name}
            onInput={(e) => setForm("first_name", e.target.value)}
          />
        </div>

        <div class={s.field}>
          <label class={s.label} for="last_name">
            Фамилия
          </label>

          <input
            class={s.input}
            type="text"
            name="last_name"
            id="last_name"
            required
            value={form.last_name}
            onInput={(e) => setForm("last_name", e.target.value)}
          />
        </div>

        <div class={s.submit}>
          <button class={s.button} type="submit">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
