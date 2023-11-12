import axios, { AxiosInstance } from "axios";
import { useRootContext } from "../context";
import { AuthStore } from "../stores/AuthStore";
import { MessagesApi } from "./messages";
import { StreamsApi } from "./streams";
import { UsersApi } from "./users";

export class Api {
  authStore: AuthStore;
  client: AxiosInstance;

  streams = new StreamsApi(this);
  messages = new MessagesApi(this);
  users = new UsersApi(this);

  constructor(authStore: AuthStore) {
    this.authStore = authStore;

    this.client = axios.create();
    this.client.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${this.authStore.token}`;

      return config;
    });
  }
}

const rootStore = useRootContext();

export const api = new Api(rootStore.authStore);
