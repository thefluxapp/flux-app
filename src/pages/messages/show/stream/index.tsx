import { type Component, For } from "solid-js";
import { A } from "@solidjs/router";

import s from "./index.module.css";

import { useI18n } from "../../../../contexts/i18n";
import type { IStream, MessageStore } from "../../../../contexts/messages";

export const Stream: Component<{ stream: IStream; message: MessageStore }> = ({
  stream,
  message,
}) => {
  const { t } = useI18n();

  const visible = stream.users.slice(0, 3);
  const hidden = stream.users.slice(3);

  return (
    <A href={`/messages/${message.message_id}`} class={s.root}>
      <div class={s.text}>{stream.text}</div>

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
