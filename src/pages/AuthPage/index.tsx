import { observer } from "mobx-react";
import { AuthForm } from "../../modules/AuthForm";

import s from "./index.module.css";

export const AuthPage = observer(() => {
  return (
    <div className={s.root}>
      <AuthForm />
    </div>
  );
});
