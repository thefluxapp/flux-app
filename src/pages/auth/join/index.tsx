import type { JSX, Setter } from "solid-js";
import { createStore } from "solid-js/store";

import { useAPI } from "../../../contexts/api";
// import { useRoot } from "../../../contexts/root";
import type { CredentialOptions } from "../entities";

import s from "./index.module.css";

export const Join = ({
  setCredentialOptions,
}: { setCredentialOptions: Setter<CredentialOptions> }) => {
  // const { rootStore, updateToken } = useRoot();
  const api = useAPI();

  const [form, setForm] = createStore({
    email: "",
  });

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e,
  ) => {
    e.preventDefault();

    if (form.email.length < 3) return;

    const data = await api.auth.join({ email: form.email });
    if (data.creation != null) {
      setCredentialOptions({ creation: data.creation, request: null });
    }

    if (data.request != null) {
      setCredentialOptions({ creation: null, request: data.request });
    }
  };

  return (
    <div class={s.root}>
      <div class={s.title}>
        Войти и зарегаться можно через Passkey (Face ID или отпечаток пальца)
      </div>

      <div class={s.desc}>
        Почта используется как идентификатор и чтобы можно было восстановить
        потом доступ. Никаких кодов подтверждения отсылаться не будет.
      </div>

      <form class={s.form} onSubmit={handleSubmit}>
        <div class={s.field}>
          <label class={s.label} for="email">
            Email
          </label>

          <input
            class={s.input}
            type="email"
            name="email"
            id="email"
            required
            value={form.email}
            onInput={(e) => setForm("email", e.target.value)}
          />
        </div>

        <div class={s.submit}>
          <button
            class={s.button}
            type="submit"
            disabled={form.email.length < 3}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};
