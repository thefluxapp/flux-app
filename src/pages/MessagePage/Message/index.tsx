import { observer } from "mobx-react";

import { User } from "./User";
import { StreamMessageStore } from "../../../stores/StreamStore/StreamMessageStore";

import s from "./index.module.css";

export const Message = observer(
  ({ streamMessageStore }: { streamMessageStore: StreamMessageStore }) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      streamMessageStore.updateText(e.target.value);
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
      streamMessageStore.updateMessage();

      e.preventDefault();
    };

    return (
      <div className={s.root}>
        {streamMessageStore.isForm && (
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.image}>
              <img
                src={streamMessageStore.user.image}
                alt={streamMessageStore.user.name}
              />
            </div>

            <div className={s.dt}>
              <div className={s.input}>
                <div className={s.textarea}>
                  <textarea
                    name="text"
                    value={streamMessageStore.text}
                    onChange={handleChange}
                    placeholder="Message.."
                  />
                </div>

                <div className={s.submit}>
                  <button type="submit" disabled={streamMessageStore.isEmpty}>
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {!streamMessageStore.isForm && (
          <div className={s.message}>
            <div className={s.image}>
              <img
                src={streamMessageStore.user.image}
                alt={streamMessageStore.user.name}
              />
            </div>

            <div className={s.dt}>
              <div className={s.user}>
                <User user={streamMessageStore.user} />
              </div>

              <div className={s.text}>{streamMessageStore.text}</div>

              {streamMessageStore.isProcessing && <div>processing..</div>}
            </div>
          </div>
        )}
      </div>
    );
  },
);
