import type { API } from "../api";

export class MessagesAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  create_message = async (data: CreateMessageRequest) => {
    return (
      await this.api.client.post<CreateMessageResponse>("/api/messages", data)
    ).data;
  };

  get_message = async (data: GetMessageRequest) => {
    return (
      await this.api.client.get<GetMessageResponse>(
        `/api/messages/${data.message_id}`,
      )
    ).data;
  };
}

type GetMessageRequest = {
  message_id: string;
};

type GetMessageResponse = {
  messages: {
    message_id: string;
    text: string;
    user: {
      user_id: string;
      name: string;
      first_name: string;
      last_name: string;
      abbr: string;
      color: string;
    };
  }[];

  message: {
    message_id: string;
    text: string;
    user: {
      user_id: string;
      name: string;
      first_name: string;
      last_name: string;
      abbr: string;
      color: string;
    };
  };

  stream: {
    stream_id: string;
    text: string | null;
  } | null;
};

type CreateMessageRequest = {
  message_id?: string;
  text: string;
};

type CreateMessageResponse = {
  message: {
    message_id: string;
    // order: bigint;
  };
  // stream: {
  //   id: string;
  // };
};
