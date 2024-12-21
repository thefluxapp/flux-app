import type { JSX, Setter } from "solid-js";
import { createStore } from "solid-js/store";

import s from "./index.module.css";

import { useAPI } from "../../../contexts/api";
import type { CredentialOptions } from "../entities";
import { useI18n } from "../../../contexts/i18n";

export const Join = ({
  setCredentialOptions,
}: { setCredentialOptions: Setter<CredentialOptions> }) => {
  const api = useAPI();
  const { t } = useI18n();

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
      <div class={s.title}>{t.login.title()}</div>
      <div class={s.desc}>{t.login.desc()}</div>

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

        <div class={s.hint}>{t.login.hint()}</div>

        <div class={s.submit}>
          <button
            class={s.button}
            type="submit"
            disabled={form.email.length < 3}
          >
            {t.login.button()}
          </button>
        </div>
      </form>
    </div>
  );
};

// Почта используется как идентификатор и чтобы можно было восстановить
// потом доступ. Никаких кодов подтверждения отсылаться не будет.
