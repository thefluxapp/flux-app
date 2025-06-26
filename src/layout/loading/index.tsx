import s from "./index.module.css";

import LoadingImg from "./loader.svg";

export const Loading = () => {
  return (
    <div class={s.root}>
      <LoadingImg />
    </div>
  );
};
