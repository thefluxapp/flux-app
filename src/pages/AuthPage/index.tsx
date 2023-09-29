import { useEffect } from "react";
import { AuthForm } from "../../modules/AuthForm";
import { useRootContext } from "../../context";
import { redirect } from "react-router-dom";
import { observer } from "mobx-react";

import s from "./index.module.css";

export const AuthPage = observer(() => {
  return (
    <div className={s.root}>
      <AuthForm />
    </div>
  );
});
