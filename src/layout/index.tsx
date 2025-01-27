import { MetaProvider } from "@solidjs/meta";
import { type ParentComponent, Show } from "solid-js";

import { APIProvider } from "../contexts/api";
import { AuthProvider } from "../contexts/auth";
import { I18nProvider } from "../contexts/i18n";
import { MessagesProvider } from "../contexts/messages";
import { useRoot } from "../contexts/root";
import { SSEProvider } from "../contexts/sse";
import { StreamsProvider } from "../contexts/streams";
import { WorkerProvider } from "../contexts/worker";
import { Header } from "./header";

export const Layout: ParentComponent = (props) => {
  const { rootStore: store } = useRoot();

  return (
    <Show when={store.isInit}>
      <APIProvider>
        <AuthProvider>
          <WorkerProvider>
            <StreamsProvider>
              <MessagesProvider>
                <SSEProvider>
                  <MetaProvider>
                    <I18nProvider>
                      <Header />

                      {props.children}
                    </I18nProvider>
                  </MetaProvider>
                </SSEProvider>
              </MessagesProvider>
            </StreamsProvider>
          </WorkerProvider>
        </AuthProvider>
      </APIProvider>
    </Show>
  );
};
