import type { API } from "../api";

export class StreamsAPI {
  api: API;

  constructor(api: API) {
    this.api = api;
  }

  get_streams = async (user: boolean): Promise<GetStreamsResponse> => {
    const url = ((): string => {
      if (user) {
        return "/api/streams/my";
      }

      return "/api/streams";
    })();

    return (await this.api.client.get<GetStreamsResponse>(url)).data;
  };
}

type GetStreamsResponse = {
  streams: {
    stream_id: string;
    message_id: string;
    text: string;
    messages_count: number;
    users: {
      user_id: string;
      name: string;
      first_name: string;
      last_name: string;
      abbr: string;
      color: string;
    }[];
  }[];
};
