import type { Component, JSX } from "solid-js";
import { createStore } from "solid-js/store";

import s from "./index.module.css";

import { useAuth } from "../../../../contexts/auth";
import { useI18n } from "../../../../contexts/i18n";
import { IState, useMessages } from "../../../../contexts/messages";
import { nanoid } from "nanoid";

export const New: Component = () => {
  const { authStore } = useAuth();
  const { append, messagesStore } = useMessages();
  const { t } = useI18n();

  const [form, setForm] = createStore({
    text: "",
  });

  const handleSubmit: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async (
    e,
  ) => {
    e.preventDefault();

    if (authStore.user === null || messagesStore.rootStore === null)
      return null;

    const code = nanoid();

    // e.target.innerHTML = "";

    append([
      {
        message_id: messagesStore.rootStore.messageStore.message_id,
        text: form.text,
        code,
        state: IState.New,
        order: (performance.timeOrigin + performance.now()) * 1000,
        user: authStore.user,
      },
    ]);
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

          <textarea
            contenteditable={true}
            class={s.input}
            // textContent={form.text}
            value={"QQQ"}
            onInput={(e) => {
              e.preventDefault();
              setForm("text", e.target.textContent || "");
            }}
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
