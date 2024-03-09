import { createContext, useContext } from "react";
import type { RootStore } from "./stores/RootStore";

export const RootContext = createContext<RootStore>(
  null as unknown as RootStore,
);

export const useRootContext = (): RootStore => {
  return useContext(RootContext);
};
