import type { API } from "../api";

export class PushAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  get_vapid = async (): Promise<GetVapidResponse> => {
    return (await this.api.client.get<GetVapidResponse>("/api/push/vapid"))
      .data;
  };
}

type GetVapidResponse = {
  public_key: string;
};
