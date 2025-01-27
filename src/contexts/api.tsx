import type {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
  PublicKeyCredentialWithAssertionJSON,
  PublicKeyCredentialWithAttestationJSON,
} from "@github/webauthn-json";
import axios, { type AxiosInstance } from "axios";
import { type ParentComponent, createContext, useContext } from "solid-js";

import { MessagesAPI } from "./api/messages";
import { PushAPI } from "./api/push";
import { StreamsAPI } from "./api/streams";
import { type RootStore, useRoot } from "./root";

const APIContext = createContext<API>(null as unknown as API);

export const APIProvider: ParentComponent = (props) => {
  const { rootStore } = useRoot();

  return (
    <APIContext.Provider value={new API(rootStore)}>
      {props.children}
    </APIContext.Provider>
  );
};

export class API {
  rootStore: RootStore;
  auth = new AuthAPI(this);
  push = new PushAPI(this);
  messages = new MessagesAPI(this);
  streams = new StreamsAPI(this);
  client: AxiosInstance;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.client = axios.create();
    this.client.interceptors.request.use((config) => {
      if (this.rootStore.token !== null) {
        config.headers.Authorization = `Bearer ${this.rootStore.token}`;
      }

      return config;
    });
  }
}

class AuthAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  me = async (): Promise<MeResponseData> => {
    return (await this.api.client.get("/api/auth/me")).data;
  };

  join = async (data: JoinRequestData): Promise<JoinResponseData> => {
    return (
      await this.api.client.post<JoinResponseData>("/api/auth/join", data)
    ).data;
  };

  complete = async (
    data: CompleteRequestData,
  ): Promise<CompleteResponseData> => {
    return (
      await this.api.client.post<CompleteResponseData>(
        "/api/auth/complete",
        data,
      )
    ).data;
  };

  login = async (data: LoginRequestData): Promise<LoginResponseData> => {
    return (
      await this.api.client.post<LoginResponseData>("/api/auth/login", data)
    ).data;
  };
}

export type MeResponseData = {
  user: {
    user_id: string;
    name: string;
    first_name: string;
    last_name: string;
    abbr: string;
    color: string;
  } | null;
};

export type JoinRequestData = {
  email: string;
};

export type JoinResponseData = {
  creation: CredentialCreationOptionsJSON | null;
  request: CredentialRequestOptionsJSON | null;
};

export type CompleteRequestData = {
  first_name: string;
  last_name: string;
  credential: CompleteCredentialRequestData;
};

type CompleteCredentialRequestData = PublicKeyCredentialWithAttestationJSON & {
  response: { publicKey: string; publicKeyAlgorithm: number };
};

export type CompleteResponseData = {
  jwt: string;
};

export type LoginRequestData = {
  credential: PublicKeyCredentialWithAssertionJSON;
};

export type LoginResponseData = {
  jwt: string;
};

export const useAPI = () => useContext(APIContext);
