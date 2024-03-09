import localForage from "localforage";
import { makeAutoObservable, runInAction } from "mobx";

import { IAuthIndexUser } from "../../api/auth";
import { RootStore } from "../RootStore";

const tokenKeyName = "auth-token";

export class AuthStore {
  rootStore: RootStore;
  token: Promise<string | null>;
  resolve: (value: string | null) => void = () => {};
  user: IUser;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.token = new Promise((resolve) => {
      this.resolve = resolve;
    });

    this.user = this.placeholder();

    this.rootStore = rootStore;
  }

  initialize = async () => {
    const { token } = await this.loadFromStorage();
    this.resolve(token);

    await this.fetch();
  };

  fetch = async () => {
    const { user } = await this.rootStore.api.auth.index();

    runInAction(() => {
      if (user === null) {
        this.resolve(null);
        this.removeFromStorage();
      } else {
        this.user = user;
      }
    });
  };

  placeholder = (): IUser => {
    return {
      id: "0",
      name: "Guest",
      abbr: "G",
      image: "data:,",
    };
  };

  auth = async (token: string) => {
    await this.saveToStorage(token);
    this.token = Promise.resolve(token);

    await this.fetch();
  };

  loadFromStorage = async () => {
    const token = await localForage.getItem<string>(tokenKeyName);

    return { token };
  };

  saveToStorage = async (token: string) => {
    await localForage.setItem(tokenKeyName, token);
  };

  removeFromStorage = async () => {
    await localForage.removeItem(tokenKeyName);
  };
}

export type IUser = IAuthIndexUser;
