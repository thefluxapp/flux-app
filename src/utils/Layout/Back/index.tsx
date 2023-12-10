import { observer } from "mobx-react";

import s from "./index.module.css";

import BackImg from "./assets/back.svg?react";
import { useRootContext } from "../../../context";
import { Link } from "react-router-dom";

export const Back = observer(() => {
  const { layoutStore } = useRootContext();

  // TODO: make animation
  return (
    <div className={s.root}>
      {layoutStore.backUrl !== null && (
        <Link className={s.link} to={layoutStore.backUrl}>
          <BackImg className={s.img} />
        </Link>
      )}
    </div>
  );
});
