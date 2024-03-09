import { observer } from "mobx-react";
import { Link, Outlet } from "react-router-dom";

import { useRootContext } from "../../context";
import { UserPushSubscriptionForm } from "./UserPushSubscriptionForm";

import s from "./index.module.css";

import { Back } from "./Back";
// import LoginImg from "./assets/login.svg?react";
import LogoImg from "./assets/logo.svg?react";

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

        {workerStore.registration && rootStore.isAuth && (
          <div className={s.notify}>
            <UserPushSubscriptionForm />
          </div>
        )}

        {!rootStore.isAuth && (
          <div className={s.auth}>
            <Link to="/auth" className={s.link}>
              Войти
            </Link>
          </div>
        )}
      </header>

      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
});
