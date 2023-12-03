import { useEffect, useState } from "react";
import { api } from "../../api";

import s from "./index.module.css";
import { IStreams } from "./models";
import { Streams } from "./Streams";

export function IndexPage() {
  const [streams, setStreams] = useState<IStreams | null>(null);

  useEffect(() => {
    (async () => {
      setStreams(await api.streams.index());
    })();
  }, []);

  if (streams == null) return null;

  return (
    <div className={s.root}>
      <Streams streams={streams} />
    </div>
  );
}
