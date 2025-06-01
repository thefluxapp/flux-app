import {
  type ParentComponent,
  createContext,
  onMount,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";

import WORKER_PATH from "./../worker?worker&url";

const WorkerContext = createContext<WorkerStore>();

export const WorkerProvider: ParentComponent = (props) => {
  const [workerStore] = createStore(new WorkerStore(WORKER_PATH));

  onMount(async () => {
    (await workerStore.registration)?.update();
  });

  return (
    <WorkerContext.Provider value={workerStore}>
      {props.children}
    </WorkerContext.Provider>
  );
};

class WorkerStore {
  registration: Promise<ServiceWorkerRegistration | undefined>;

  constructor(clientURL: string) {
    if (!("serviceWorker" in navigator)) {
      this.registration = new Promise(() => undefined);
    } else {
      this.registration = navigator.serviceWorker
        .getRegistration(clientURL)
        .then((reg) => {
          if (!reg) {
            return navigator.serviceWorker.register(clientURL, {
              type: "module",
            });
          }

          return reg;
        });
    }
  }
}

export const useWorker = () => {
  const context = useContext(WorkerContext);

  if (context === undefined) {
    throw "!!!";
  }

  return context;
};
