import type { Component } from "solid-js";

import s from "./index.module.css";

import { useI18n } from "../../../../contexts/i18n";

export const Loader: Component = () => {
  const { t } = useI18n();

  return (
    <div class={s.root}>
      <div>
        <div class={s.image} />
      </div>

      <div class={s.content}>
        <div class={s.desc}>TODO: {t.loader.desc()}</div>

        <div class={s.loader}>
          <button class={s.button} type="button">
            {t.loader.button()}
          </button>
          <div class={s.unread}>&bull;&nbsp;{t.loader.unread()}</div>
        </div>
      </div>
    </div>
  );
};
