import { observer } from "mobx-react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useRootContext } from "../../context";
import { Message } from "./Message";
import { Loader } from "./Loader";

import s from "./index.module.css";
import { StreamMessageStore } from "../../stores/StreamStore/StreamMessageStore";
import { StreamStore } from "../../stores/StreamStore";

export const MessagePage = observer(() => {
  const rootStore = useRootContext();
  const { messageId } = useParams();
  const { streamStore } = rootStore;

  useEffect(() => {
    (async () => {
      if (messageId !== undefined) {
        rootStore.initializeStreamStore(messageId);
      }
    })();

    return () => {
      rootStore.clearStreamStore();
    };
  }, [messageId]);

  if (streamStore === null) return null;

  return (
    <div className={s.root}>
      {streamStore.isInitialized && <div>LOADING</div>}

      {!streamStore.isInitialized && (
        <div>
          <Loader streamStore={streamStore} />

          <div className={s.list}>
            {streamStore.messageList.map((streamMessageStore) => (
              <ListItem
                key={streamMessageStore.id}
                streamStore={streamStore}
                streamMessageStore={streamMessageStore}
              />
            ))}

            {streamStore.message !== null && (
              <Message streamMessageStore={streamStore.message} />
            )}
          </div>
        </div>
      )}
    </div>
  );
});

// TODO: Move to standalone compomnent
const ListItem = ({
  streamMessageStore,
  streamStore,
}: { streamMessageStore: StreamMessageStore; streamStore: StreamStore }) => {
  return (
    <>
      {streamMessageStore.id === streamStore.messageId && (
        <Message
          key={streamMessageStore.id}
          streamMessageStore={streamMessageStore}
        />
      )}

      {streamMessageStore.id !== streamStore.messageId && (
        <Link
          className={s.link}
          key={streamMessageStore.id}
          to={`/messages/${streamMessageStore.id}`}
        >
          <Message streamMessageStore={streamMessageStore} />
        </Link>
      )}
    </>
  );
};
