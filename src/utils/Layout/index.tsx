import { FC } from "react";
import { useRootContext } from "../../context";
import { observer } from "mobx-react";
import { Link, Outlet } from "react-router-dom";

export const Layout = observer(() => {
  const rootStore = useRootContext();

  return (
    <div>
      {!rootStore.isAuth && (
        <div>
          <Link to="/auth">Auth</Link>
        </div>
      )}
      <div>
        <Outlet />
      </div>

      <footer>FOOTER</footer>
    </div>
  );
});
