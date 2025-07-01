import { A } from "@solidjs/router";
import { type Component, For } from "solid-js";

import s from "./index.module.css";

import RightImg from "./right.svg";

import { useI18n } from "../../../../../contexts/i18n";
import type { IStream } from "../../../../../contexts/messages";
import { Header } from "./header";

export const Stream: Component<{ stream: IStream }> = ({ stream }) => {
  const { t } = useI18n();

  const visible = stream.users.slice(0, 3);
  const hidden = stream.users.slice(3);

  //

  return (
    <div class={s.root}>
      {/* <div class={s.right}>
        <RightImg />
      </div> */}

      <Header />

      <div class={s.main}>
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

        <A href={`/messages/${stream.message_id}`} class={s.link}>
          <span>{t.stream.replies({ count: stream.messages_count })}</span>
          <RightImg />
        </A>
      </div>
    </div>
  );
};
