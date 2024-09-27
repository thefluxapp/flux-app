import { MetaProvider, Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
// import { useContext } from "solid-js";

// import { RootContext } from "../../contexts/root";

export const HomePage = () => {
  const navigate = useNavigate()

  onMount(() => {
    navigate("/streams")
  })

  return (
    <MetaProvider>
      <Title>The Flux</Title>
      <div>HOME PAGE</div>
    </MetaProvider>
  );
};
