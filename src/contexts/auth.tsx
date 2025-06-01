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
    // localStorage.setItem("auth-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMTk2YzAzYS1hYzgyLTc3NDEtYThiYS1hYjI0YTczOWM5YzYiLCJleHAiOjE3NzI5MDE4MDd9.q51PcbSgFLXzB4cyVtS9lCYrnd7YXddRYXM-Sx_K9KIIVuDWOC7n2UUBLAZgo92VL3pN0rwWj-vSwxb9FwyWIQ6cSDLiSWHic6MPZ0o1l32Y4W6nLuwePQ96rF6enpYKcArApqhFJMLeExME1ytRi-bgixi4CKKUV38eZh_8f53zDhzqpLkX-VTAEetKlie4nlBcn26jqEaB8QQBZmk0DcU9h9qAD6Y6f8qEB8g0qhqJGuc4fZsefSoKJTichpVMACj0fYmdV9aNdX5rfoGYHA2rrdsK5phCkQ1-Cop8zDILG5rvJhfuywSxl85ZY5-6_WJYjy8fyqBvuwr5kLiiOU-ig4MMTGrfYh0szkFUXYEh79SLHxNLIaVFFXbET8esI_PdWvbNt0Ryud5gcmVFSyeH45uuVHn-S3oOb0MfVx9JvdjkQSk1f3CeoXDp1tnQuHOcC4caqsZ6AgX1wRzcEjt6mf7Xaad_DiIjSc_bArwFP5pGnCYFlGpFHsesq6wnWWCj2fM3V71znO5z6KaLzNU-5i61u3x2sk6DgXzS34bjEgTLuyzVe2Mrro4FX_gjHWep1ipkWEw38S-wfgo1Im93-MC00nh5RjoFgAx4LqqH1qtCiDPHr8ecPf5pOcdnvq0QBhfx47ofuuXDw-fFh66EVdLm7r0lH_7q6af2X-8")
    // localStorage.setItem("device-id", "6D8a3rCX4pXf4iFv1L_Jv")
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
