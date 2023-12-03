import { IUser } from "../../models";
import s from "./index.module.css";

export function User({ user }: { user: IUser }) {
  return <div className={s.root}>{user.name}</div>;
}
