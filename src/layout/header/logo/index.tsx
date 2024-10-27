import type { Component } from "solid-js";
import { A } from "@solidjs/router";

import LogoImg from "./logo.svg";

import s from "./index.module.css";

export const Logo: Component = () => {
  return (
    <A href="/messages" class={s.root}>
      <LogoImg />
    </A>
  );
};
