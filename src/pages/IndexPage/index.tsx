import { Link } from "react-router-dom";
import { api } from "../../api";
import { useEffect, useState } from "react";

import s from "./index.module.css";
import { IStreams } from "./models";

export function IndexPage() {
  const [streams, setStreams] = useState<IStreams | null>(null);

  useEffect(() => {
    (async () => {
      setStreams(await api.streams.index());
    })();
  }, []);

  if (streams == null) return;

  return (
    <div className={s.root}>
      {streams != null && (
        <div className={s.streams}>
          {streams.map((stream) => (
            <div key={stream.id} className={s.stream}>
              <Link to={`/streams/${stream.id}`} className={s.link}>
                <div className={s.label}>{stream.label}</div>
                <div>
                  <div className={s.title}>
                    <div>{stream.title}</div>
                  </div>
                  <div className={s.text}>
                    <div>{stream.text}</div>
                  </div>
                </div>
                {/* {stream.user && <div>{stream.user.name}</div>} */}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
