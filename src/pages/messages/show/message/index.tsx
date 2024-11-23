import type { Component } from "solid-js";
import { A } from "@solidjs/router";

import s from "./index.module.css";

import { useMessages, type IMessage } from "../../../../contexts/messages";
import { useI18n } from "../../../../contexts/i18n";
import { Stream } from "../stream";

export const Message: Component<{ message: IMessage }> = ({ message }) => {
  const { t } = useI18n();
  const { messagesStore } = useMessages();

  return (
    <>
      <div class={s.root}>
        <div>
          <div class={s.image} style={{ background: message.user.color }}>
            {message.user.abbr}
          </div>
        </div>
        <div>
          <div class={s.user}>{message.user.name}</div>

          <div class={s.text}>{message.text}</div>

          {message.stream && (
            <Stream stream={message.stream} message={message} />
          )}

          <div class={s.actions}>
            <div class={s.date}>21:50</div>

            <div class={s.like}>{t.message.like()}</div>

            {messagesStore.message?.message_id !== message.message_id && (
              <A href={`/messages/${message.message_id}`} class={s.reply}>
                {t.message.reply()}
              </A>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
