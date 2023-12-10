import { createContext, useContext } from "react";
import { RootStore } from "./stores/RootStore";

export const RootContext = createContext<RootStore>(
  null as unknown as RootStore,
);

export const useRootContext = (): RootStore => {
  return useContext(RootContext);
};
