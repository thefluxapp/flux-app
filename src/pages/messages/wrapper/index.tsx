import { A, useMatch } from "@solidjs/router";
import { Show, type ParentComponent } from "solid-js";

import s from "./index.module.css";
import { MessagesNew } from "./new";

export const MessagesWrapper: ParentComponent = (props) => {
  const isStreamsNew = useMatch(() => "/messages/new");

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
              Все стримы
            </A>
            <A href="/messages/my" class={s.link} activeClass={s.active}>
              Только мои
            </A>
          </div>
        </Show>
      </div>

      {props.children}
    </>
  );
};
