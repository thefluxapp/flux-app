import { type ParentComponent, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { EventSource } from "eventsource";

import { IState, useMessages } from "./messages";

const SSEContext = createContext({
  sseStore: null as unknown as SSEStore,
  // setSseStore: null as unknown as SetStoreFunction<SSEStore>,
});

export const SSEProvider: ParentComponent = (props) => {
  // const api = useAPI();
  const { append } = useMessages();
  const es = new EventSource("/api/notify");

  // console.log(es);

  const [sseStore] = createStore(SSEStore.initialize(es));

  es.onopen = () => {
    // console.log("OPEN");
  };

  es.onmessage = (e: MessageEvent<string>) => {
    const data: IEvent = JSON.parse(e.data);

    if (data.message !== null) {
      append([{ ...data.message, state: IState.Active }]);
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
};
