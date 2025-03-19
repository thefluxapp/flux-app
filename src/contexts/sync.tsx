import {
  type ParentComponent,
  createContext,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

// import { useAPI } from "./api";

const SyncContext = createContext({
  syncStore: null as unknown as SyncStore,
});

export const SyncProvider: ParentComponent = (props) => {
  // const api = useAPI();

  const [syncStore, setSyncStore] = createStore(SyncStore.initialize());

  onMount(() => {
    connect();
  });

  const connect = () => {
    close();

    const ws = new WebSocket(syncStore.url);

    ws.onopen = (e) => {
      // console.log("OPEN");
      // console.log(e);
    };

    ws.onerror = (e) => {
      // console.log("ERROR");
      // console.log(e);
    };

    ws.onclose = (e) => {
      if (e.code !== 1000) {
        const timeout = setTimeout(() => {
          connect();
        }, 1000);

        setSyncStore("timeout", timeout);
      }
    };

    setSyncStore("ws", ws);
  };

  const close = () => {
    syncStore.ws?.close(1000);

    clearTimeout(syncStore.timeout);
    setSyncStore({ ws: undefined, timeout: undefined });
  };

  onCleanup(() => {
    // console.log("CLEANUP");
    close();
  });

  return (
    <SyncContext.Provider value={{ syncStore }}>
      {props.children}
    </SyncContext.Provider>
  );
};

class SyncStore {
  url: URL;
  ws?: WebSocket;
  timeout?: Timer;

  constructor(url: URL) {
    this.url = url;
  }

  static initialize(): SyncStore {
    const url = new URL("/api/notify", window.location.href);
    url.protocol = url.protocol.replace("http", "ws");

    return new SyncStore(url);
  }
}

export const useSync = () => useContext(SyncContext);

// type IEvent = {
//   message: IEventMessage | null;
// };

// type IEventMessage = {
//   message_id: string;
//   text: string;
//   code: string;
//   order: number;
//   stream: {
//     message_id: string;
//     stream_id: string;
//   };
//   user: {
//     user_id: string;
//     name: string;
//     first_name: string;
//     last_name: string;
//     abbr: string;
//     color: string;
//   };
// };
