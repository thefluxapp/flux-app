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
    // console.log("CLEAN UP");
    clean();
  });

  createEffect(async () => {
    // console.log("UPDATE");
    await update(params.id);
  });

  // console.log(messagesStore.messages);

  // return <>QQ</>;

  return (
    <div class={s.root}>
      <For each={Object.values(messagesStore.listStore)}>
        {({ message }) => <Message message={message} />}
      </For>

      {messagesStore.rootStore !== null && authStore.isAuth && (
        <New message={messagesStore.rootStore.message} />
      )}
    </div>
  );
};
