import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "../RootStore";
import { StreamStore } from "../StreamStore";

export class StreamsStore {
  rootStore: RootStore;
  streamStore: StreamStore | null = null;
  streamsStore = new Map<string, StreamStore>();

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
  }

  updateStream = async (streamId?: string) => {
    if (streamId === undefined) {
      this.streamStore = null;
    } else {
      let stream = this.streamsStore.get(streamId);

      if (stream === undefined) {
        stream = new StreamStore(this, streamId, this.rootStore.authStore);
      } else {
        stream.update();
      }

      this.streamsStore.set(streamId, stream);
      this.streamStore = stream;
    }
  };
}
