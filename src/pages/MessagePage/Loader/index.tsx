import { observer } from "mobx-react";

import { StreamStore } from "../../../stores/StreamStore";

import s from "./index.module.css";

export const Loader = observer(
  ({ streamStore }: { streamStore: StreamStore }) => {
    const handleClick = async () => {
      if (streamStore !== null) {
        streamStore.fetch(streamStore.messageList[0].id);
      }
    };

    return (
      <div className={s.root}>
        <button
          onClick={handleClick}
          className={s.button}
          type="button"
          disabled={streamStore.isFetching || streamStore.isDepleted}
        >
          Load prev
        </button>
      </div>
    );
  },
);
