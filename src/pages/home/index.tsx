import { MetaProvider, Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

export const HomePage = () => {
  const navigate = useNavigate();

  onMount(() => {
    navigate("/messages");
  });

  return (
    <MetaProvider>
      <Title>The Flux</Title>
      <div>HOME PAGE</div>
    </MetaProvider>
  );
};
