import { observer } from "mobx-react";
import { Link, Outlet } from "react-router-dom";
import { useRootContext } from "../../context";

import { UserPushSubscriptionForm } from "./UserPushSubscriptionForm";

import s from "./index.module.css";

import { ReactComponent as LoginImg } from "./assets/login.svg";
import { ReactComponent as LogoImg } from "./assets/logo.svg";

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
