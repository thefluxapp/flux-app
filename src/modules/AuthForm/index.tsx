import { useState } from "react";
import axios from "axios";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from "@simplewebauthn/typescript-types";
import { observer } from "mobx-react";
import { useRootContext } from "../../context";

export const AuthForm = observer(() => {
  const rootStore = useRootContext();

  const [email, setEmail] = useState("");

  const handleSubmit = async function (e: React.SyntheticEvent) {
    e.preventDefault();

    const res = (
      await axios.post<{
        id: String;
        challenge: {
          creation_challenge_response?: {
            publicKey: PublicKeyCredentialCreationOptionsJSON;
          };
          request_challenge_response?: {
            publicKey: PublicKeyCredentialRequestOptionsJSON;
          };
        };
      }>("/api/auth/join", { email })
    ).data;

    if (res.challenge.creation_challenge_response) {
      const reg = await startRegistration(
        res.challenge.creation_challenge_response.publicKey,
      );

      const data = (
        await axios.post<ResponseData>("/api/auth/complete", {
          id: res.id,
          reg,
        })
      ).data;

      rootStore.authStore.auth(data.token);
    }

    if (res.challenge.request_challenge_response) {
      const auth = await startAuthentication(
        res.challenge.request_challenge_response.publicKey,
      );

      const data = (
        await axios.post<ResponseData>("/api/auth/login", {
          id: res.id,
          auth,
        })
      ).data;

      rootStore.authStore.auth(data.token);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </form>
      </div>
    </div>
  );
});
