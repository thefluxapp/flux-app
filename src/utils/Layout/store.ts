import { makeAutoObservable } from "mobx";
import { RootStore } from "../../stores/RootStore";
import { useRef } from "react";

export class LayoutStore {
  rootStore: RootStore;
  mainRef: HTMLInputElement | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
  }
}
