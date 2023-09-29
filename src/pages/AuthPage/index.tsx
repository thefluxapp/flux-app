import { observer } from "mobx-react";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { useRootContext } from "../../context";
import { AuthForm } from "../../modules/AuthForm";

import s from "./index.module.css";

export const AuthPage = observer(() => {
  return (
    <div className={s.root}>
      <AuthForm />
    </div>
  );
});
