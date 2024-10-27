import { useLocation, A } from "@solidjs/router";
import { For, createEffect } from "solid-js";

import s from "./index.module.css";

import { useStreams } from "../../../contexts/streams";

export const MessagesIndexPage = () => {
  const location = useLocation();
  const { streamsStore, update } = useStreams();

  createEffect(async () => {
    console.log(location.pathname);

    await update();
  });

  return (
    <div class={s.root}>
      <For each={streamsStore.streams}>
        {(stream) => (
          <A href={`/messages/${stream.message_id}`} class={s.stream}>
            <div class={s.text}>
              {stream.text !== null ? stream.text : "..."}
            </div>
          </A>
        )}
      </For>
    </div>
  );
};
