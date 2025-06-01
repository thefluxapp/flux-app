declare let self: ServiceWorkerGlobalScope;

type IPush = {
  title: string;
  // body: string;
};

self.onpush = async (event) => {
  const { title } = event.data?.json() as IPush;

  const w = self.registration.showNotification(title);

  event.waitUntil(w);
};

// self.onnotificationclick = (event) => {
//   console.log(event);
// };

export default null;
