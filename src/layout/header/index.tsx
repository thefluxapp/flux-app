import { type Component, Show } from "solid-js";

import s from "./index.module.css";

import { useAuth } from "../../contexts/auth";
import { Account } from "./account";
import { Logo } from "./logo";
import { Notify } from "./notify";

export const Header: Component = () => {
  const { authStore } = useAuth();

  return (
    <header class={s.root}>
      <div class={s.logo}>
        <Logo />
      </div>

      <Show when={authStore.isAuth}>
        <div class={s.notify}>
          <Notify />
        </div>
      </Show>

      <div class={s.account}>
        <Account />
      </div>
    </header>
  );
};
