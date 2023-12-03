import { makeAutoObservable, runInAction } from "mobx";
import { StreamsStore } from "../StreamsStore";
import { api } from "../../api";
import {
  IStreamsShowMessage,
  IStreamsShowMessageStatus,
} from "../../api/streams";
import { MessageStore } from "../MessageStore";
import { IAuthIndexUser } from "../../api/auth";
import { AuthStore } from "../AuthStore";

export class StreamStore {
  streamsStore: StreamsStore;
  authStore: AuthStore;
  streamId: string;
  loaded?: boolean;
  initialized = false;
  // messages = new Map<string, MessageStore>();
  messages = new Set<MessageStore>();
  message: MessageStore | null = null;

  constructor(
    streamsStore: StreamsStore,
    streamId: string,
    authStore: AuthStore,
  ) {
    makeAutoObservable(this, { streamsStore: false, authStore: false });

    this.streamId = streamId;
    this.streamsStore = streamsStore;
    this.authStore = authStore;
    this.initialize();
  }

  initialize = async () => {
    await this.load();

    this.generateMessage();

    runInAction(() => {
      this.initialized = true;
    });
  };

  update = async () => {
    // TODO: join update and load
    const stream = await api.streams.show(this.streamId);

    stream.messages.forEach((message) => {
      this.appendMessage(message);
    });
  };

  load = async () => {
    this.loaded = false;

    const stream = await api.streams.show(this.streamId);

    runInAction(() => {
      stream.messages.forEach((message) => {
        this.appendMessage(message);
      });

      this.loaded = true;
    });
  };

  appendMessage = (message: IMessage) => {
    // TODO: cache keys
    const messageIds = new Set(
      Array.from(this.messages.values()).map((message) => message.id),
    );

    if (!messageIds.has(message.id)) {
      this.messages.add(new MessageStore(message, this));
    }
  };

  generateMessage = () => {
    if (this.authStore.user === null) return null;

    const message: IMessage = {
      id: "",
      text: "",
      status: "new",
      user: this.authStore.user,
      order: 0n,
    };

    this.message = new MessageStore(message, this);
  };

  get isLoading() {
    return !this.initialized || !this.loaded;
  }

  get messageList(): Array<MessageStore> {
    return Array.from(this.messages).sort((a, b) => {
      if (a.order === 0n) {
        return 1;
      } else if (b.order === 0n) {
        return -1;
      } else {
        return a.order > b.order ? 1 : 0;
      }
    });
  }
}

export type IMessage = IStreamsShowMessage;
export type IUser = IAuthIndexUser;
