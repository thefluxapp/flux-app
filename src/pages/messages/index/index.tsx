import { Title } from "@solidjs/meta";
import { A, useLocation, useMatch } from "@solidjs/router";
import { For, createEffect } from "solid-js";

import s from "./index.module.css";

import { useAuth } from "../../../contexts/auth";
import { useI18n } from "../../../contexts/i18n";
import { useStreams } from "../../../contexts/streams";
import { Stream } from "./stream";

export const MessagesIndexPage = () => {
  const location = useLocation();
  const { streamsStore, update } = useStreams();
  const { t } = useI18n();
  const { authStore } = useAuth();
  const isMyPage = useMatch(() => "/messages/my");

  createEffect(async () => {
    const my = location.pathname === "/messages/my";

    await update(my);
  });

  return (
    <>
      <Title>{t.streams.meta.title()}</Title>

      <div class={s.tabs}>
        <A href="/messages" end={true} class={s.tab} activeClass={s.active}>
          {t.streams.all()}
        </A>

        <A href="/messages/my" class={s.tab} activeClass={s.active}>
          {t.streams.my.title()}
        </A>
      </div>

      <div class={s.root}>
        {Boolean(isMyPage()) && !authStore.isAuth && (
          <div class={s.empty}>{t.streams.my.empty()}</div>
        )}

        <For each={streamsStore.streams}>
          {(stream) => <Stream stream={stream} />}
        </For>
      </div>
    </>
  );
};
