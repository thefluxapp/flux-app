import { useParams } from "@solidjs/router";
import { For, createEffect, on, onCleanup } from "solid-js";

import s from "./index.module.css";

import { useAuth } from "../../../contexts/auth";
import { useMessages } from "../../../contexts/messages";
import { Loader } from "./loader";
import { Message } from "./message";
import { New } from "./new";
import { Stream } from "./stream";
import { useSync } from "../../../contexts/sync";

export const MessagesShowPage = () => {
  const params = useParams();
  const { authStore } = useAuth();
  const { update, clean, messagesStore } = useMessages();
  const { subscribe } = useSync();

  onCleanup(() => {
    clean();
    subscribe([]);
  });

  createEffect(
    on(
      () => params.id,
      async () => {
        clean();

        subscribe([params.id]);

        await update(params.id);
      },
    ),
  );

  return (
    <div class={s.root}>
      {messagesStore.rootStore &&
        messagesStore.rootStore.messageStore.stream !== null && (
          <div class={s.stream}>
            <Stream stream={messagesStore.rootStore.messageStore.stream} />
          </div>
        )}

      {messagesStore.cursor !== null && (
        <div class={s.loader}>
          <Loader messageId={params.id} />
        </div>
      )}

      <For each={messagesStore.listStore}>
        {({ messageStore }) => <Message message={messageStore} />}
      </For>

      {messagesStore.rootStore !== null && authStore.isAuth && <New />}
    </div>
  );
};
