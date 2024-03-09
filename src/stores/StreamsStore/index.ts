import { makeAutoObservable } from "mobx";

import type { RootStore } from "../RootStore";
// import { StreamStore } from "../StreamStore";

export class StreamsStore {
  rootStore: RootStore;
  isCurrentUser = false;
  // streamStore: StreamStore | null = null;
  // streamsStore = new Map<string, StreamStore>();

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });

    this.rootStore = rootStore;
  }

  setIsCurrentUser = (isCurrentUser: boolean) => {
    this.isCurrentUser = isCurrentUser;
  };

  clear = () => {
    // TODO: Make smart cleanup when WS is here
    // this.streamStore = null;
    // this.streamsStore.clear();
  };
  // updateStream = async (streamId?: string) => {
  //   if (streamId === undefined) {
  //     // this.streamStore = null;
  //     // this.streamsStore.clear();
  //   } else {
  //     let stream = this.streamsStore.get(streamId);

  //     if (stream === undefined) {
  //       stream = new StreamStore(this, streamId, this.rootStore.authStore);
  //     }

  //     this.streamsStore.set(streamId, stream);
  //     this.streamStore = stream;
  //   }
  // };
}
