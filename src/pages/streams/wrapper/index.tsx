import { A } from "@solidjs/router";
import type { ParentComponent } from "solid-js";

import s from "./index.module.css";

export const StreamsWrapper: ParentComponent = (props) => {
  return (
    <>
      <div class={s.root}>
        <A href="/streams" end={true} class={s.link} activeClass={s.active}>
          Все стримы
        </A>
        <A href="/streams/my" class={s.link} activeClass={s.active}>
          Только мои
        </A>
        <A href="/streams/new" class={s.link} activeClass={s.active}>
          Начать новый
        </A>
      </div>

      {props.children}
    </>
  );
};
