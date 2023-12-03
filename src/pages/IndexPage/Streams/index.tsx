import { Stream } from "../Stream";
import { IStreams } from "../models";

import s from "./index.module.css";

export function Streams({ streams }: { streams: IStreams }) {
  return (
    <div className={s.root}>
      {streams.map((stream) => (
        <div key={stream.id} className={s.stream}>
          <Stream stream={stream} />
        </div>
      ))}
    </div>
  );
}
