import { Title } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";
import { For, createEffect } from "solid-js";

import s from "./index.module.css";

import { useI18n } from "../../../contexts/i18n";
import { useStreams } from "../../../contexts/streams";
import { Stream } from "./stream";

export const MessagesIndexPage = () => {
  const location = useLocation();
  const { streamsStore, update } = useStreams();
  const { t } = useI18n();

  createEffect(async () => {
    const my = location.pathname === "/messages/my";

    await update(my);
  });

  return (
    <>
      <Title>{t.streams.meta.title()}</Title>

      <div class={s.root}>
        <For each={streamsStore.streams}>
          {(stream) => <Stream stream={stream} />}
        </For>
      </div>
    </>
  );
};
