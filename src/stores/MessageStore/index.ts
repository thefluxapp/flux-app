import { makeAutoObservable, runInAction } from "mobx";

import type { IMessagesCreateRequestData } from "../../api/messages";
import type { RootStore } from "../RootStore";

export class MessageStore {
  id: string;
  title: string;
  text: string;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.id = "";
    this.title = "";
    this.text = "";

    this.rootStore = rootStore;
  }

  clear = () => {
    this.id = "";
    this.title = "";
    this.text = "";
  };

  updateText = (text: string) => {
    this.text = text;
  };

  updateTitle = (title: string) => {
    this.title = title;
  };

  updateMessage = async () => {
    const messageData: IMessagesCreateRequestData = {
      title: this.title,
      text: this.text,
    };

    try {
      const message = await this.rootStore.api.messages.create(messageData);

      runInAction(() => {
        this.id = message.id;
      });
    } catch (e) {
      // biome-ignore lint/suspicious/noConsoleLog: create fallback process
      console.log(e);
    }
  };

  get isEmpty() {
    return this.text.trim() === "";
  }
}
