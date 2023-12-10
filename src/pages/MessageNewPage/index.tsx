import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRootContext } from "../../context";

import s from "./index.module.css";

export const MessageNewPage = observer(() => {
  const rootStore = useRootContext();
  const { messageStore, authStore } = rootStore;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    await messageStore.updateMessage();

    navigate(`/messages/${messageStore.id}`, { replace: true });
    messageStore.clear();
  };

  useEffect(() => {
    if (!rootStore.isAuth) {
      navigate("/", { replace: true });
    }
  }, [rootStore.isAuth]);

  return (
    <div className={s.root}>
      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.image}>
          <img src={authStore.user.image} alt={authStore.user.name} />
        </div>

        <div className={s.dt}>
          <div className={s.title}>
            <input
              name="title"
              className={s.input}
              value={messageStore.title}
              onChange={(e) => messageStore.updateTitle(e.target.value)}
              placeholder="Title.."
            />
          </div>

          <div className={s.text}>
            <textarea
              name="text"
              className={s.input}
              value={messageStore.text}
              onChange={(e) => messageStore.updateText(e.target.value)}
              placeholder="Message.."
            />
          </div>

          <div className={s.submit}>
            <button type="submit" disabled={messageStore.isEmpty}>
              Отправить
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});
