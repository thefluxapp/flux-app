import { MetaProvider } from "@solidjs/meta";
import { type ParentComponent, Show } from "solid-js";

import { Header } from "./header";
import { useRoot } from "../contexts/root";
import { APIProvider } from "../contexts/api";
import { AuthProvider } from "../contexts/auth";
import { StreamsProvider } from "../contexts/streams";
import { StreamProvider } from "../contexts/stream";

export const Layout: ParentComponent = (props) => {
  const { rootStore: store } = useRoot();

  return (
    <Show when={store.isInit}>
      <APIProvider>
        <AuthProvider>
          <StreamsProvider>
            <StreamProvider>
              <MetaProvider>
                <Header />

                {props.children}
              </MetaProvider>
            </StreamProvider>
          </StreamsProvider>
        </AuthProvider>
      </APIProvider>
    </Show>
  );
};
