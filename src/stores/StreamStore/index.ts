import { makeAutoObservable, runInAction } from "mobx";

import type { IAuthIndexUser } from "../../api/auth";
import type { IMessage } from "../../api/messages";
import type { RootStore } from "../RootStore";
import { StreamMessageStore } from "./StreamMessageStore";

export class StreamStore {
  limit = 10;
  messageId: string;

  fetching = false;
  initialized = false;
  depleted = false;

  messages = new Set<StreamMessageStore>();
  message: StreamMessageStore | null = null;

  rootStore: RootStore;

  constructor(rootStore: RootStore, messageId: string) {
    makeAutoObservable(this, { rootStore: false });

    this.messageId = messageId;

    this.rootStore = rootStore;
  }

  initialize = async () => {
    await this.fetch();
    this.appendNewMessage();

    runInAction(() => {
      this.initialized = true;
    });
  };

  fetch = async (before?: string) => {
    this.fetching = true;

    const { message } = await this.rootStore.api.messages.show(this.messageId);
    const { messages } = await this.rootStore.api.messages.messages(
      this.messageId,
      this.limit,
      before,
    );

    runInAction(() => {
      if (messages.length > 0) {
        for (const message of messages) {
          this.appendMessage(message);
        }
      } else {
        this.appendMessage(message);
      }

      // TODO: Move from here
      if (message.stream !== undefined) {
        if (message.stream.message_id !== this.messageId) {
          this.rootStore.layoutStore.setBackUrl(
            `/messages/${message.stream.message_id}`,
          );
        } else {
          this.rootStore.layoutStore.setBackUrl("/");
        }
      }

      this.depleted = messages.length < this.limit;
      this.fetching = false;
    });
  };

  appendMessage = (message: IMessage) => {
    // TODO: cache keys
    const messageIds = new Set(
      Array.from(this.messages.values()).map((message) => message.id),
    );

    if (!messageIds.has(message.id)) {
      this.messages.add(new StreamMessageStore(this, message));
    }
  };

  appendNewMessage = () => {
    if (!this.rootStore.isAuth) return null;

    const message: IMessage = {
      id: "",
      text: "",
      status: "new",
      user: this.rootStore.authStore.user,
      order: 0n,
    };

    this.message = new StreamMessageStore(this, message);
  };

  get isInitialized() {
    return !this.initialized;
  }

  get isDepleted() {
    return this.depleted;
  }

  get isFetching() {
    return this.fetching;
  }

  get messageList(): Array<StreamMessageStore> {
    return Array.from(this.messages).sort((a, b) => {
      if (a.order === 0n) {
        return 1;
      }

      if (b.order === 0n) {
        return -1;
      }

      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }

      return 0;
    });
  }
}

export type IUser = IAuthIndexUser;
