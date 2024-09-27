import type {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
} from "@github/webauthn-json";
import { MetaProvider, Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { Show, onMount } from "solid-js";
import { createStore } from "solid-js/store";

import { useAuth } from "../../contexts/auth";
import { Complete } from "./complete";
import type { CredentialOptions } from "./entities";
import { Join } from "./join";
import { Login } from "./login";

export const AuthPage = () => {
  const { authStore } = useAuth();
  const navigate = useNavigate();
  const [credentialOptions, setCredentialOptions] =
    createStore<CredentialOptions>({ creation: null, request: null });

  onMount(() => {
    if (authStore.isAuth) {
      navigate("/streams");
    }
  });

  return (
    <MetaProvider>
      <Title>Вход</Title>

      <Show
        when={
          credentialOptions.creation == null &&
          credentialOptions.request == null
        }
      >
        <Join setCredentialOptions={setCredentialOptions} />
      </Show>

      <Show
        when={
          credentialOptions.creation != null &&
          credentialOptions.request == null
        }
      >
        <Complete
          creation={credentialOptions.creation as CredentialCreationOptionsJSON}
        />
      </Show>

      <Show
        when={
          credentialOptions.creation == null &&
          credentialOptions.request != null
        }
      >
        <Login
          request={credentialOptions.request as CredentialRequestOptionsJSON}
        />
      </Show>
    </MetaProvider>
  );
};
