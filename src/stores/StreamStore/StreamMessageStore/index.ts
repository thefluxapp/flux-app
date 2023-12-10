import { makeAutoObservable, runInAction } from "mobx";

import { StreamStore } from "..";
import {
  IMessage,
  IMessageStatus,
  IMessagesCreateRequestData,
  IMessagesMessagesStream,
  IMessagesMessagesUser,
} from "../../../api/messages";

export class StreamMessageStore {
  id: string;
  text: string;
  status: IMessageStatus;
  user: IUser;
  stream?: IStream;
  order: bigint;

  streamStore: StreamStore;

  constructor(streamStore: StreamStore, message: IMessage) {
    makeAutoObservable(this, { streamStore: false });

    this.id = message.id;
    this.text = message.text;
    this.order = message.order;
    this.status = message.status;
    this.user = message.user;
    this.stream = message.stream;

    this.streamStore = streamStore;
  }

  updateText = (text: string) => {
    this.text = text;
  };

  updateMessage = async () => {
    const messageData: IMessagesCreateRequestData = {
      text: this.text,
      message_id: this.streamStore.messageId,
    };

    this.status = "processing";
    this.streamStore.messages.add(this);
    this.streamStore.appendNewMessage();

    try {
      const message =
        await this.streamStore.rootStore.api.messages.create(messageData);

      runInAction(() => {
        this.id = message.id;
        this.order = message.order;
        this.status = message.status;
      });
    } catch (e) {
      // biome-ignore lint/suspicious/noConsoleLog: create fallback process
      console.log(e);
    }
  };

  get isEmpty() {
    return this.text.trim() === "";
  }

  get isForm() {
    return this.status === "new";
  }

  get isProcessing() {
    return this.status === "processing";
  }
}

type IUser = IMessagesMessagesUser;
type IStream = IMessagesMessagesStream;
