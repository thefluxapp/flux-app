import { useLocation } from "@solidjs/router";
import { For, createEffect } from "solid-js";

import s from "./index.module.css";

import { useStreams } from "../../../contexts/streams";
import { Stream } from "./stream";

export const MessagesIndexPage = () => {
  const location = useLocation();
  const { streamsStore, update } = useStreams();

  createEffect(async () => {
    const my = location.pathname === "/messages/my";

    await update(my);
  });

  return (
    <div class={s.root}>
      <For each={streamsStore.streams}>
        {(stream) => <Stream stream={stream} />}
      </For>
    </div>
  );
};
