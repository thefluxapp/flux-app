import { Route, Router } from "@solidjs/router";
import { render } from "solid-js/web";

import "./index.css";

import { RootProvider } from "./contexts/root";
import { Layout } from "./layout";
import { AccountPage } from "./pages/account";
import { AuthPage } from "./pages/auth";
import { HomePage } from "./pages/home";
import { MessagesNewPage } from "./pages/messages/new";
import { StreamsIndexPage } from "./pages/streams/index";
import { StreamsShowPage } from "./pages/streams/show";
import { StreamsWrapper } from "./pages/streams/wrapper";

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
        <Route path="/streams" component={StreamsWrapper}>
          <Route path={["/", "/my"]} component={StreamsIndexPage} />
          <Route path="/new" component={MessagesNewPage} />
        </Route>

        <Route path="/streams/:id" component={StreamsShowPage} />
      </Router>
    </RootProvider>
  ),
  root,
);
