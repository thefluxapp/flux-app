import {
  type ParentComponent,
  createContext,
  useContext,
  onMount,
} from "solid-js";
import { type SetStoreFunction, createStore, produce } from "solid-js/store";

import { useAPI } from "./api";

const AuthContext = createContext({
  authStore: null as unknown as AuthStore,
  setAuthStore: null as unknown as SetStoreFunction<AuthStore>,
});

export const AuthProvider: ParentComponent = (props) => {
  const api = useAPI();

  const [store, setStore] = createStore(new AuthStore());

  onMount(async () => {
    const data = await api.auth.me();

    if (data.user !== null) {
      setStore(
        produce((s) => {
          s.isAuth = true;
        }),
      );
    }
  });

  return (
    <AuthContext.Provider value={{ authStore: store, setAuthStore: setStore }}>
      {props.children}
    </AuthContext.Provider>
  );
};

class AuthStore {
  isInit = false;
  isAuth = false;
  token: string | null = null;
}

export const useAuth = () => useContext(AuthContext);
