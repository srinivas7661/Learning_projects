import React, { useState } from "react";
import "../../assets/styles/custom.css";
const MinMax = (props) => {
  const [minVal, setMinVal] = useState("");
  const [maxVal, setMaxVal] = useState("");
  const handleChange = (e, type) => {
    if (type === "min") {
      setMinVal(e.target.value);
    } else {
      setMaxVal(e.target.value);
    }
  };
  const isValid = Number(minVal) < Number(maxVal);
  console.log("min", minVal.length);
  console.log("max", maxVal.length);
  return (
    <div>
      <div className="fltr">
        <input
          onChange={(e) => handleChange(e, "min")}
          type="number"
          placeholder="Min"
          value={minVal}
          className="fltr_min"
        />
        <input
          onChange={(e) => handleChange(e, "max")}
          type="number"
          placeholder="Max"
          value={maxVal}
          className="fltr_max"
        />
      </div>
      <div className="applyBtn">
        <button type="button" disabled={!isValid}>
          Apply
        </button>
      </div>
      {maxVal.length && !isValid ? (
        <span style={{ color: "white", display: "block" }}>
          please make sure that max should be greater than min
        </span>
      ) : null}
    </div>
  );
};
export default MinMax;
