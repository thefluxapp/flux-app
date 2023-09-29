import { useEffect } from "react";
import { MessageForm } from "../../modules/MessageForm";
import { useRootContext } from "../../context";
import { useNavigate } from "react-router-dom";

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
