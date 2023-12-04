import { useEffect } from "react";
import { useParams } from "react-router-dom";

import s from "./index.module.css";

import { observer } from "mobx-react";
import { useRootContext } from "../../context";
import { Message } from "./Message";

export const StreamPage = observer(() => {
  const { streamsStore } = useRootContext();
  const { streamStore } = streamsStore;
  const { streamId } = useParams();

  useEffect(() => {
    (async () => {
      await streamsStore.updateStream(streamId);
    })();
  }, [streamId]);

  const handleLoadPrevClick = async () => {
    if (streamStore !== null) {
      streamStore.update(5, streamStore.messageList[0].id);
    }
  };

  if (streamStore === null) return null;

  return (
    <div className={s.root}>
      {streamStore.isLoading && <div>LOADING</div>}

      {!streamStore.isLoading && (
        <div>
          {/* TODO: Make placeholder when reach the end */}
          {streamStore.isLazy && (
            <button
              type="button"
              className={s.prev}
              onClick={handleLoadPrevClick}
            >
              <span className={s.label}>Загрузить старые сообщения</span>
              <span className={s.todo}>
                (Тут должен быть реалтайм суммарайзер, но пока заглушка)
              </span>
            </button>
          )}

          <div className={s.list}>
            {streamStore.messageList.map((messageStore) => (
              <Message key={messageStore.id} messageStore={messageStore} />
            ))}

            {streamStore.message !== null && (
              <Message messageStore={streamStore.message} />
            )}
          </div>
        </div>
      )}
    </div>
  );
});
