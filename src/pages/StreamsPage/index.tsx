import { observer } from "mobx-react";
import { useEffect, useState } from "react";

import { useRootContext } from "../../context";
import { Streams } from "./Streams";
import { Tabs } from "./Tabs";
import { IStreams } from "./models";

import s from "./index.module.css";

export const StreamsPage = observer(() => {
  const { api, layoutStore, isInitialized, isAuth, streamsStore } =
    useRootContext();

  const [streams, setStreams] = useState<IStreams | null>(null);

  useEffect(() => {
    if (isInitialized) {
      (async () => {
        setStreams(await api.streams.index());
      })();
    }

    layoutStore.clearBackUrl();
  }, [isInitialized]);

  if (streams == null) return null;

  return (
    <div className={s.root}>
      <div className={s.tabs}>
        <Tabs />
      </div>
      <Streams streams={streams} />
    </div>
  );
});
