import { makeAutoObservable, runInAction } from "mobx";
import { api } from "../../api";
import { IAuthIndexUser } from "../../api/auth";
import { IStreamsShowMessage } from "../../api/streams";
import { AuthStore } from "../AuthStore";
import { MessageStore } from "../MessageStore";
import { StreamsStore } from "../StreamsStore";

export class StreamStore {
  limit = 10;
  streamsStore: StreamsStore;
  authStore: AuthStore;
  streamId: string;
  updating = false;
  initialized = false;
  depleted = false;
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

  load = async (before?: string) => {
    this.updating = true;
    const stream = await api.streams.show(this.streamId, this.limit, before);

    for (const message of stream.messages) {
      this.appendMessage(message);
    }

    runInAction(() => {
      this.depleted = stream.messages.length < this.limit;
      this.updating = false;
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

  get isInitialized() {
    return !this.initialized;
  }

  get isDepleted() {
    return this.depleted;
  }

  get isUpdating() {
    return this.updating;
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
