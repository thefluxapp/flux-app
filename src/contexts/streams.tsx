import {
  type ParentComponent,
  createContext,
  useContext,
  onMount,
} from "solid-js";
import { createStore, produce, type SetStoreFunction } from "solid-js/store";

import { useAPI } from "./api";
import type { IndexStreamResponseData } from "./api/streams";

const StreamsContext = createContext({
  streamsStore: null as unknown as StreamsStore,
  setStreamsStore: null as unknown as SetStoreFunction<StreamsStore>,
});

export const StreamsProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [streamsStore, setStreamsStore] = createStore(
    StreamsStore.initialize(),
  );

  onMount(async () => {
    update();
  });

  const update = async () => {
    const data = await api.streams.index();

    console.log(data.streams)
    setStreamsStore(
      "streams",
      data.streams
      // produce((s) => {
      //   s.streams = data.streams;
      // }),
    );

    // console.log(data.streams);
  };

  return (
    <StreamsContext.Provider value={{ streamsStore, setStreamsStore }}>
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

type Stream = IndexStreamResponseData;
