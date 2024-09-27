import type { Component } from "solid-js";

import s from "./index.module.css";

import { Logo } from "./logo";
import { Account } from "./account";

export const Header: Component = () => {
  return (
    <header class={s.root}>
      <div class={s.logo}>
        <Logo />
      </div>

      <div class={s.account}>
        <Account />
      </div>
    </header>
  );
};
