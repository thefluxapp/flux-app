import { type Component, Show } from "solid-js";
import { A, useMatch } from "@solidjs/router";

import s from "./index.module.css";

import { useAuth } from "../../contexts/auth";
import { Account } from "./account";
import { Logo } from "./logo";
import { Notify } from "./notify";
import { useI18n } from "../../contexts/i18n";

export const Header: Component = () => {
  const isAboutPage = useMatch(() => "/about");
  const { authStore } = useAuth();
  const { t } = useI18n();

  return (
    <header class={s.root}>
      <div class={s.logo}>
        <Logo />
      </div>

      <Show when={!isAboutPage()}>
        <div class={s.about}>

          <A href="/about">
            {t.header.about()}
          </A>
        </div>
      </Show>

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
