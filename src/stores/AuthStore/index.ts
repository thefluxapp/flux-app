import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "../RootStore";
import localForage from "localforage";

const tokenKeyName = "auth-token";

export class AuthStore {
  rootStore: RootStore;
  token?: string;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
  }

  initialize = async () => {
    const { token } = await this.loadFromStorage();

    if (token) {
      runInAction(() => {
        this.token = token;
      });
    }
  };

  auth = async (token: string) => {
    await this.saveToStorage(token);

    runInAction(() => {
      this.token = token;
    });
  };

  loadFromStorage = async () => {
    const token = await localForage.getItem<string>(tokenKeyName);

    return { token };
  };

  qqq = () => {
    console.log("QQQQ");
    return this.token;
  };

  saveToStorage = async (token: string) => {
    await localForage.setItem(tokenKeyName, token);
  };
}
