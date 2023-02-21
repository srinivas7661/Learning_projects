import { lazy } from "react";
import { withRouter } from "react-router";
export const Login = withRouter(lazy(() => import("./login")));
export const Dashboard = withRouter(lazy(() => import("./dashboard")));
export const Transactions = withRouter(lazy(() => import("./transactions")));
export const TransactionDetails = withRouter(
  lazy(() => import("./transactionDetails"))
);
export const Pool = withRouter(lazy(() => import("./pool")));
export const Users = withRouter(lazy(() => import("./users/index")));
export const UserDetails = withRouter(
  lazy(() => import("./users/userDetails"))
);
export const RewardActivities = withRouter(
  lazy(() => import("./rewardPrograms/activities"))
);
export const Schedule = withRouter(
  lazy(() => import("./rewardPrograms/schedules/index"))
);
export const Entries = withRouter(
  lazy(() => import("./rewardPrograms/entries"))
);
export const Rewards = withRouter(
  lazy(() => import("./rewardPrograms/rewards"))
);
export const analytics = withRouter(
  lazy(() => import("./rewardPrograms/analytics/index"))
);
export const ManageTeam = withRouter(lazy(() => import("./manageTeam")));
