import { Show } from "solid-js";

import { useAuth } from "../../../contexts/auth";

import s from "./index.module.css";

export const MessagesNewPage = () => {
  const { authStore } = useAuth();

  return (
    <Show when={!authStore.isAuth}>
      <div class={s.root}>
        <div class={s.title}>
          Чтобы начать постить нужно войти или зарегистрироваться
        </div>
        <div class={s.desc}>Тут нужно сделать кнопку на страницу входа</div>
      </div>
    </Show>
  );
};
