import { makeAutoObservable, runInAction } from "mobx";

import { IMessagesCreateRequestData } from "../../api/messages";
import { RootStore } from "../RootStore";

export class MessageStore {
  id: string;
  text: string;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.id = "";
    this.text = "";

    this.rootStore = rootStore;
  }

  updateText = (text: string) => {
    this.text = text;
  };

  updateMessage = async () => {
    const messageData: IMessagesCreateRequestData = {
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
