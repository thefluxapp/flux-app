import { observer } from "mobx-react";

import s from "./index.module.css";

export const MessageForm = observer(() => {
  // const rootStore = useRootContext();
  // // const { messageStore } = rootStore;

  // const [form, setForm] = useState<IForm>({ text: "" });

  // const handleSubmit = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();

  //   await api.messages.create({
  //     ...form,
  //     stream_id: messageStore.stream?.id,
  //     message_id: messageStore.message?.id,
  //   });
  //   if (messageStore.onCreate) messageStore.onCreate();
  //   setForm({ text: "" });
  // };

  // if (
  //   (messageStore.stream == null &&
  //     messageStore.message == null &&
  //     !messageStore.self) ||
  //   !rootStore.isAuth
  // )
  //   return null;

  return (
    <div className={s.root}>
      {/* {messageStore.message && (
        <div className={s.reply}>{messageStore.message.text}</div>
      )}

      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.message}>
          <textarea
            tabIndex={-1}
            className={s.text}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
          />
        </div>

        <div className={s.action}>
          <button type="submit" className={s.button}>
            <span className={s.wrapper}>
              <SendImg className={s.send} />
            </span>
          </button>
        </div>
      </form> */}
    </div>
  );
});
