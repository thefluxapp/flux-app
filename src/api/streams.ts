import { Api } from ".";

export class StreamsApi {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  index = async () => {
    return (
      await this.api.client.get<IStreamsIndexResponseData>("/api/streams")
    ).data.streams;
  };

  show = async (streamId: string, limit: number, before?: string) => {
    return (
      await this.api.client.get<IStreamsShowResponseData>(
        `/api/streams/${streamId}`,
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

export type IStreamsIndexResponseData = {
  streams: IStreamsIndexStreams;
};

export type IStreamsIndexStreams = IStreamsIndexStream[];

export type IStreamsIndexStream = {
  id: string;
  title: string;
  label: string;
  text: string;
  user?: IStreamsIndexUser;
};

export type IStreamsIndexUser = {
  id: string;
  name: string;
};

export type IStreamsShowResponseData = {
  stream: IStreamsShowStream;
  messages: IStreamsShowMessages;
};

export type IStreamsShowStream = {
  id: string;
  text: string;
};

export type IStreamsShowMessages = IStreamsShowMessage[];

export type IStreamsShowMessage = {
  id: string;
  text: string;
  status: IStreamsShowMessageStatus;
  user: IStreamsShowMessageUser;
  stream?: IStreamsShowMessageStream;
  order: bigint;
};

export type IStreamsShowMessageUser = {
  id: string;
  name: string;
  image: string;
};

export type IStreamsShowMessageStream = {
  id: string;
  text: string;
};

export type IStreamsShowMessageStatus =
  | "new"
  | "processing"
  | "saved"
  | "failed";
