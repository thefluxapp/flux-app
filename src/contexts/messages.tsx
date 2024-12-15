import { type ParentComponent, createContext, useContext } from "solid-js";
import {
  type SetStoreFunction,
  createStore,
  produce,
  reconcile,
} from "solid-js/store";

import { useAPI } from "./api";
// import type { IEventMessage } from "./sse";

const MessagesContext = createContext({
  messagesStore: null as unknown as IMessages,
  setMessagesStore: null as unknown as SetStoreFunction<IMessages>,

  update: null as unknown as (messageId: string) => Promise<void>,
  clean: null as unknown as () => void,
  append: null as unknown as (message: IMessage[]) => void,
  // process: null as unknown as (message: IMessage) => void,
});

export type IMessage = {
  message_id: string | null;
  code: string;
  text: string;
  state: IState;
  order: number;
};

export enum IState {
  New = "new",
  Processing = "processing",
  Active = "active",
  Failed = "failed",
}

type IMessageStore = {
  message: IMessage;
  setMessage: SetStoreFunction<IMessage>;
};

type IMessages = {
  listStore: IMessageStore[];
  rootStore: IMessageStore | null;
};

export const MessagesProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [messages, setMessagesStore] = createStore<IMessages>({
    listStore: [],
    rootStore: null,
  });

  const update = async (message_id: string) => {
    const data = await api.messages.get_message({
      message_id,
    });

    const [rootMessage, setRootMessage] = createStore<IMessage>({
      ...data.message,
      state: IState.Active,
    });

    setMessagesStore("rootStore", {
      message: rootMessage,
      setMessage: setRootMessage,
    });

    append(
      data.messages.map((message) => ({ ...message, state: IState.Active })),
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
            (v) => v.message.code === message.code,
          );

          if (rr !== undefined) {
            rr.setMessage(reconcile(message));
          } else {
            const [messageStore, setMessageStore] =
              createStore<IMessage>(message);

            store.listStore.push({
              message: messageStore,
              setMessage: setMessageStore,
            });

            if (messageStore.state === IState.New) {
              save(messageStore, setMessageStore);
            }
          }
        }

        store.listStore = [
          ...store.listStore.sort((a, b) => a.message.order - b.message.order),
        ];
      }),
    );
  };

  const save = async (
    message: IMessage,
    setMessage: SetStoreFunction<IMessage>,
  ) => {
    const data = await api.messages.create_message(message);

    if (data === false) {
      setMessage("state", IState.Failed);
    } else {
      // setMessage("state", IState.Failed);
    }

    // console.log(data);
  };

  return (
    <MessagesContext.Provider
      value={{
        messagesStore: messages,
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
