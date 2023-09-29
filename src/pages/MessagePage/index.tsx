import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRootContext } from "../../context";
import { MessageForm } from "../../modules/MessageForm";

export const MessagePage = () => {
  const rootStore = useRootContext();
  const navigate = useNavigate();
  const { messageStore } = rootStore;

  useEffect(() => {
    if (!rootStore.isAuth) {
      navigate("/", { replace: true });
    }

    // return () => {
    //   messageStore.setSelf(false);
    // };
  }, []);

  return <></>;
};
