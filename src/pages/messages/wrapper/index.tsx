import { type ParentComponent } from "solid-js";

import s from "./index.module.css";

import { MessagesNew } from "./new";

export const MessagesWrapper: ParentComponent = (props) => {
  return (
    <>
      <div class={s.new}>
        <MessagesNew />
      </div>

      {props.children}
    </>
  );
};
