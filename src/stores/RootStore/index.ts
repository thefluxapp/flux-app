import { makeAutoObservable } from "mobx";
import { LayoutStore } from "../../utils/Layout/store";
import { AuthStore } from "../AuthStore";
import { MessageStore } from "../MessageStore";

export class RootStore {
  initialized = false;
  authStore: AuthStore;
  messageStore: MessageStore;
  layoutStore: LayoutStore;

  constructor() {
    makeAutoObservable(this);

    this.authStore = new AuthStore(this);
    this.messageStore = new MessageStore(this);
    this.layoutStore = new LayoutStore(this);

    this.initialize();
  }

  initialize = async () => {
    this.authStore.initialize();
    // this.initialized = true;
  };

  get isAuth() {
    return this.authStore.token !== null;
  }
}
