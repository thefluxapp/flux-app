import { observer } from "mobx-react";
import { FC, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { useRootContext } from "../../context";

import { MessageForm } from "../../modules/MessageForm";
import s from "./index.module.css";

export const Layout = observer(() => {
  const rootStore = useRootContext();
  const { layoutStore } = rootStore;

  return (
    <div className={s.root}>
      <header className={s.header}>
        <div className={s.logo}>
          <div className={s.img} />
        </div>

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
