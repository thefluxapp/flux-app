declare let self: ServiceWorkerGlobalScope;

self.onpush = async (event) => {
  const w = self.registration.showNotification("HI!");

  console.log(event.data);
  event.waitUntil(w);
};

export default null;
