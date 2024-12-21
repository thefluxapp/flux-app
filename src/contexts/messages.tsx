import { type ParentComponent, createContext, useContext } from "solid-js";
import {
  type SetStoreFunction,
  createStore,
  produce,
  reconcile,
} from "solid-js/store";

import { useAPI } from "./api";

const MessagesContext = createContext({
  messagesStore: null as unknown as MessagesStore,
  setMessagesStore: null as unknown as SetStoreFunction<MessagesStore>,
  update: null as unknown as (messageId: string) => Promise<void>,
  clean: null as unknown as () => void,
  append: null as unknown as (message: IMessage[]) => void,
});

export type IMessage = {
  message_id: string | null;
  code: string;
  text: string;
  state: IState;
  order: number;
  stream: IStream | null;
  user: {
    user_id: string;
    name: string;
    first_name: string;
    last_name: string;
    abbr: string;
    color: string;
  };
};

export type IStream = {
  stream_id: string;
  text: string;
  users: {
    user_id: string;
    name: string;
    first_name: string;
    last_name: string;
    abbr: string;
    color: string;
  }[];
};

export type MessageStore = IMessage;

export enum IState {
  New = "new",
  Processing = "processing",
  Active = "active",
  Failed = "failed",
}

type MessagesStore = {
  listStore: {
    messageStore: MessageStore;
    setMessageStore: SetStoreFunction<MessageStore>;
  }[];
  rootStore: {
    messageStore: MessageStore;
    setMessageStore: SetStoreFunction<MessageStore>;
  } | null;
};

export const MessagesProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [messagesStore, setMessagesStore] = createStore<MessagesStore>({
    listStore: [],
    rootStore: null,
  });

  const update = async (message_id: string) => {
    const data = await api.messages.get_message({
      message_id,
    });

    const [rootStore, setRootStore] = createStore<MessageStore>({
      ...data.message,
      state: IState.Active,
    });

    setMessagesStore("rootStore", {
      messageStore: rootStore,
      setMessageStore: setRootStore,
    });

    setMessagesStore(
      "listStore",
      data.messages.map((payload) => {
        const [message, setMessage] = createStore<MessageStore>({
          ...payload,
          state: IState.Active,
        });

        return {
          messageStore: message,
          setMessageStore: setMessage,
        };
      }),
    );
  };

  const clean = () => {
    setMessagesStore({
      listStore: [],
      rootStore: null,
    });
  };

  const append = (messages: IMessage[]) => {
    setMessagesStore(
      produce((store) => {
        for (const message of messages) {
          // console.log(message);

          const rr = store.listStore.find(
            ({ messageStore }) => messageStore.code === message.code,
          );

          if (rr !== undefined) {
            rr.setMessageStore(reconcile(message));
          } else {
            const [messageStore, setMessageStore] =
              createStore<IMessage>(message);

            store.listStore.push({
              messageStore,
              setMessageStore,
            });

            if (messageStore.state === IState.New) {
              save(messageStore, setMessageStore);
            }
          }
        }

        store.listStore = [
          ...store.listStore.sort(
            (a, b) => a.messageStore.order - b.messageStore.order,
          ),
        ];
      }),
    );
  };

  const save = async (
    messageStore: MessageStore,
    setMessageStore: SetStoreFunction<MessageStore>,
  ) => {
    setMessageStore("state", IState.Processing);

    const data = await api.messages.create_message(messageStore);

    if (data === false) {
      setMessageStore("state", IState.Failed);
    } else {
      // setMessage("state", IState.Failed);
    }

    // console.log(data);
  };

  return (
    <MessagesContext.Provider
      value={{
        messagesStore,
        setMessagesStore,
        update,
        clean,
        append,
      }}
    >
      {props.children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);
