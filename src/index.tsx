import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import "./index.css";

import { RootProvider } from "./contexts/root";
import { Layout } from "./layout";
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
      <Router root={Layout}>
        <Route path="/" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/notify" component={NotifyPage} />
        <Route path="/messages" component={MessagesWrapper}>
          <Route path={["/", "/my"]} component={MessagesIndexPage} />
          <Route path="/new" component={MessagesNewPage} />
        </Route>

        <Route path="/messages/:id" component={MessagesShowPage} />
      </Router>
    </RootProvider>
  ),
  root
);
