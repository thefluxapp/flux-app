import { useI18n } from "../../contexts/i18n";
import s from "./index.module.css";

export const AccountPage = () => {
  const { t } = useI18n();

  return (
    <div class={s.root}>
      <div class={s.title}>{t.account.title()}</div>
      <div class={s.desc}>{t.account.desc()}</div>
    </div>
  );
};
