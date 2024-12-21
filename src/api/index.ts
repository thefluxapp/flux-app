import axios from "axios";
import { useAuth } from "../contexts/auth";
import * as auth from "./auth";

export default { auth };

axios.interceptors.request.use((config) => {
  const { authStore: store } = useAuth();

  if (store.token !== null) {
    config.headers.Authorization = `Bearer ${store.token}`;
  }

  return config;
});

// export class API {
//   client: AxiosInstance;

//   auth = new AuthAPI(this);

//   constructor() {
//     this.client = axios.create();
//     this.client.interceptors.request.use(async (config) => {
//       // const token = await this.authStore.token;

//       // if (token !== null) {
//       //   config.headers.Authorization = `Bearer ${token}`;
//       // }

//       return config;
//     });
//   }
// }
