import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";

import { useRootContext } from "../../../context";

import s from "./index.module.css";

export const Tabs = observer(() => {
  const { isAuth, streamsStore } = useRootContext();
  const { isCurrentUser, setIsCurrentUser } = streamsStore;

  return (
    <div className={s.root}>
      <button
        type="button"
        className={clsx(s.link, !isCurrentUser && s.active)}
        onClick={() => setIsCurrentUser(false)}
      >
        Все стримы
      </button>

      <button
        type="button"
        disabled={!isAuth}
        className={clsx(
          s.link,
          isCurrentUser && s.active,
          !isAuth && s.disabled,
        )}
        onClick={() => setIsCurrentUser(true)}
      >
        Только мои
      </button>

      <NavLink
        to="/messages"
        end
        className={clsx(s.link, !isAuth && s.disabled)}
      >
        Создать новый
      </NavLink>
    </div>
  );
});

// TABS:
