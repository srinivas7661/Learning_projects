import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import store from "./store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "./assets/styles/custom.css";
import "./index.css";
import { Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { useHistory } from "react-router";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CALLBACK_PATH = process.env.REACT_APP_CALLBACK_PATH;
const ISSUER = process.env.REACT_APP_ISSUER;
const HOST = process.env.REACT_APP_HOST;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const SCOPES = process.env.REACT_APP_SCOPES;

if (!SCOPES || !CLIENT_ID || !CALLBACK_PATH || !ISSUER || !HOST) {
  console.log(process.env.REACT_APP_CLIENT_ID);
  throw new Error("All environmental variables must be set");
}

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scopes: SCOPES.split(/\s+/),
};

const oktaAuth = new OktaAuth(config);

function WebApp() {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  return (
    <BrowserRouter>
      <Security restoreOriginalUri={restoreOriginalUri} oktaAuth={oktaAuth}>
        <Provider store={store}>
          <Routes component={Routes} />
        </Provider>
      </Security>
    </BrowserRouter>
  );
}

ReactDOM.render(<WebApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
