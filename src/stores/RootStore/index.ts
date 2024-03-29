import { makeAutoObservable, runInAction } from "mobx";
import { Api } from "../../api";
import { LayoutStore } from "../../utils/Layout/store";
import { AuthStore } from "../AuthStore";
import { MessageStore } from "../MessageStore";
import { StreamStore } from "../StreamStore";
import { StreamsStore } from "../StreamsStore";
import { WorkerStore } from "../WorkerStore";

export class RootStore {
  initialized = false;
  authStore: AuthStore;
  layoutStore: LayoutStore;
  workerStore: WorkerStore;
  streamStore: StreamStore | null;
  streamsStore: StreamsStore;
  messageStore: MessageStore;
  api: Api;

  constructor() {
    makeAutoObservable(this);

    this.authStore = new AuthStore(this);
    this.layoutStore = new LayoutStore(this);
    this.workerStore = new WorkerStore(this);
    this.streamStore = null;
    this.streamsStore = new StreamsStore(this);
    this.messageStore = new MessageStore(this);
    this.api = new Api(this.authStore);

    this.initialize();
  }

  initialize = async () => {
    this.workerStore.initialize();
    await this.authStore.initialize();

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
    return this.initialized === true && this.authStore.user.id !== "0";
  }

  get isInitialized() {
    return this.initialized === true;
  }
}
