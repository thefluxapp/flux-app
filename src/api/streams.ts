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

  show = async (streamId: string) => {
    return (
      await this.api.client.get<IStreamsShowResponseData>(
        `/api/streams/${streamId}`,
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
  user?: IStreamsShowMessageUser;
  stream?: IStreamsShowMessageStream;
};

export type IStreamsShowMessageUser = {
  id: string;
  name: string;
  label: string;
};

export type IStreamsShowMessageStream = {
  id: string;
  text: string;
};
