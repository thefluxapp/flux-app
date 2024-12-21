import axios from "axios";
// import type { API } from ".";

export const me = async (): Promise<IMeResponseData> => {
  return (await axios.get<IMeResponseData>("/api/auth/me")).data;
};

type IMeResponseData = {
  user: IMeUser | null;
};

type IMeUser = {
  id: string;
  name: string;
  abbr: string;
  image?: string;
};
