import { type ParentComponent, createContext, useContext } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";

import { useAPI } from "./api";

type StreamsStore = {
  loading: boolean;
  streams: IStream[];
};

type StreamsContextData = {
  streamsStore: StreamsStore;
  setStreamsStore: SetStoreFunction<StreamsStore>;
  update: (user: boolean) => Promise<void>;
};

const StreamsContext = createContext(null as unknown as StreamsContextData);

export const StreamsProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [streamsStore, setStreamsStore] = createStore<StreamsStore>({
    loading: false,
    streams: [],
  });

  const update = async (user: boolean) => {
    setStreamsStore("loading", true);
    setStreamsStore("streams", []);

    const data = await api.streams.get_streams(user);

    setStreamsStore("streams", data.streams);
    setStreamsStore("loading", false);
  };

  return (
    <StreamsContext.Provider value={{ streamsStore, setStreamsStore, update }}>
      {props.children}
    </StreamsContext.Provider>
  );
};

export const useStreams = () => useContext(StreamsContext);

export type IStream = {
  stream_id: string;
  message_id: string;
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
