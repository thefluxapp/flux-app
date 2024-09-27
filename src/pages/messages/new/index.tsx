import type { JSX } from "solid-js";
import { createStore } from "solid-js/store";

import s from "./index.module.css";

import { useAPI } from "../../../contexts/api";
import { useNavigate } from "@solidjs/router";

export const MessagesNewPage = () => {
  const api = useAPI();
  const navigate = useNavigate()

  const [form, setForm] = createStore({
    title: "",
    text: "",
  });

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e,
  ) => {
    e.preventDefault();

    const data = await api.messages.create_message_stream({ title: form.title, text: form.text });
    navigate(`/streams/${data.stream.id}`)
  };

  return (
    <div class={s.root}>
      <form class={s.form} onSubmit={handleSubmit}>
        <div class={s.row}>
          <label class={s.label} for="title">
            Заголовок
          </label>

          <div class={s.input}>
            <input
              class={s.field}
              type="text"
              name="title"
              id="title"
              required
              value={form.title}
              onInput={(e) => setForm("title", e.target.value)}
            />
          </div>
        </div>

        <div class={s.row}>
          <label class={s.label} for="text">
            Текст
          </label>

          <div class={s.input}>
            <textarea
              class={s.field}
              name="text"
              id="text"
              required
              value={form.text}
              onInput={(e) => setForm("text", e.target.value)}
            />
          </div>
        </div>

        <div class={s.submit}>
          <button class={s.button} type="submit" disabled={form.title.length < 3 || form.text.length < 3}>
            Создать
          </button>
        </div>
      </form>
    </div>
  );
};
