import React, { Suspense } from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import { history } from "./managers/history";
import styled from "styled-components";
import {
  Login,
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
          <Route exact path="/dashboard/:menu" component={Main} />
          <Route exact path="/dashboard/:menu/:id" component={Main} />
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
