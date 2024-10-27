import { MetaProvider } from "@solidjs/meta";
import { type ParentComponent, Show } from "solid-js";

import { APIProvider } from "../contexts/api";
import { AuthProvider } from "../contexts/auth";
import { useRoot } from "../contexts/root";
import { MessagesProvider } from "../contexts/messages";
import { StreamsProvider } from "../contexts/streams";
import { Header } from "./header";

export const Layout: ParentComponent = (props) => {
  const { rootStore: store } = useRoot();

  return (
    <Show when={store.isInit}>
      <APIProvider>
        <AuthProvider>
          <StreamsProvider>
            <MessagesProvider>
              <MetaProvider>
                <Header />

                {props.children}
              </MetaProvider>
            </MessagesProvider>
          </StreamsProvider>
        </AuthProvider>
      </APIProvider>
    </Show>
  );
};
