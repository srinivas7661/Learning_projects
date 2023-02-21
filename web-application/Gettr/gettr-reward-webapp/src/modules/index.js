import { lazy } from "react";
import { withRouter } from "react-router";

export const RewardRedeem = withRouter(lazy(() => import("./rewardRedeem")));
export const SelectGiftCard = withRouter(
  lazy(() => import("./selectGiftCard"))
);
export const CardRedeem = withRouter(lazy(() => import("./cardRedeem")));
export { default as RewardHome } from "./rewardsHome";
export { default as WinnerBoard } from "./winnerBoard";
