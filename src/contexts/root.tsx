import { nanoid } from "nanoid";
import {
  type ParentComponent,
  createContext,
  onMount,
  useContext,
} from "solid-js";
import { type SetStoreFunction, createStore, produce } from "solid-js/store";

const AUTH_TOKEN_KEY = "auth-token";
const DEVICE_ID_KEY = "device-id";

const RootContext = createContext({
  rootStore: null as unknown as RootStore,
  setRootStore: null as unknown as SetStoreFunction<RootStore>,
  updateToken: null as unknown as (token: string) => void,
});

export const RootProvider: ParentComponent = (props) => {
  const [rootStore, setRootStore] = createStore(RootStore.initialize());

  onMount(async () => {
    window.onstorage = () => {
      setRootStore(
        produce((s) => {
          s.token = localStorage.getItem(AUTH_TOKEN_KEY);
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

    localStorage.setItem(AUTH_TOKEN_KEY, token);
  };

  // const getUser = async () => {
  //   const data = await api.auth.me();

  //   if (data.user !== null) {
  //     setAuthStore(
  //       produce((s) => {
  //         s.isAuth = true;
  //         s.user = data.user;
  //       }),
  //     );
  //   }
  // };

  return (
    <RootContext.Provider value={{ rootStore, setRootStore, updateToken }}>
      {props.children}
    </RootContext.Provider>
  );
};

export class RootStore {
  token: string | null = null;
  deviceId: string;

  constructor(token: string | null, deviceId: string) {
    this.token = token;
    this.deviceId = deviceId;
  }

  static initialize(): RootStore {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);

    if (deviceId == null) {
      deviceId = nanoid();

      localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }

    return new RootStore(token, deviceId);
  }
}

export const useRoot = () => useContext(RootContext);
