import React, { Suspense } from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import {
  Dashboard,
  Entries,
  Login,
  ManageTeam,
  Pool,
  RewardActivities,
  Rewards,
  Schedule,
  Transactions,
  TransactionDetails,
  Users,
  UserDetails,
  analytics,
} from "./modules";
import { history } from "./managers/history";
import Header from "./common/components/header";
import Sidebar from "./common/components/sideBar";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
const ParentContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;
const Routes = () => {
  const { pathname } = useLocation();
  return (
    <Router history={history}>
      <Suspense fallback={<>...</>}>
        {pathname !== ("/login" || "*") && <Header />}
        <ParentContainer>
          {pathname !== ("/login" || "*") && <Sidebar />}
          <Switch>
            <Route exact path={"/dashboard"} component={Dashboard} />
            <Route exact path={"/transactions"} component={Transactions} />
            <Route exact path={"/schedule"} component={Schedule} />

            <Route
              exact
              path="/transactions/:id"
              component={TransactionDetails}
            />
            <Route exact path={"/pool"} component={Pool} />
            <Route exact path={"/users"} component={Users} />
            <Route exact path={"/user-details/:id"} component={UserDetails} />
            <Route
              exact
              path={"/reward-program/activities"}
              component={RewardActivities}
            />
            <Route
              exact
              path={"/reward-program/schedule"}
              component={Schedule}
            />
            <Route exact path={"/reward-program/entries"} component={Entries} />
            <Route exact path={"/reward-program/rewards"} component={Rewards} />
            <Route
              exact
              path={"/reward-program/analytics"}
              component={analytics}
            />
            <Route exact path={"/manage-team"} component={ManageTeam} />
            <Route exact path={"/login"} component={Login} />
            <Redirect exact from="*" to="/dashboard" />
          </Switch>
        </ParentContainer>
      </Suspense>
    </Router>
  );
};

export default Routes;
