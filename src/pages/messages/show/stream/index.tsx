import { A } from "@solidjs/router";
import type { Component } from "solid-js";

import s from "./index.module.css";

import LeftImg from "./left.svg";
import MessagesImg from "./messages.svg";

import type { IStream } from "../../../../contexts/messages";

export const Stream: Component<{ stream: IStream }> = ({ stream }) => {
  return (
    <A class={s.root} href={`/messages/${stream.message_id}`}>
      <div class={s.image}>
        <LeftImg class={s.left} />
      </div>

      <div class={s.stream}>
        <div class={s.text}>{stream.text}</div>

        <div class={s.metas}>
          <div class={s.meta}>
            <MessagesImg />
            <span>{stream.messages_count}</span>
          </div>
        </div>
      </div>
    </A>
  );
};
