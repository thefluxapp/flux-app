import { Api } from ".";

export class AuthApi {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  index = async (token: string | null) => {
    return (
      await this.api.client.get<IAuthIndexResponseData>("/api/auth", {
        headers: {
          Authorization: token === null ? undefined : `Bearer ${token}`,
        },
      })
    ).data;
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
  image: string;
};
