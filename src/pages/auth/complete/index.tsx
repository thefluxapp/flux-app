import type { CredentialCreationOptionsJSON } from "@github/webauthn-json";
import { createExtended } from "@github/webauthn-json/extended";
import { useNavigate } from "@solidjs/router";
import type { JSX } from "solid-js";
import { createStore } from "solid-js/store";

import s from "./index.module.css";

import { useAPI } from "../../../contexts/api";
import { useI18n } from "../../../contexts/i18n";
import { useRoot } from "../../../contexts/root";

export const Complete = ({
  creation,
}: { creation: CredentialCreationOptionsJSON }) => {
  const { updateToken } = useRoot();
  const api = useAPI();
  const { t } = useI18n();
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
        last_name: form.last_name,
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
      navigate("/messages");
    }
  };

  return (
    <div class={s.root}>
      <div class={s.title}>{t.complete.title()}</div>

      <div class={s.desc}>{t.complete.desc()}</div>

      <form class={s.form} onSubmit={handleSubmit}>
        <div class={s.field}>
          <label class={s.label} for="first_name">
            {t.complete.first_name()}
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
            {t.complete.last_name()}
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
          <button
            class={s.button}
            type="submit"
            disabled={form.first_name.length < 3 || form.last_name.length < 3}
          >
            {t.complete.button()}
          </button>
        </div>
      </form>
    </div>
  );
};
