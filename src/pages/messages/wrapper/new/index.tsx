import { useMatch, useNavigate } from "@solidjs/router";
import { Show, type JSX } from "solid-js";
import { createStore } from "solid-js/store";

import { useAuth } from "../../../../contexts/auth";
import { useAPI } from "../../../../contexts/api";

import SubmitImg from "./right.svg";

import s from "./index.module.css";
import { nanoid } from "nanoid";

export const MessagesNew = () => {
  const navigate = useNavigate();
  const { authStore } = useAuth();
  const api = useAPI();
  const isNew = useMatch(() => "/messages/new");

  const [form, setForm] = createStore({
    text: "",
  });

  const handleFocus: JSX.EventHandler<HTMLDivElement, FocusEvent> = async (
    e,
  ) => {
    e.preventDefault();

    if (!isNew()) {
      navigate("/messages/new");
    } else {
      // Clear input and remove cursor
    }
  };

  const handleSubmit: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async (
    e,
  ) => {
    e.preventDefault();

    const code = nanoid();

    const res = await api.messages.create_message({
      text: form.text,
      code,
    });

    navigate(`/messages/${res.message.message_id}`);
  };

  return (
    <div class={s.root} classList={{ [s.active]: Boolean(isNew()) }}>
      <div
        contentEditable="plaintext-only"
        title="Create new message..."
        onFocus={handleFocus}
        class={s.input}
        onInput={(e) => setForm("text", e.target.textContent || "")}
      />

      <Show when={authStore.user !== null}>
        <div class={s.submit}>
          <button
            class={s.button}
            type="button"
            disabled={form.text.length < 3}
            onClick={handleSubmit}
          >
            <SubmitImg />
          </button>
        </div>
      </Show>
    </div>
  );
};
