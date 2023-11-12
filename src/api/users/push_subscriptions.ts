import { Api } from "..";

export class PushSubscriptionsApi {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  vapid = async () => {
    return (
      await this.api.client.get<IUsersPushSubscriptionsVapidResponseData>(
        "/api/users/push_subscriptions/vapid",
      )
    ).data;
  };

  create = async (data: IUsersPushSubscriptionsCreateRequestData) => {
    return (
      await this.api.client.post<IUsersPushSubscriptionsCreateResponseData>(
        "/api/users/push_subscriptions",
        data,
      )
    ).data;
  };
}

export type IUsersPushSubscriptionsVapidResponseData = {
  public_key: string;
};

export type IUsersPushSubscriptionsCreateResponseData = {
  id: string;
};

export type IUsersPushSubscriptionsCreateRequestData = {
  endpoint: string;
  auth_key: string;
  p256dh_key: string;
};
