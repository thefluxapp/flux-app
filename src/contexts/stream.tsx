import { type ParentComponent, createContext, useContext } from "solid-js";
import { createStore, type SetStoreFunction } from "solid-js/store";

import { useAPI } from "./api";
import type {
  MessagesMessageResponseData,
  GetStreamStreamResponseData,
} from "./api/streams";

const StreamContext = createContext({
  streamStore: null as unknown as StreamStore,
  setStreamStore: null as unknown as SetStoreFunction<StreamStore>,
  update: null as unknown as (streamId: string) => Promise<void>,
});

export const StreamProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [streamStore, setStreamStore] = createStore(StreamStore.initialize());

  const update = async (streamId: string) => {
    const { stream } = await api.streams.show(streamId);
    const { messages } = await api.streams.messages(streamId);

    // TODO: засетить одной командой
    setStreamStore("messages", messages);
    setStreamStore("stream", stream);
  };

  return (
    <StreamContext.Provider
      value={{
        streamStore: streamStore,
        setStreamStore: setStreamStore,
        update,
      }}
    >
      {props.children}
    </StreamContext.Provider>
  );
};

class StreamStore {
  stream?: Stream;
  messages?: Message[];

  static initialize(): StreamStore {
    return new StreamStore();
  }
}

export const useStream = () => useContext(StreamContext);

type Message = MessagesMessageResponseData;
type Stream = GetStreamStreamResponseData;
