import { Api } from ".";
import { PushSubscriptionsApi } from "./users/push_subscriptions";

export class UsersApi {
  api: Api;
  push_subscriptions: PushSubscriptionsApi;

  constructor(api: Api) {
    this.api = api;
    this.push_subscriptions = new PushSubscriptionsApi(api);
  }
}
