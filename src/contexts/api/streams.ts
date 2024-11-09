import type { API } from "../api";

export class StreamsAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  get_stream = async (): Promise<IndexResponse> => {
    return (await this.api.client.get<IndexResponse>("/api/streams")).data;
  };
}

type IndexResponse = {
  streams: {
    stream_id: string;
    message_id: string;
    text: string | null;
    users: {
      user_id: string;
      name: string;
      first_name: string;
      last_name: string;
    }[];
  }[];
};
