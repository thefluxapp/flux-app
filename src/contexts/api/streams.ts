import type { API } from "../api";

export class StreamsAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  index = async (): Promise<IndexResponseData> => {
    return (await this.api.client.get<IndexResponseData>("/api/streams")).data;
  };

  show = async (streamId: string): Promise<GetStreamResponseData> => {
    return (
      await this.api.client.get<GetStreamResponseData>(
        `/api/streams/${streamId}`,
      )
    ).data;
  };

  messages = async (streamId: string) => {
    return (
      await this.api.client.get<MessagesResponseData>(
        `/api/streams/${streamId}/messages`,
      )
    ).data;
  };
}

type IndexResponseData = {
  streams: IndexStreamsResponseData;
};

type IndexStreamsResponseData = IndexStreamResponseData[];

export type IndexStreamResponseData = {
  id: string;
  message_id: string;
  title: string | null;
  text: string | null;
};

type MessagesResponseData = {
  messages: MessagesMessageResponseData[];
};

export type MessagesMessageResponseData = {
  id: string;
  text: string;
};

type GetStreamResponseData = {
  stream: GetStreamStreamResponseData;
};

export type GetStreamStreamResponseData = {
  id: string;
  message_id: string;
};
