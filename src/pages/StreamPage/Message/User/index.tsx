import { Link } from "react-router-dom";

import s from "./index.module.css";
import { IUser } from "../../models";

export function User({ user }: { user: IUser }) {
  return <div className={s.root}>{user.name}</div>;
}
