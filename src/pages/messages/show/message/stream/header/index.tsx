import s from "./index.module.css";

import MinusImg from "./minus.svg";
import PlusImg from "./plus.svg";
import AiImg from "./ai.svg";

import { useI18n } from "../../../../../../contexts/i18n";

export const Header = () => {
  const { t } = useI18n();

  return (
    <div class={s.root}>
      <div class={s.icon}>
        <AiImg />
        <div>{t.stream.auto()}</div>
      </div>

      <div class={s.actions}>
        <button class={s.button}><MinusImg /></button>
        <button class={s.button}><PlusImg /></button>

        <div class={s.soon}>{t.soon()}</div>
      </div>
    </div>
  );
};
