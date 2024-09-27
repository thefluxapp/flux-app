import { useLocation } from "@solidjs/router";
import { For, createEffect } from "solid-js";

import s from "./index.module.css";

import { useStreams } from "../../../contexts/streams";

export const StreamsIndexPage = () => {
  const location = useLocation();
  const { streamsStore } = useStreams();

  createEffect(() => {
    console.log(location.pathname);
  });

  return (
    <div class={s.root}>
      <For each={streamsStore.streams}>
        {(stream) => (
          <a href={`/streams/${stream.id}`} class={s.stream}>
            <div class={s.title}>{stream.title}</div>
            <div class={s.text}>
              {stream.text !== null ? stream.text : "..."}
            </div>
          </a>
        )}
      </For>
    </div>
  );
};
