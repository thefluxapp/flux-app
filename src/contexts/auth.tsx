import {
  type ParentComponent,
  Show,
  createContext,
  onMount,
  useContext,
} from "solid-js";
import { type SetStoreFunction, createStore, produce } from "solid-js/store";

import { useAPI } from "./api";

const AuthContext = createContext({
  authStore: null as unknown as AuthStore,
  setAuthStore: null as unknown as SetStoreFunction<AuthStore>,
  update: null as unknown as () => Promise<void>,
});

export const AuthProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [authStore, setAuthStore] = createStore(AuthStore.initialize());

  const update = async () => {
    const data = await api.auth.me();

    if (data.user !== null) {
      setAuthStore(
        produce((s) => {
          s.isAuth = true;
          s.user = data.user;
        }),
      );
    }
  };

  onMount(async () => {
    await update();

    setAuthStore(
      produce((s) => {
        s.isInit = true;
      }),
    );
  });

  return (
    <AuthContext.Provider value={{ authStore, setAuthStore, update }}>
      <Show when={authStore.isInit}>{props.children}</Show>
    </AuthContext.Provider>
  );
};

export class AuthStore {
  isInit = false;
  isAuth = false;
  user: IUser | null = null;
  token: string | null = null;

  constructor(token: string | null) {
    this.token = token;
  }

  static initialize(): AuthStore {
    const token = localStorage.getItem("auth-token");
    return new AuthStore(token);
  }
}

export const useAuth = () => useContext(AuthContext);

type IUser = {
  user_id: string;
  name: string;
  first_name: string;
  last_name: string;
  abbr: string;
  color: string;
};
