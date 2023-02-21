import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./routes";
import store from "./store.js";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "./assets/styles/custom.css";
import {MoralisProvider} from "react-moralis";

function WebApp() {
    return (
        <BrowserRouter>
            <MoralisProvider serverUrl={`${process.env.REACT_APP_MORALIS_URL}`} appId={`${process.env.REACT_APP_MORALIS_APP_ID}`}>
                <Provider store={store}>
                    <Routes component={Routes}/>
                </Provider>
            </MoralisProvider>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WebApp/>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
