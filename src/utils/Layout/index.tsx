import { observer } from "mobx-react";
import { Link, Outlet } from "react-router-dom";

import { useRootContext } from "../../context";
import { UserPushSubscriptionForm } from "./UserPushSubscriptionForm";

import s from "./index.module.css";

import LoginImg from "./assets/login.svg?react";
import LogoImg from "./assets/logo.svg?react";
import { Back } from "./Back";

export const Layout = observer(() => {
  const rootStore = useRootContext();
  const { workerStore } = rootStore;

  if (!rootStore.isInitialized) return null;

  return (
    <div className={s.root}>
      <header className={s.header}>
        <Link className={s.logo} to="/">
          <LogoImg />
        </Link>

        <div className={s.back}>
          <Back />
        </div>

        {(rootStore.isAuth || true) && (
          <Link className={s.message} to="/messages">
            Запостить
          </Link>
        )}

        {workerStore.registration && rootStore.isAuth && (
          <div className={s.notify}>
            <UserPushSubscriptionForm />
          </div>
        )}

        {!rootStore.isAuth && (
          <Link className={s.auth} to="/auth">
            <LoginImg />
          </Link>
        )}
      </header>

      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
});
