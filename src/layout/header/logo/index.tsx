import type { Component } from "solid-js";

import LogoImg from "./logo.svg";

import s from "./index.module.css";

export const Logo: Component = () => {
  return (
    <a href="/streams" class={s.root}>
      <LogoImg />
    </a>
  );
};
