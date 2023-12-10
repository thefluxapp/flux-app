import { makeAutoObservable, runInAction } from "mobx";
import { LayoutStore } from "../../utils/Layout/store";
import { AuthStore } from "../AuthStore";
// import { StreamsStore } from "../StreamsStore";
import { WorkerStore } from "../WorkerStore";
import { MessageStore } from "../MessageStore";
import { StreamStore } from "../StreamStore";
import { Api } from "../../api";

export class RootStore {
  initialized = false;
  authStore: AuthStore;
  layoutStore: LayoutStore;
  workerStore: WorkerStore;
  streamStore: StreamStore | null;
  // streamsStore: StreamsStore;
  messageStore: MessageStore;
  api: Api;

  constructor() {
    makeAutoObservable(this);

    this.authStore = new AuthStore(this);
    this.layoutStore = new LayoutStore(this);
    this.workerStore = new WorkerStore(this);
    this.streamStore = null;
    // this.streamsStore = new StreamsStore(this);
    this.messageStore = new MessageStore(this);
    this.api = new Api(this.authStore);
    // new Api(new RootStore().authStore);

    this.initialize();
  }

  initialize = async () => {
    await this.authStore.initialize();
    this.workerStore.initialize();

    runInAction(() => {
      this.initialized = true;
    });
  };

  initializeStreamStore = async (messageId: string) => {
    this.streamStore = new StreamStore(this, messageId);
    await this.streamStore.initialize();
  };

  clearStreamStore = () => {
    this.streamStore = null;
  };

  get isAuth() {
    return this.authStore.token !== null && this.authStore.token !== undefined;
  }

  get isInitialized() {
    return this.initialized === true;
  }
}
