import type { Component, JSX } from "solid-js";
import { createStore } from "solid-js/store";

import s from "./index.module.css";

import { useAuth } from "../../../../contexts/auth";
import { useI18n } from "../../../../contexts/i18n";
import {
  IState,
  useMessages,
  type IMessage,
} from "../../../../contexts/messages";
import { nanoid } from "nanoid";

export const New: Component<{ message: IMessage }> = ({ message }) => {
  const { authStore } = useAuth();
  const { append } = useMessages();
  const { t } = useI18n();

  const [form, setForm] = createStore({
    text: "",
  });

  const handleSubmit: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async (
    e,
  ) => {
    e.preventDefault();

    if (authStore.user === null) return null;

    const code = nanoid();

    append([
      {
        message_id: message.message_id,
        text: form.text,
        code,
        state: IState.New,
        order: (performance.timeOrigin + performance.now()) * 1000,
      },
    ]);

    // await api.messages.create_message({
    //   text: form.text,
    //   message_id: message.message_id,
    //   code,
    // });
  };

  return (
    <div class={s.root}>
      <div>
        <div class={s.image} style={{ background: authStore.user?.color }}>
          {authStore.user?.abbr}
        </div>
      </div>

      <div>
        <div class={s.field}>
          <div class={s.label}>{authStore.user?.name}</div>

          <div
            contenteditable={true}
            class={s.input}
            onInput={(e) => setForm("text", e.target.textContent || "")}
          />
        </div>

        <div class={s.submit}>
          <button
            class={s.button}
            type="button"
            onClick={handleSubmit}
            disabled={form.text.length < 3}
          >
            {t.message.submit()}
          </button>
        </div>
      </div>
    </div>
  );
};
