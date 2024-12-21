import { EventSource } from "eventsource";
import { type ParentComponent, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

import { IState, useMessages } from "./messages";

const SSEContext = createContext({
  sseStore: null as unknown as SSEStore,
});

export const SSEProvider: ParentComponent = (props) => {
  const { append, messagesStore } = useMessages();
  const es = new EventSource("/api/notify");

  const [sseStore] = createStore(SSEStore.initialize(es));

  es.onopen = () => {
    // console.log("OPEN");
  };

  es.onmessage = (e: MessageEvent<string>) => {
    const data: IEvent = JSON.parse(e.data);

    if (data.message !== null) {
      if (
        messagesStore.rootStore?.messageStore.message_id ===
        data.message.stream.message_id
      ) {
        append([{ ...data.message, state: IState.Active }]);
      }
    }
  };

  return (
    <SSEContext.Provider value={{ sseStore }}>
      {props.children}
    </SSEContext.Provider>
  );
};

class SSEStore {
  es: EventSource;

  constructor(es: EventSource) {
    this.es = es;
  }

  static initialize(es: EventSource): SSEStore {
    return new SSEStore(es);
  }
}

export const useSSE = () => useContext(SSEContext);

type IEvent = {
  message: IEventMessage | null;
};

type IEventMessage = {
  message_id: string;
  text: string;
  code: string;
  order: number;
  stream: {
    message_id: string;
    stream_id: string;
  };
  user: {
    user_id: string;
    name: string;
    first_name: string;
    last_name: string;
    abbr: string;
    color: string;
  };
};
