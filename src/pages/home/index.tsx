import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

export const HomePage = () => {
  const navigate = useNavigate();

  onMount(() => {
    navigate("/messages");
  });

  return null;
};
