import { Show, onMount } from "solid-js";
import { MetaProvider, Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { createStore } from "solid-js/store";
import type {
  CredentialCreationOptionsJSON,
  CredentialRequestOptionsJSON,
} from "@github/webauthn-json";

import { Join } from "./join";
import { Complete } from "./complete";
import type { CredentialOptions } from "./entities";
import { Login } from "./login";
import { useAuth } from "../../contexts/auth";

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
