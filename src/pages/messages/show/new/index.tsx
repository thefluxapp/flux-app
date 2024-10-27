import type { Component, JSX } from "solid-js";
import { createStore } from "solid-js/store";

import { useAPI } from "../../../../contexts/api";
import { useAuth } from "../../../../contexts/auth";

import s from "./index.module.css";

export const New: Component = () => {
  const api = useAPI();
  const { authStore } = useAuth();

  const [form, setForm] = createStore({
    text: "",
  });

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e,
  ) => {
    e.preventDefault();

    // if (authStore.user === null) return null;

    // await api.messages.create_message({
    //   text: form.text,
    //   message_id: streamStore.stream.message_id,
    // });
  };

  return (
    <div class={s.root}>
      <form class={s.form} onSubmit={handleSubmit}>
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
            type="submit"
            disabled={form.text.length < 3}
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};
