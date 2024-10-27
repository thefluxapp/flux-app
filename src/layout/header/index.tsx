import type { Component } from "solid-js";

import s from "./index.module.css";

import { Account } from "./account";
import { Logo } from "./logo";

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
