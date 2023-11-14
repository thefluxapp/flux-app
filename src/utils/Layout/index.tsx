import { observer } from "mobx-react";
import { FC, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { useRootContext } from "../../context";

import { MessageForm } from "../../modules/MessageForm";
import s from "./index.module.css";
import { UserPushSubscriptionForm } from "../../modules/UserPushSubscriptionForm";

export const Layout = observer(() => {
  const rootStore = useRootContext();
  const { workerStore } = rootStore;

  return (
    <div className={s.root}>
      <header className={s.header}>
        {workerStore.registration && (
          <div className={s.notify}>
            <UserPushSubscriptionForm />
          </div>
        )}

        <Link className={s.logo} to="/">
          <div className={s.img} />
        </Link>

        <div className={s.session}>
          {!rootStore.isAuth && (
            <Link className={s.auth} to="/auth">
              Login
            </Link>
          )}
          {rootStore.isAuth && <div className={s.user} />}
        </div>
      </header>

      <main className={s.main}>
        <Outlet />
      </main>

      <footer className={s.footer}>
        <MessageForm />
      </footer>
    </div>
  );
});
