import { observer } from "mobx-react";

import { useRootContext } from "../../../context";
import { Stream } from "../Stream";
import { IStreams } from "../models";

import s from "./index.module.css";

export const Streams = observer(({ streams }: { streams: IStreams }) => {
  const { streamsStore } = useRootContext();
  const { isCurrentUser } = streamsStore;

  return (
    <div className={s.root}>
      {streams
        .filter(
          (stream) =>
            !isCurrentUser || (isCurrentUser && stream.is_current_user),
        )
        .map((stream) => (
          <div key={stream.id} className={s.stream}>
            <Stream stream={stream} />
          </div>
        ))}
    </div>
  );
});
