import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRootContext } from "../../context";
import { MessageForm } from "../../modules/MessageForm";

export const MessagePage = observer(() => {
  const rootStore = useRootContext();
  const navigate = useNavigate();
  // const { messageStore } = rootStore;

  useEffect(() => {
    if (!rootStore.isAuth) {
      navigate("/", { replace: true });
    }

    // messageStore.setSelf();

    // return () => {
    //   messageStore.setSelf(false);
    // };
  }, [rootStore.isAuth]);

  return <></>;
});
