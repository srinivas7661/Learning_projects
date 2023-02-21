import React, { useState, useEffect } from "react";
import RewardAnalytics from "./rewardAnalytics";
import { RewardsService } from "../../../services";
import utility from "../../../utility";
import Utils from "../../../utility/index";
import { TransactionService } from "../../../services";

function Analytics() {
  const [rewardAnalyticsData, setRewardAnalyticsData] = useState([]);

  const [rewardsRange, setRewardsRange] = useState("D1");
  const [popularActivityData, setPopularActivityData] = useState();

  async function rewardAnalytics(startTime, endTime) {
    let [error, response] = await Utils.parseResponse(
      TransactionService.getRewardAnalytics({
        startTime,
        endTime,
      })
    );
    if (error || !response || !response.data) {
      setRewardAnalyticsData();
      return;
    }
    setRewardAnalyticsData(response.data);
  }

  const getPopularActivities = async (startTime, endTime) => {
    const [error, response] = await utility.parseResponse(
      RewardsService.getPopularActivities({
        startTime,
        endTime,
      })
    );
    if (error || !response || !response.data) {
      setPopularActivityData([]);
      return;
    }
    setPopularActivityData(response.data);
  };

  useEffect(() => {
    const { startTime, endTime } = utility.getTimeStamp(rewardsRange);
    getPopularActivities(startTime, endTime);
    rewardAnalytics(startTime, endTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewardsRange]);

  const propsData = {
    rewardsRange,
    setRewardsRange,
    rewardAnalyticsData,
    activityList: popularActivityData,
  };
  return <RewardAnalytics propsData={propsData} />;
}

export default Analytics;
