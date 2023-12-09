import { observer } from "mobx-react";

import { MessageStore } from "../../../stores/MessageStore";
// import { IStreamsShowMessageStatus } from "../../../api/streams";

import { User } from "./User";
import s from "./index.module.css";

export const Message = observer(
  ({ messageStore }: { messageStore: MessageStore }) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      messageStore.updateText(e.target.value);
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
      messageStore.updateMessage();

      e.preventDefault();
    };

    return (
      <div className={s.root}>
        {messageStore.isForm && (
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.image}>
              <img src={messageStore.user.image} alt={messageStore.user.name} />
            </div>

            <div className={s.dt}>
              {/* <div className={s.user}>
                <User user={messageStore.user} />
              </div> */}

              <div className={s.input}>
                <div className={s.textarea}>
                  <textarea
                    name="text"
                    value={messageStore.text}
                    onChange={handleChange}
                    placeholder="Message.."
                  />
                </div>

                <div className={s.submit}>
                  <button type="submit" disabled={messageStore.isEmpty}>
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {!messageStore.isForm && (
          <div className={s.message}>
            <div className={s.image}>
              <img src={messageStore.user.image} alt={messageStore.user.name} />
            </div>

            <div className={s.dt}>
              <div className={s.user}>
                <User user={messageStore.user} />
              </div>

              <div className={s.text}>{messageStore.text}</div>

              {messageStore.isProcessing && <div>processing..</div>}
            </div>
          </div>
        )}
      </div>
    );
  },
);
