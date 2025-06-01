import { A } from "@solidjs/router";
import type { Component } from "solid-js";

import s from "./index.module.css";

import { useI18n } from "../../../../contexts/i18n";
import { type MessageStore, useMessages } from "../../../../contexts/messages";
import { Stream } from "./stream";

export const Message: Component<{ message: MessageStore }> = ({ message }) => {
  const { t } = useI18n();
  const { messagesStore } = useMessages();

  const createdAt = Intl.DateTimeFormat().format(
    new Date(message.order / 1000),
  );

  return (
    <>
      <div class={s.root}>
        <div>
          <div class={s.image} style={{ background: message.user.color }}>
            {message.user.abbr}
          </div>
        </div>

        <div class={s.message}>
          <div class={s.user}>{message.user.name}</div>

          <div class={s.text}>{message.text}</div>

          <div class={s.actions}>
            <div class={s.date}>{createdAt}</div>

            <div class={s.like}>{t.message.like()}</div>

            {messagesStore.rootStore?.messageStore.message_id !==
              message.message_id &&
              !message.stream && (
                <A href={`/messages/${message.message_id}`} class={s.reply}>
                  {t.message.reply()}
                </A>
              )}

            <div class={s.state}>{message.state}</div>
          </div>

          {message.stream && (
            <div class={s.stream}>
              <Stream stream={message.stream} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
