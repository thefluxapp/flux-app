import type { Component } from "solid-js";

import type { IMessage } from "../../../../contexts/messages";

import s from "./index.module.css";

export const Message: Component<{ message: IMessage }> = ({ message }) => {
  return (
    <>
      <div class={s.root}>
        <div class={s.user}>{message.user.name}</div>
        <div>{message.text}</div>

        {message.stream && <div class={s.stream}>{message.stream.text}</div>}
      </div>
    </>
  );
};
