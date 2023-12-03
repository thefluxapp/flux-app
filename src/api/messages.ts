import { Api } from ".";

export class MessagesApi {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  create = async (data: IMessagesCreateRequestData) => {
    return (
      await this.api.client.post<IMessagesCreateResponseData>(
        "/api/messages",
        data,
      )
    ).data;
  };
}

export type IMessagesCreateRequestData = {
  text: string;
  message_id?: string;
  stream_id?: string;
};

export type IMessagesCreateResponseData = {
  id: string;
  order: bigint;
};
