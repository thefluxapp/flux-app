import { useParams } from "@solidjs/router";
import { For, type JSX, Show, createEffect, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import s from "./index.module.css";

import { useAPI } from "../../../contexts/api";
import { useStream } from "../../../contexts/stream";
import { useAuth } from "../../../contexts/auth";

export const StreamsShowPage = () => {
  const params = useParams();
  const api = useAPI();
  const { authStore } = useAuth();
  const { update, streamStore } = useStream();

  const [form, setForm] = createStore({
    text: "",
  });

  onMount(() => {
    console.log("MOUNT");
    console.log(params.id);
  });

  createEffect(async () => {
    // const data = api.messages.show()

    await update(params.id);
  });

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (
    e,
  ) => {
    e.preventDefault();

    if (streamStore.stream === undefined) return null;

    await api.messages.create_message({
      text: form.text,
      message_id: streamStore.stream.message_id,
    });
  };

  return (
    <div class={s.root}>
      <For each={streamStore.messages}>
        {(message) => <div>{message.text}</div>}
      </For>

      <Show when={authStore.isAuth}>
        <div>
          <form class={s.form} onSubmit={handleSubmit}>
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
      </Show>
    </div>
  );
};
