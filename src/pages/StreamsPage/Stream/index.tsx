import { Link } from "react-router-dom";

import type { IStream } from "../models";

import s from "./index.module.css";

export function Stream({ stream }: { stream: IStream }) {
  return (
    <div className={s.root}>
      <Link to={`/messages/${stream.message_id}`} className={s.link}>
        <div className={s.label}>{stream.label}</div>
        <div className={s.dt}>
          <div className={s.title}>{stream.title}</div>
          <div>{stream.text}</div>
        </div>
      </Link>
    </div>
  );
}
