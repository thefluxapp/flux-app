import axios, { AxiosInstance } from "axios";
import { AuthStore } from "../stores/AuthStore";
import { AuthApi } from "./auth";
import { MessagesApi } from "./messages";
import { StreamsApi } from "./streams";
import { UsersApi } from "./users";
// import { RootStore } from "../stores/RootStore";

export class Api {
  authStore: AuthStore;
  client: AxiosInstance;

  auth = new AuthApi(this);
  streams = new StreamsApi(this);
  messages = new MessagesApi(this);
  users = new UsersApi(this);

  constructor(authStore: AuthStore) {
    this.authStore = authStore;

    this.client = axios.create();
    this.client.interceptors.request.use(async (config) => {
      const token = await this.authStore.token;

      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }
}
