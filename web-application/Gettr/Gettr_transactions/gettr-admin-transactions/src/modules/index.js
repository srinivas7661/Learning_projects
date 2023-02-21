import { lazy } from "react";
import { withRouter } from "react-router";
export const Login = withRouter(lazy(() => import("./login")));
export const TransactionDetails = withRouter(lazy(() => import("./transactionDetails")));
export const GettrTransactions = withRouter(lazy(() => import("./gettrTransactions")));
export const Main = withRouter(lazy(() => import("./main")));
