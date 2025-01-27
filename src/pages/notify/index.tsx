import { Title } from "@solidjs/meta";
import { createMemo } from "solid-js";

import s from "./index.module.css";

import { useI18n } from "../../contexts/i18n";
import { useAPI } from "../../contexts/api";

export const NotifyPage = () => {
  const { t } = useI18n();
  const api = useAPI();

  // const [nofity, setNotify] = createMemo<NotificationPermission>();

  const notification = createMemo(() => "Notification" in window);

  // console.log(Notification.requestPermission());

  // const notify = () => {
  //   if () {
  //     console.log("QQQ");

  //     return false;
  //   }

  //   return true;
  // };

  // onMount(() => {

  // })

  const handleClick = async () => {
    const { public_key } = await api.push.get_vapid();

    console.log(public_key);
    console.log("handleClick");
  };

  return (
    <>
      <Title>{t.notify.meta.title()}</Title>

      <div class={s.root}>
        <div class={s.title}>{t.notify.title()}</div>
        {notification() && (
          <>
            <div class={s.desc}>{t.notify.desc()}</div>
            <div class={s.submit}>
              <button class={s.button} type="button" onClick={handleClick}>
                {t.notify.button()}
              </button>
            </div>
          </>
        )}
        {!notification() && <div class={s.desc}>{t.notify.error()}</div>}
      </div>
    </>
  );
};
