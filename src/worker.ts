declare let self: ServiceWorkerGlobalScope;

type IPush = {
  title: string;
  body: string;
};

self.onpush = async (event) => {
  const { title, body } = event.data?.json() as IPush;

  const w = self.registration.showNotification(title, {
    body,
  });

  event.waitUntil(w);
};

export default null;
