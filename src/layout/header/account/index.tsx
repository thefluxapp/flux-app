import type { Component } from "solid-js";
import { A } from "@solidjs/router";

import { useAuth } from "../../../contexts/auth";

import s from "./index.module.css";

import AccountImg from "./account.svg";

export const Account: Component = () => {
  const { authStore } = useAuth();

  return (
    <A href={authStore.isAuth ? "/account" : "/auth"} class={s.root}>
      <AccountImg />
    </A>
  );
};
