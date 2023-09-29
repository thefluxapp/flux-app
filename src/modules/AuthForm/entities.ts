import {
  type PublicKeyCredentialCreationOptionsJSON,
  type PublicKeyCredentialRequestOptionsJSON,
} from "@simplewebauthn/typescript-types";
import { type IAuthJoinRequestData } from "../../api/auth";

export type IChallenge = {
  creation: {
    id: string;
    key: PublicKeyCredentialCreationOptionsJSON;
  } | null;
  request: {
    id: string;
    key: PublicKeyCredentialRequestOptionsJSON;
  } | null;
};

export type IForm = IAuthJoinRequestData;
