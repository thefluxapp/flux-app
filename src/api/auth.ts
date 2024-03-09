import type { Api } from ".";

export class AuthApi {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  index = async () => {
    return (await this.api.client.get<IAuthIndexResponseData>("/api/auth"))
      .data;
  };
}

export type IAuthJoinRequestData = {
  email: string;
  first_name: string;
  last_name: string;
};

export type IAuthIndexResponseData = {
  user: IAuthIndexUser | null;
};

export type IAuthIndexUser = {
  id: string;
  name: string;
  abbr: string;
  image?: string;
};
