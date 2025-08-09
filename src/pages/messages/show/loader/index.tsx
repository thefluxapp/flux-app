import type { Component } from "solid-js";

import s from "./index.module.css";

import { useI18n } from "../../../../contexts/i18n";
import { useMessages } from "../../../../contexts/messages";

export const Loader: Component<{ messageId: string }> = ({ messageId }) => {
  const { t } = useI18n();
  const { update } = useMessages();

  return (
    <div class={s.root}>
      <div>
        <div class={s.image}>99+</div>
      </div>

      <div class={s.content}>
        <div class={s.desc}>TODO: {t.loader.desc()}</div>

        <div class={s.loader}>
          <button
            class={s.button}
            type="button"
            onClick={async () => {
              await update(messageId, false);
            }}
          >
            {t.loader.button()}
          </button>
          {/* <div class={s.unread}>&bull;&nbsp;{t.loader.unread()}</div> */}
        </div>
      </div>
    </div>
  );
};
