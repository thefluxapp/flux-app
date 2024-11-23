import { type ParentComponent, createContext, useContext } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";

import { useAPI } from "./api";

const StreamsContext = createContext({
  streamsStore: null as unknown as StreamsStore,
  setStreamsStore: null as unknown as SetStoreFunction<StreamsStore>,
  update: null as unknown as (user: boolean) => Promise<void>,
});

export const StreamsProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [streamsStore, setStreamsStore] = createStore(
    StreamsStore.initialize(),
  );

  const update = async (user: boolean) => {
    setStreamsStore("streams", []);

    const data = await api.streams.get_streams(user);

    setStreamsStore("streams", data.streams);
  };

  return (
    <StreamsContext.Provider value={{ streamsStore, setStreamsStore, update }}>
      {props.children}
    </StreamsContext.Provider>
  );
};

class StreamsStore {
  streams: Stream[] | null = null;

  static initialize(): StreamsStore {
    return new StreamsStore();
  }
}

export const useStreams = () => useContext(StreamsContext);

type Stream = {
  stream_id: string;
  message_id: string;
  text: string | null;
  users: {
    user_id: string;
    name: string;
    first_name: string;
    last_name: string;
    abbr: string;
    color: string;
  }[];
};
