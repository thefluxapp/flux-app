import axios from "axios";
import { observe } from "mobx";
import { observer } from "mobx-react";
import { api } from "../../api";

export const UserPushSubscriptionForm = observer(() => {
  const handleSubmit = async () => {
    const vapid_keys = await api.users.push_subscriptions.vapid();

    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      new URL("../../worker.ts", import.meta.url),
    );

    await Notification.requestPermission();

    const subscription = (
      await serviceWorkerRegistration.pushManager.subscribe({
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

      // serviceWorkerRegistration.showNotification("QQQ");
    }
  };

  return (
    <div>
      <button type="button" onClick={handleSubmit}>
        Notify
      </button>
    </div>
  );
});
