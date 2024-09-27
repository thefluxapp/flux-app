import {
  type ParentComponent,
  createContext,
  useContext,
  onMount,
} from "solid-js";
import { type SetStoreFunction, createStore, produce } from "solid-js/store";

const RootContext = createContext({
  rootStore: null as unknown as RootStore,
  setRootStore: null as unknown as SetStoreFunction<RootStore>,
  updateToken: null as unknown as (token: string) => void,
});

export const RootProvider: ParentComponent = (props) => {
  const [rootStore, setRootStore] = createStore(RootStore.initialize());

  onMount(() => {
    window.onstorage = () => {
      setRootStore(
        produce((s) => {
          s.token = localStorage.getItem("auth-token");
        }),
      );
    };
  });

  const updateToken = (token: string) => {
    setRootStore(
      produce((s) => {
        s.token = token;
      }),
    );

    localStorage.setItem("auth-token", token);
  };

  return (
    <RootContext.Provider value={{ rootStore, setRootStore, updateToken }}>
      {props.children}
    </RootContext.Provider>
  );
};

export class RootStore {
  isInit = false;
  token: string | null = null;

  constructor(isInit: boolean, token: string | null) {
    this.isInit = isInit;
    this.token = token;
  }

  static initialize(): RootStore {
    const token = localStorage.getItem("auth-token");

    return new RootStore(true, token);
  }
}

export const useRoot = () => useContext(RootContext);
