import { A } from "@solidjs/router";
import { type Component, Show, createSignal } from "solid-js";

import s from "./index.module.css";

import { useI18n } from "../../../../contexts/i18n";
import { type MessageStore, useMessages } from "../../../../contexts/messages";
import { Stream } from "./stream";

import AiImg from "./ai.svg";
import BottomImg from "./bottom.svg";
import RightImg from "./right.svg";

export const Message: Component<{ message: MessageStore }> = ({ message }) => {
  const { t } = useI18n();
  const { messagesStore } = useMessages();
  const [toggled, setToggled] = createSignal(false);

  const createdAt = Intl.DateTimeFormat().format(
    new Date(message.order / 1000),
  );

  const toggle = () => {
    setToggled(!toggled());
  };

  return (
    <>
      <div class={s.root}>
        <div>
          <div class={s.image} style={{ background: message.user.color }}>
            {message.user.abbr}
          </div>
        </div>

        <div class={s.message}>
          <div class={s.header}>
            <div class={s.user}>{message.user.name}</div>

            <div class={s.datetime}>{createdAt}</div>
          </div>

          <div class={s.text}>{message.text}</div>

          <div class={s.actions}>
            <div class={s.like}>
              <span>{t.message.like()}</span>
            </div>

            {messagesStore.rootStore?.messageStore.message_id !==
              message.message_id && (
              <>
                {message.stream && (
                  <button type="button" class={s.replies} onClick={toggle}>
                    <AiImg class={s.ai} />

                    <span>
                      {t.message.replies({
                        count: message.stream.messages_count,
                      })}
                    </span>

                    <BottomImg class={s.bottom} />
                  </button>
                )}

                {!message.stream && (
                  <A href={`/messages/${message.message_id}`} class={s.reply}>
                    <span>{t.message.reply()}</span>

                    <RightImg class={s.right} />
                  </A>
                )}
              </>
            )}

            <div class={s.state}>{message.state}</div>
          </div>

          {message.stream && (
            <Show when={toggled()}>
              <div class={s.stream}>
                <Stream stream={message.stream} />
              </div>
            </Show>
          )}
        </div>
      </div>
    </>
  );
};
