import { makeAutoObservable, runInAction } from "mobx";
import type { RootStore } from "../RootStore";

import WORKER_PATH from "./../../worker?worker&url";

export class WorkerStore {
  rootStore: RootStore;
  registration: ServiceWorkerRegistration | null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
    this.registration = null;
  }

  initialize = async () => {
    let registration =
      await navigator.serviceWorker.getRegistration(WORKER_PATH);

    if (!registration) {
      registration = await navigator.serviceWorker.register(WORKER_PATH, {
        type: "module",
      });
    }

    runInAction(() => {
      if (registration) {
        this.registration = registration;
      }
    });
  };
}
