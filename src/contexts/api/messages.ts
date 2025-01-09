import type { API } from "../api";

export class MessagesAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  create_message = async (data: CreateMessageRequest) => {
    const res = await this.api.client.post<CreateMessageResponse>(
      "/api/messages",
      data,
      {
        validateStatus: (_) => {
          return true;
        },
      },
    );

    if (res.status === 200) {
      return res.data;
    }

    return false;
  };

  get_message = async (data: GetMessageRequest) => {
    const { message_id, ...params } = data;

    return (
      await this.api.client.get<GetMessageResponse>(
        `/api/messages/${message_id}`,
        {
          params,
        },
      )
    ).data;
  };
}

type GetMessageRequest = {
  message_id: string;
  cursor_message_id: string | null;
};

type GetMessageResponse = {
  cursor_message_id: string | null;
  messages: {
    message_id: string;
    text: string;
    code: string;
    user: {
      user_id: string;
      name: string;
      first_name: string;
      last_name: string;
      abbr: string;
      color: string;
    };
    stream: {
      stream_id: string;
      message_id: string;
      text: string;
      users: {
        user_id: string;
        name: string;
        first_name: string;
        last_name: string;
        abbr: string;
        color: string;
      }[];
    } | null;
    order: number;
  }[];

  message: {
    message_id: string;
    text: string;
    code: string;
    user: {
      user_id: string;
      name: string;
      first_name: string;
      last_name: string;
      abbr: string;
      color: string;
    };
    stream: {
      stream_id: string;
      message_id: string;
      text: string;
      users: {
        user_id: string;
        name: string;
        first_name: string;
        last_name: string;
        abbr: string;
        color: string;
      }[];
    } | null;
    order: number;
  };
};

type CreateMessageRequest = {
  message_id: string | null;
  text: string;
  code: string;
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
