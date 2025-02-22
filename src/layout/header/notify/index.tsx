import { A } from "@solidjs/router";
import type { Component } from "solid-js";

import s from "./index.module.css";

import NotifyImg from "./notify.svg";

export const Notify: Component = () => {
  return (
    <A href="/notify" class={s.root}>
      <NotifyImg />
    </A>
  );
};
