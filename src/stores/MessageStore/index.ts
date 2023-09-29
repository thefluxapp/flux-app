import { makeAutoObservable } from "mobx";
import { RootStore } from "../RootStore";
import { IStreamsShowMessage, IStreamsShowStream } from "../../api/streams";

export class MessageStore {
  rootStore: RootStore;
  // self = false;
  stream: IStream | null = null;
  message: IMessage | null = null;
  onCreate: (() => void) | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
  }

  setStream = (stream: IStream | null) => {
    this.stream = stream;
    this.message = null;
  };

  setMessage = (message: IMessage | null) => {
    this.message = message;
    this.stream = null;
  };

  // TODO: Remove this hack
  setOnCreate = (func: () => void) => {
    this.onCreate = func;
  };
}

export type IStream = IStreamsShowStream;
export type IMessage = IStreamsShowMessage;
