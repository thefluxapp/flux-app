import { onMount } from "solid-js";
import type { CredentialRequestOptionsJSON } from "@github/webauthn-json";
import { get } from "@github/webauthn-json/extended";
import { useNavigate } from "@solidjs/router";

import { useAPI } from "../../../contexts/api";
import { useRoot } from "../../../contexts/root";

import s from "./index.module.css";


export const Login = ({
  request,
}: { request: CredentialRequestOptionsJSON }) => {
  const api = useAPI();
  const navigate = useNavigate()
  const { updateToken } = useRoot();

  const handleLogin = async () => {
    const credential = await get(request);

    const data = await api.auth.login({ credential });
    updateToken(data.jwt);
    navigate("/streams")
  };

  onMount(async () => {
    await handleLogin();
  });

  return <div class={s.root} />;
};
