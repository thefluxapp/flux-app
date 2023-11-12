onmessage = function (e) {
  console.log("Worker: Message received from main script");
  console.log(e);
};

onerror = function (e) {
  console.log("Worker: Message received from main script");
  console.log(e);
};

self.addEventListener("push", async (event) => {
  console.log(event);
  // const { title, body } = await event.data.json();

  // self.registration.showNotification(title, {
  //   body,
  // });
});
