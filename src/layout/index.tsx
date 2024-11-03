import { MetaProvider } from "@solidjs/meta";
import { type ParentComponent, Show } from "solid-js";

import { APIProvider } from "../contexts/api";
import { AuthProvider } from "../contexts/auth";
import { useRoot } from "../contexts/root";
import { MessagesProvider } from "../contexts/messages";
import { StreamsProvider } from "../contexts/streams";
import { Header } from "./header";
import { I18nProvider } from "../contexts/i18n";

export const Layout: ParentComponent = (props) => {
  const { rootStore: store } = useRoot();

  return (
    <Show when={store.isInit}>
      <APIProvider>
        <AuthProvider>
          <StreamsProvider>
            <MessagesProvider>
              <MetaProvider>
                <I18nProvider>
                  <Header />

                  {props.children}
                </I18nProvider>
              </MetaProvider>
            </MessagesProvider>
          </StreamsProvider>
        </AuthProvider>
      </APIProvider>
    </Show>
  );
};
