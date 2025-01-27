import {
  type ParentComponent,
  createContext,
  onMount,
  useContext,
} from "solid-js";

// import WORKER_PATH from "./../worker?worker&url";

const WorkerContext = createContext({
  // sseStore: null as unknown as SSEStore,
});

export const WorkerProvider: ParentComponent = (props) => {
  onMount(async () => {
    // const qq = new URL("../worker.ts", import.meta.url);

    const qq = import.meta.glob("../worker.ts");

    console.log(qq);

    // let registration = await navigator.serviceWorker.getRegistration(qq);

    // if (!registration) {
    //   registration = await navigator.serviceWorker.register(qq, {
    //     type: "module",
    //   });
    // }

    // console.log(registration);
    // console.log(WORKER_PATH);
  });

  return (
    <WorkerContext.Provider value={{}}>{props.children}</WorkerContext.Provider>
  );
};

// class SSEStore {
//   es: EventSource;

//   constructor(es: EventSource) {
//     this.es = es;
//   }

//   static initialize(es: EventSource): SSEStore {
//     return new SSEStore(es);
//   }
// }

export const useWorker = () => useContext(WorkerContext);
