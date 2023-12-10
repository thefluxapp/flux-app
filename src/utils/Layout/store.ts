import { makeAutoObservable } from "mobx";
import { RootStore } from "../../stores/RootStore";

export class LayoutStore {
  rootStore: RootStore;
  backUrl: string | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
  }

  setBackUrl = (url: string | null) => {
    this.backUrl = url;
  };

  clearBackUrl = () => {
    this.setBackUrl(null);
  };
}
