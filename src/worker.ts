declare let self: ServiceWorkerGlobalScope;

interface IPushNotification {
  title: string;
  body: string;
}

self.onpush = async (event) => {
  const { title, body } = event.data?.json() as IPushNotification;

  const w = self.registration.showNotification(title, {
    body,
  });

  event.waitUntil(w);
};

export default null;
