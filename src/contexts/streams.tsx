import { type ParentComponent, createContext, useContext } from "solid-js";
import { type SetStoreFunction, createStore } from "solid-js/store";

import { useAPI } from "./api";
// import type { IndexStreamResponseData } from "./api/streams";

const StreamsContext = createContext({
  streamsStore: null as unknown as StreamsStore,
  setStreamsStore: null as unknown as SetStoreFunction<StreamsStore>,
  update: null as unknown as () => Promise<void>,
});

export const StreamsProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [streamsStore, setStreamsStore] = createStore(
    StreamsStore.initialize(),
  );

  // onMount(async () => {
  //   update();
  // });

  const update = async () => {
    const data = await api.streams.get_stream();

    // console.log(data.streams);

    setStreamsStore(
      "streams",
      data.streams,
      // produce((s) => {
      //   s.streams = data.streams;
      // }),
    );

    // console.log(data.streams);
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
  }[];
};
