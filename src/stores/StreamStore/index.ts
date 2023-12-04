import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../../api";
import { IAuthIndexUser } from "../../api/auth";
import { IStreamsShowMessage } from "../../api/streams";
import { AuthStore } from "../AuthStore";
import { MessageStore } from "../MessageStore";
import { StreamsStore } from "../StreamsStore";

export class StreamStore {
  streamsStore: StreamsStore;
  authStore: AuthStore;
  streamId: string;
  loaded?: boolean;
  initialized = false;
  lazy = false;
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
    await this.load(5);

    this.generateMessage();

    runInAction(() => {
      this.initialized = true;
    });
  };

  update = async (limit: number, before?: string) => {
    // TODO: join update and load
    const stream = await api.streams.show(this.streamId, limit, before);

    for (const message of stream.messages) {
      this.appendMessage(message);
    }

    runInAction(() => {
      this.lazy = stream.messages.length >= limit;
    });
  };

  load = async (limit: number) => {
    this.loaded = false;

    const stream = await api.streams.show(this.streamId, limit);

    runInAction(() => {
      for (const message of stream.messages) {
        this.appendMessage(message);
      }

      this.lazy = stream.messages.length >= limit;
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

  get isLazy() {
    return this.lazy;
  }

  get messageList(): Array<MessageStore> {
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

export type IMessage = IStreamsShowMessage;
export type IUser = IAuthIndexUser;
