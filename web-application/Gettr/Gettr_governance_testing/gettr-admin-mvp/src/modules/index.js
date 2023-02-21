import { lazy } from "react";
import { withRouter } from "react-router";
export const Login = withRouter(lazy(() => import("./login")));
export const ProposalDetails = withRouter(
  lazy(() => import("./proposalDetails"))
);
export const ProposalList = withRouter(lazy(() => import("./proposalList")));
export const ManageTeam = withRouter(lazy(() => import("./manageTeam")));
export const Main = withRouter(lazy(() => import("./main")));
export const Overview = withRouter(lazy(() => import("./overview")));
export const EnterOtp = withRouter(lazy(() => import("./enterOtp")));
export const GettrPasscode = withRouter(lazy(() => import("./gettrPasscode")));
