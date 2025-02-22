import type { API } from "../api";

export class PushesAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  get_vapid = async (): Promise<GetVapidResponse> => {
    return (await this.api.client.get<GetVapidResponse>("/api/pushes/vapid"))
      .data;
  };

  create_push = async (
    data: CreatePushRequest,
  ): Promise<CreatePushResponse> => {
    return (await this.api.client.post<CreatePushResponse>("/api/pushes", data))
      .data;
  };

  get_pushes = async (): Promise<GetPushesResponse> => {
    return (await this.api.client.get<GetPushesResponse>("/api/pushes")).data;
  };
}

type GetVapidResponse = {
  public_key: string;
};

type GetPushesResponse = {
  device_ids: string[];
};

type CreatePushRequest = PushSubscriptionJSON & {
  // authentication_secret: string;
  device_id: string;
  // endpoint: string;
  // keys: {
  //   auth: string;
  //   p256dh: string;
  // };
  // public_key: string;
};

type CreatePushResponse = null;
