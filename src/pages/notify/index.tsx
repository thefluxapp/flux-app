import { Title } from "@solidjs/meta";
import { createMemo, createResource, createSignal } from "solid-js";

import s from "./index.module.css";

import { useI18n } from "../../contexts/i18n";
import { useAPI } from "../../contexts/api";
import { useWorker } from "../../contexts/worker";

export const NotifyPage = () => {
  const { t } = useI18n();
  const api = useAPI();
  const workerStore = useWorker();

  const [permission, { mutate }] = createResource<
    NotificationPermission | undefined
  >(() => {
    if ("Notification" in window) {
      return Notification.permission;
    }

    return undefined;
  });
  // const notification = createMemo(() => );

  console.log(permission());

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
    const registration = await workerStore.registration;

    // console.log(await workerStore.registration);

    if (permission() === "default") {
      mutate(await Notification.requestPermission());
    }

    if (permission() === "granted" && registration) {
      const subscription = (
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: public_key,
        })
      ).toJSON();

      console.log(subscription);
    }

    // console.log("handleClick");
  };

  return (
    <>
      <Title>{t.notify.meta.title()}</Title>

      <div class={s.root}>
        <div class={s.title}>{t.notify.title()}</div>
        {permission() && (
          <>
            <div class={s.desc}>{t.notify.desc()}</div>
            <div class={s.submit}>
              <button class={s.button} type="button" onClick={handleClick}>
                {t.notify.button()}
              </button>
            </div>
          </>
        )}
        {!permission() && <div class={s.desc}>{t.notify.error()}</div>}
      </div>
    </>
  );
};
