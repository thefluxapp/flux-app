import { useParams } from "@solidjs/router";
import { For, createEffect, onCleanup } from "solid-js";

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
      <For each={messagesStore.listStore}>
        {({ messageStore }) => <Message message={messageStore} />}
      </For>

      {messagesStore.rootStore !== null && authStore.isAuth && <New />}
    </div>
  );
};
