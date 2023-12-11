import localForage from "localforage";
import { makeAutoObservable, runInAction } from "mobx";

import { IAuthIndexUser } from "../../api/auth";
import { RootStore } from "../RootStore";

const tokenKeyName = "auth-token";

export class AuthStore {
  rootStore: RootStore;
  token: string | null = null;
  user: IUser;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.user = this.placeholder();

    this.rootStore = rootStore;
  }

  initialize = async () => {
    const { token } = await this.loadFromStorage();
    this.fetch(token);
  };

  fetch = async (token: string | null) => {
    const { user } = await this.rootStore.api.auth.index(token);

    runInAction(() => {
      if (user === null) {
        if (token !== null) {
          this.removeFromStorage();
        }
      } else {
        this.user = user;
        this.token = token;
      }
    });
  };

  placeholder = (): IUser => {
    return {
      id: "0",
      name: "Guest",
      image: "data:,",
    };
  };

  auth = async (token: string) => {
    await this.saveToStorage(token);
    this.fetch(token);
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
