import { A, useMatch } from "@solidjs/router";
import { Show, type ParentComponent } from "solid-js";

import s from "./index.module.css";

import { MessagesNew } from "./new";
import { useI18n } from "../../../contexts/i18n";

export const MessagesWrapper: ParentComponent = (props) => {
  const isStreamsNew = useMatch(() => "/messages/new");
  const { t } = useI18n();

  return (
    <>
      <div class={s.new}>
        <MessagesNew />
      </div>

      <div class={s.tabs}>
        <Show when={!isStreamsNew()}>
          <div>
            <A
              href="/messages"
              end={true}
              class={s.link}
              activeClass={s.active}
            >
              {t.streams.all()}
            </A>
            <A href="/messages/my" class={s.link} activeClass={s.active}>
              {t.streams.my()}
            </A>
          </div>
        </Show>
      </div>

      {props.children}
    </>
  );
};
