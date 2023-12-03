import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../../api";
import { IMessagesCreateRequestData } from "../../api/messages";
import {
  IStreamsShowMessageStatus,
  IStreamsShowMessageUser,
} from "../../api/streams";
import { IMessage, StreamStore } from "../StreamStore";

export class MessageStore {
  id: string;
  text: string;
  streamStore: StreamStore;
  status: IStreamsShowMessageStatus;
  user: IStreamsShowMessageUser;
  order: bigint;

  // rootStore: RootStore;
  // self = false;
  // stream: IStream | null = null;
  // message: IMessage | null = null;
  // onCreate: (() => void) | null = null;

  constructor(message: IMessage, streamStore: StreamStore) {
    makeAutoObservable(this, { streamStore: false });

    this.id = message.id;
    this.text = message.text;
    this.status = message.status;
    this.user = message.user;
    this.order = message.order;

    this.streamStore = streamStore;
  }

  updateText = (text: string) => {
    this.text = text;
  };

  updateMessage = async () => {
    const messageData: IMessagesCreateRequestData = {
      text: this.text,
      stream_id: this.streamStore?.streamId,
    };

    this.status = "processing";
    this.streamStore.messages.add(this);
    this.streamStore.generateMessage();

    try {
      const message = await api.messages.create(messageData);

      runInAction(() => {
        // TODO: What to do with id? Rerender
        this.order = message.order;
        this.id = message.id;
        this.status = "saved";
      });
    } catch {
      this.status = "failed";
    }
  };

  get isForm() {
    return this.status === "new";
  }

  get isProcessing() {
    return this.status === "processing";
  }

  get isEmpty() {
    return this.text.trim() === "";
  }

  // setStream = (stream: IStream | null) => {
  //   this.stream = stream;
  //   this.message = null;
  //   this.self = false;
  // };

  // setMessage = (message: IMessage | null) => {
  //   this.message = message;
  //   this.stream = null;
  //   this.self = false;
  // };

  // setSelf = () => {
  //   this.self = true;
  //   this.message = null;
  //   this.stream = null;
  // };

  // // TODO: Remove this hack
  // setOnCreate = (func: () => void) => {
  //   this.onCreate = func;
  // };
}

// export type IStream = IStreamsShowStream;
// export type IMessage = IStreamsShowMessage;
// export type IStatus = IStreamsShowMessageStatus;
