import type { ParentComponent } from "solid-js";

import { Header } from "./header";

export const Layout: ParentComponent = (props) => {
  return (
    <>
      <Header />

      {props.children}
    </>
  );
};
