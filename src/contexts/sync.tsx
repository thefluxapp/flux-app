import {
  type ParentComponent,
  createContext,
  createSignal,
  onCleanup,
  useContext,
} from "solid-js";
import { type IMessage, useMessages } from "./messages";

const SyncContext = createContext({
  subscribe: null as unknown as (streamIds: string[]) => void,
});

export const SyncProvider: ParentComponent = (props) => {
  const { append } = useMessages();

  let timeout: Timer | undefined = undefined;

  const connect = (): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket("/api/notify");

      ws.onopen = () => {
        clearTimeout(timeout);
        resolve(ws);
      };

      ws.onmessage = (e) => {
        const event: IEvent = JSON.parse(e.data);

        process(event);
      };

      ws.onclose = (e) => {
        reject(e);

        if (e.code !== 1000) {
          timeout = setTimeout(() => {
            setWSStore(connect());
          }, 3000);
        }
      };
    });
  };

  const [wsStore, setWSStore] = createSignal(connect());

  const subscribe = async (streamIds: string[]) => {
    (await wsStore()).send(
      JSON.stringify({ subscribe: { stream_ids: streamIds } }),
    );
  };

  const process = (event: IEvent) => {
    if (event.message !== undefined) {
      const message = event.message;

      append([message]);
    }
  };

  onCleanup(async () => {
    (await wsStore()).close(1000);
    clearTimeout(timeout);
  });

  return (
    <SyncContext.Provider value={{ subscribe }}>
      {props.children}
    </SyncContext.Provider>
  );
};

export const useSync = () => useContext(SyncContext);

type IEvent = {
  message?: IEventMessage;
};

type IEventMessage = IMessage;
