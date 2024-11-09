import { createContext, type ParentComponent, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import {
  translator,
  proxyTranslator,
  type ChainedTranslator,
  flatten,
  resolveTemplate,
} from "@solid-primitives/i18n";

import type { Dict } from "../i18n";
import { dict as en } from "../i18n/en";
import { dict as ru } from "../i18n/ru";

const I18nContext = createContext({
  i18nStore: null as unknown as I18nStore,
  t: null as unknown as ChainedTranslator<Dict>,
});

export enum Locale {
  EN = "en",
  RU = "ru",
}

export const I18nProvider: ParentComponent = (props) => {
  const [i18nStore] = createStore(new I18nStore());

  return (
    <I18nContext.Provider value={{ i18nStore, t: i18nStore.t }}>
      {props.children}
    </I18nContext.Provider>
  );
};

class I18nStore {
  t: ChainedTranslator<Dict>;

  constructor() {
    const locale = ((): Locale => {
      if (navigator.languages.includes(Locale.RU)) {
        return Locale.RU;
      }

      return Locale.EN;
    })();

    const dict = ((): Dict => {
      switch (locale) {
        case Locale.RU:
          return ru;
        default:
          return en;
      }
    })();

    this.t = proxyTranslator(translator(() => flatten(dict), resolveTemplate));
  }
}

export const useI18n = () => useContext(I18nContext);
