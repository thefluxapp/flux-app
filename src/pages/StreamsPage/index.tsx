import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import { Streams } from "./Streams";
import { IStreams } from "./models";

import { useRootContext } from "../../context";
import s from "./index.module.css";

export const StreamsPage = observer(() => {
  const { api, layoutStore } = useRootContext();

  const [streams, setStreams] = useState<IStreams | null>(null);

  useEffect(() => {
    (async () => {
      setStreams(await api.streams.index());
    })();

    layoutStore.clearBackUrl();
  }, []);

  if (streams == null) return null;

  return (
    <div className={s.root}>
      <Streams streams={streams} />
    </div>
  );
});
