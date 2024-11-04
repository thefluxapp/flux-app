import { type ParentComponent, createContext, useContext } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";

import { useAPI } from "./api";

const MessagesContext = createContext({
  messagesStore: null as unknown as MessagesStore,
  setMessagesStore: null as unknown as SetStoreFunction<MessagesStore>,
  update: null as unknown as (messageId: string) => Promise<void>,
  clean: null as unknown as () => void,
});

export const MessagesProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [messagesStore, setMessagesStore] = createStore(
    MessagesStore.initialize(),
  );

  const update = async (message_id: string) => {
    const { stream, messages, message } = await api.messages.get_message({
      message_id,
    });

    // TODO: засетить одной командой
    setMessagesStore("message", message);
    setMessagesStore("messages", messages);
    setMessagesStore("stream", stream);
  };

  const clean = () => {
    setMessagesStore("messages", []);
    setMessagesStore("stream", null);
  };

  return (
    <MessagesContext.Provider
      value={{
        messagesStore,
        setMessagesStore,
        update,
        clean,
      }}
    >
      {props.children}
    </MessagesContext.Provider>
  );
};

class MessagesStore {
  stream: IStream | null;
  message: IMessage | null;
  messages: IMessage[];

  constructor() {
    this.stream = null;
    this.message = null;
    this.messages = [];
  }

  static initialize(): MessagesStore {
    return new MessagesStore();
  }
}

export const useMessages = () => useContext(MessagesContext);

export type IMessage = {
  message_id: string;
  text: string;
  user: {
    user_id: string;
    name: string;
  };
  stream?: {
    text: string;
    users: {
      user_id: string;
      name: string;
    }[];
  };
};

type IStream = {
  stream_id: string;
  text: string | null;
};
