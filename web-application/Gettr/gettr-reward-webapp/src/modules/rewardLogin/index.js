import React, { useState } from "react";
import UpcomingRewardModal from "../modals/rewardModal";

const RewardLogin = () => {
  const [view, setView] = useState(false);
  return (
    <div>
      <h1>Reward Modal </h1>
      <button onClick={() => setView(true)}>Click Here</button>
      {view && <UpcomingRewardModal setView={setView} />}
    </div>
  );
};

export default RewardLogin;
