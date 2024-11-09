import { useParams } from "@solidjs/router";
import { For, Show, createEffect, onCleanup } from "solid-js";

import s from "./index.module.css";

import { useAuth } from "../../../contexts/auth";
import { useMessages } from "../../../contexts/messages";
import { Message } from "./message";
import { New } from "./new";

export const MessagesShowPage = () => {
  const params = useParams();
  const { authStore } = useAuth();
  const { update, clean, messagesStore } = useMessages();

  onCleanup(() => {
    clean();
  });

  createEffect(async () => {
    await update(params.id);
  });

  return (
    <div class={s.root}>
      <For each={messagesStore.messages}>
        {(message) => <Message message={message} />}
      </For>

      <Show when={authStore.isAuth}>
        <New />
      </Show>
    </div>
  );
};
