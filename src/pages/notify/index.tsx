import { Title } from "@solidjs/meta";
import { Show, createResource, onMount } from "solid-js";

import s from "./index.module.css";

import { useNavigate } from "@solidjs/router";
import { useAPI } from "../../contexts/api";
import { useAuth } from "../../contexts/auth";
import { useI18n } from "../../contexts/i18n";
import { useRoot } from "../../contexts/root";
import { useWorker } from "../../contexts/worker";

export const NotifyPage = () => {
  const { authStore } = useAuth();
  const { rootStore } = useRoot();
  const { t } = useI18n();
  const api = useAPI();
  const navigate = useNavigate();
  const workerStore = useWorker();

  const [permission, { mutate }] = createResource<
    NotificationPermission | undefined
  >(() => {
    if ("Notification" in window) {
      return Notification.permission;
    }

    return undefined;
  });

  const [pushes, { refetch }] = createResource(async () => {
    return (await api.pushes.get_pushes()).device_ids;
  });

  onMount(() => {
    if (!authStore.isAuth) {
      navigate("/");
    }
  });

  const handleClick = async () => {
    const { public_key } = await api.pushes.get_vapid();
    const registration = await workerStore.registration;

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

      await api.pushes.create_push({
        ...subscription,
        device_id: rootStore.deviceId,
      });

      await refetch();
    }
  };

  return (
    <>
      <Title>{t.notify.meta.title()}</Title>

      <div class={s.root}>
        <div class={s.title}>{t.notify.title()}</div>
        {permission() && (
          <>
            <div class={s.desc}>{t.notify.desc()}</div>

            <Show when={pushes()?.includes(rootStore.deviceId)}>
              <div class={s.subscribed}>{t.notify.subscribed()}</div>
            </Show>

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
