import type { CredentialRequestOptionsJSON } from "@github/webauthn-json";
import { get } from "@github/webauthn-json/extended";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

import s from "./index.module.css";

import { useAPI } from "../../../contexts/api";
import { useRoot } from "../../../contexts/root";
import { useAuth } from "../../../contexts/auth";

export const Login = ({
  request,
}: { request: CredentialRequestOptionsJSON }) => {
  const api = useAPI();
  const { update } = useAuth();
  const navigate = useNavigate();
  const { updateToken } = useRoot();

  const handleLogin = async () => {
    const credential = await get(request);

    const data = await api.auth.login({ credential });
    updateToken(data.jwt);
    await update();
    navigate("/messages");
  };

  onMount(async () => {
    await handleLogin();
  });

  return <div class={s.root} />;
};
