/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw "!!!";
}

function App() {
  return <>App</>;
}

render(() => <App />, root);
