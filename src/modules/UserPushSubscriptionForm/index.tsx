import axios from "axios";
import { observe } from "mobx";
import { observer } from "mobx-react";
import { api } from "../../api";
import { useEffect, useState } from "react";
import { useRootContext } from "../../context";

export const UserPushSubscriptionForm = observer(() => {
  const rootStore = useRootContext();
  const { workerStore, authStore } = rootStore;
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

    if (p !== "granted" || !workerStore.registration) return;

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
    return;

  return (
    <div>
      <button type="button" onClick={handleSubmit}>
        Notify
      </button>
    </div>
  );
});
