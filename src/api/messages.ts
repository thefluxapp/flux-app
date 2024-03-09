import { Api } from ".";

export class MessagesApi {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  index = async () => {
    return (
      await this.api.client.get<IMessagesIndexResponseData>("/api/messages")
    ).data.messages;
  };

  create = async (data: IMessagesCreateRequestData) => {
    return (
      await this.api.client.post<IMessagesCreateResponseData>(
        "/api/messages",
        data,
      )
    ).data;
  };

  show = async (messageId: string) => {
    return (
      await this.api.client.get<IMessagesShowResponseData>(
        `/api/messages/${messageId}`,
      )
    ).data;
  };

  messages = async (messageId: string, limit: number, before?: string) => {
    return (
      await this.api.client.get<IMessagesMessagesResponseData>(
        `/api/messages/${messageId}/messages`,
        {
          params: {
            limit,
            before,
          },
        },
      )
    ).data;
  };
}

export type IMessagesIndexResponseData = {
  messages: IMessagesIndexMessage[];
};

export type IMessagesIndexMessage = {
  id: string;
  text: string;
};

export type IMessagesCreateRequestData = {
  title?: string;
  text: string;
  message_id?: string;
  stream_id?: string;
};

export type IMessagesCreateResponseData = {
  id: string;
  order: bigint;
  status: IMessageStatus;
};

export type IMessagesShowResponseData = {
  message: IMessage;
};

export type IMessagesMessagesResponseData = {
  messages: IMessage[];
};

export type IMessagesMessagesUser = {
  id: string;
  name: string;
  abbr: string;
  image?: string;
};

export type IMessagesMessagesStream = {
  id: string;
  message_id: string;
  text?: string;
};

export type IMessageStatus = "new" | "active" | "processing";
export type IMessage = {
  id: string;
  text: string;
  status: IMessageStatus;
  user: IMessagesMessagesUser;
  stream?: IMessagesMessagesStream;
  order: bigint;
};
