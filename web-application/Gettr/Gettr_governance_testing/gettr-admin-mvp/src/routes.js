import React, { Suspense } from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import { history } from "./managers/history";
import styled from "styled-components";
import {
  Login,
  Overview,
  EnterOtp,
  GettrPasscode,
  Main
} from "./modules";
const ParentContainer = styled.div`
  height: 100%;
`;
const Routes = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<>...</>}>
        <ParentContainer>
          <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/check-user" component={Main} />
          <Route exact path="/enter-otp" component={EnterOtp} />
          <Route exact path="/passcode" component={GettrPasscode} />
          <Route exact path="/dashboard/:menu" component={Overview} />
          <Route exact path="/dashboard/:menu/:id" component={Overview} />
          <Redirect exact from="*" to="/login" />
        </Switch>
        </ParentContainer>
      </Suspense>
    </Router>
  );
};
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Routes);
