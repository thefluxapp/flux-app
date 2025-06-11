import { MetaProvider } from "@solidjs/meta";
import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import "./index.css";
import "./theme.css";

import { APIProvider } from "./contexts/api";
import { AuthProvider } from "./contexts/auth";
import { I18nProvider } from "./contexts/i18n";
import { MessagesProvider } from "./contexts/messages";
import { RootProvider } from "./contexts/root";
import { StreamsProvider } from "./contexts/streams";
import { SyncProvider } from "./contexts/sync";
import { WorkerProvider } from "./contexts/worker";
import { Layout } from "./layout";
import { AboutPage } from "./pages/about";
import { AccountPage } from "./pages/account";
import { AuthPage } from "./pages/auth";
import { HomePage } from "./pages/home";
import { MessagesIndexPage } from "./pages/messages/index";
import { MessagesNewPage } from "./pages/messages/new";
import { MessagesShowPage } from "./pages/messages/show";
import { MessagesWrapper } from "./pages/messages/wrapper";
import { NotifyPage } from "./pages/notify";

const root = document.getElementById("root");

if (!root) {
  throw "!!!";
}

render(
  () => (
    <RootProvider>
      <I18nProvider>
        <APIProvider>
          <AuthProvider>
            <WorkerProvider>
              <StreamsProvider>
                <MessagesProvider>
                  <SyncProvider>
                    <MetaProvider>
                      <Router root={Layout}>
                        <Route path="/" component={HomePage} />
                        <Route path="/auth" component={AuthPage} />
                        <Route path="/account" component={AccountPage} />
                        <Route path="/notify" component={NotifyPage} />
                        <Route path="/messages" component={MessagesWrapper}>
                          <Route
                            path={["/", "/my"]}
                            component={MessagesIndexPage}
                          />
                          <Route path="/new" component={MessagesNewPage} />
                        </Route>

                        <Route
                          path="/messages/:id"
                          component={MessagesShowPage}
                        />

                        <Route path="/about" component={AboutPage} />
                      </Router>
                    </MetaProvider>
                  </SyncProvider>
                </MessagesProvider>
              </StreamsProvider>
            </WorkerProvider>
          </AuthProvider>
        </APIProvider>
      </I18nProvider>
    </RootProvider>
  ),
  root,
);
