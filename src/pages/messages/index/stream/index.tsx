import { For, type Component } from "solid-js";
import { A } from "@solidjs/router";

import s from "./index.module.css";

import ProgressImg from "./progress.svg";

import type { IStream } from "../../../../contexts/messages";
import { useI18n } from "../../../../contexts/i18n";

export const Stream: Component<{ stream: IStream }> = ({ stream }) => {
  const { t } = useI18n();

  const visible = stream.users.slice(0, 3);
  const hidden = stream.users.slice(3);

  return (
    <A href={`/messages/${stream.message_id}`} class={s.root}>
      {stream.text === null && (
        <div class={s.shimmer}>
          <ProgressImg />
          <div>{t.stream.summarizing()}</div>
        </div>
      )}

      {stream.text !== null && <div class={s.text}>{stream.text}</div>}

      <div class={s.users}>
        <div class={s.images}>
          <For each={visible}>
            {(user) => (
              <div class={s.image} style={{ background: user.color }}>
                {user.abbr}
              </div>
            )}
          </For>
        </div>

        <div class={s.names}>
          {`${visible.map((user) => user.first_name).join(", ")} `}

          {hidden.length > 0 && t.stream.more({ count: hidden.length })}
        </div>
      </div>
    </A>
  );
};
