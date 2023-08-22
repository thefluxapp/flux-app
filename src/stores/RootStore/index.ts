import { makeAutoObservable } from "mobx";
import { AuthStore } from "../AuthStore";

export class RootStore {
  initialized = false;
  authStore: AuthStore;

  constructor() {
    makeAutoObservable(this);

    this.authStore = new AuthStore(this);

    this.initialize();
  }

  initialize = async () => {
    this.authStore.initialize();
    // this.initialized = true;
  };

  get isAuth() {
    return this.authStore.token != null;
  }
}
