import React, { Suspense } from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import { history } from "./managers/history";
import { CardRedeem } from "./modules";
import WinnerBoard from "./modules/winnerBoard";
import RewardBoard from "./modules/rewardDashboard/rewardBoard";
import RewardAnalytics from "./modules/reward";
import RewardRedeem from "./modules/rewardRedeem";
import SelectGiftCard from "./modules/selectGiftCard";

const Routes = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<>...</>}>
        <Switch>
          <Route exact path={"/winner-board"} component={WinnerBoard} />
          <Route exact path={"/reward-analytics"} component={RewardAnalytics} />
          <Route
            exact
            path={"/select-gift-card/:name"}
            component={CardRedeem}
          />
          <Route exact path={"/reward-redeem"} component={RewardRedeem} />
          <Route exact path={"/"} component={RewardBoard} />
          <Route exact path={"/select-gift-card"} component={SelectGiftCard} />
          <Redirect exact from="*" to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
