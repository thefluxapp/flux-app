import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import s from "./index.module.css";

import { useRootContext } from "../../../context";
import NotifyImg from "./assets/notify.svg?react";

export const UserPushSubscriptionForm = observer(() => {
  const rootStore = useRootContext();
  const { workerStore, authStore, api } = rootStore;
  const [permission, setPermission] = useState<NotificationPermission>();

  useEffect(() => {
    (async () => {
      setPermission(Notification.permission);
    })();
  }, []);

  const handleSubmit = async () => {
    let p = permission;

    if (permission === "default") {
      p = await Notification.requestPermission();
      setPermission(p);
    }

    if (p !== "granted" || !workerStore.registration) return null;

    const vapid_keys = await api.users.push_subscriptions.vapid();

    const subscription = (
      await workerStore.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapid_keys.public_key,
      })
    ).toJSON();

    if (subscription.endpoint != null && subscription.keys != null) {
      api.users.push_subscriptions.create({
        endpoint: subscription.endpoint,
        auth_key: subscription.keys.auth,
        p256dh_key: subscription.keys.p256dh,
      });
    }
  };

  if (
    !permission ||
    permission === "denied" ||
    !workerStore.registration ||
    !rootStore.isAuth
  )
    return null;

  return (
    <button className={s.root} type="button" onClick={handleSubmit}>
      <NotifyImg />
    </button>
  );
});
