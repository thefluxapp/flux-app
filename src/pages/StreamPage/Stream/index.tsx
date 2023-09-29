// import { IStream } from "../../../api/streams";

import { Link } from "react-router-dom";
import { IStream } from "../entities";

import s from "./index.module.css";

export const Stream = ({ stream }: { stream: IStream }) => {
  return (
    <div className={s.root}>
      <Link to={`/streams/${stream.id}`}>{stream.text}</Link>
    </div>
  );
};
