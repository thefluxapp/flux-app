import type { API } from "../api";

export class MessagesAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  create_message = async (data: CreateMessageRequestData) => {
    return (
      await this.api.client.post<CreateMessageResponseData>(
        "/api/messages",
        data,
      )
    ).data;
  };

  create_message_stream = async (data: CreateMessageStreamRequestData) => {
    return (
      await this.api.client.post<CreateMessageStreamResponseData>(
        "/api/messages/stream",
        data,
      )
    ).data;
  };

  show = async (messageId: string) => {
    return (
      await this.api.client.get<ShowResponseData>(`/api/messages/${messageId}`)
    ).data;
  };
}

type CreateMessageRequestData = {
  message_id: string;
  text: string;
};

type CreateMessageStreamRequestData = {
  title: string;
  text: string;
};

type CreateMessageStreamResponseData = {
  stream: {
    id: string;
  };
};

type CreateMessageResponseData = {
  message: {
    id: string;
    // order: bigint;
  };
  stream: {
    id: string;
  };
};

type ShowResponseData = {
  id: string;
};
