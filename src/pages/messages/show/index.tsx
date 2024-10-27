import { useParams, A } from "@solidjs/router";
import { For, Show, createEffect, onCleanup } from "solid-js";

import { useAuth } from "../../../contexts/auth";
import { useMessages } from "../../../contexts/messages";
import { Message } from "./message";
import { New } from "./new";

import s from "./index.module.css";

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
        {(message) => (
          <>
            {messagesStore.message?.message_id === message.message_id && (
              <Message message={message} />
            )}

            {messagesStore.message?.message_id !== message.message_id && (
              <A href={`/messages/${message.message_id}`} class={s.a}>
                <Message message={message} />
              </A>
            )}
          </>
        )}
      </For>

      <Show when={authStore.isAuth}>
        <New />
      </Show>
    </div>
  );
};
