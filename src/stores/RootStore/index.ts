import { makeAutoObservable, runInAction } from "mobx";
import { LayoutStore } from "../../utils/Layout/store";
import { AuthStore } from "../AuthStore";
import { MessageStore } from "../MessageStore";
import { WorkerStore } from "../WorkerStore";
import { StreamsStore } from "../StreamsStore";

export class RootStore {
  initialized = false;
  authStore: AuthStore;
  layoutStore: LayoutStore;
  workerStore: WorkerStore;
  streamsStore: StreamsStore;

  constructor() {
    makeAutoObservable(this);

    this.authStore = new AuthStore(this);
    this.layoutStore = new LayoutStore(this);
    this.workerStore = new WorkerStore(this);
    this.streamsStore = new StreamsStore(this);

    this.initialize();
  }

  initialize = async () => {
    await this.authStore.initialize();
    this.workerStore.initialize();

    runInAction(() => {
      this.initialized = true;
    });
  };

  get isAuth() {
    return this.authStore.token !== null && this.authStore.token !== undefined;
  }

  get isInitialized() {
    return this.initialized === true;
  }
}
