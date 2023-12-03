import localForage from "localforage";
import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "../RootStore";
import { api } from "../../api";
import { IAuthIndexUser } from "../../api/auth";

const tokenKeyName = "auth-token";

export class AuthStore {
  rootStore: RootStore;
  token: string | null = null;
  user: IUser | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
  }

  initialize = async () => {
    const { token } = await this.loadFromStorage();
    const { user } = await api.auth.index(token);

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

  auth = async (token: string) => {
    await this.saveToStorage(token);

    runInAction(() => {
      this.token = token;
      console.log(token);
    });
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
