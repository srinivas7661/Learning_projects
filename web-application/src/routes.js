import { Routes, Route } from "react-router-dom";
import LogIn from "./modules/LogIn/logIn";
import RockPaper from "./modules/RockPaper/RockPaper";

function RoutesElement() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/rock-paper" element={<RockPaper />} />
    </Routes>
  );
}

export default RoutesElement;
