import { useState } from "react";
import React from "react";
import styled from "styled-components";
import "./style.css"


const Select = styled.select`
display: block;
background: white;
height: 33px;
padding-left: 12px;
border-radius: 6px;
border: 1px solid #d3d3d3;
text-align: left;
font: normal normal normal 15px/20px Nunito;
letter-spacing: 0px;
color: #acacac;
opacity: 1;
`;

const App = () => {
  const [selected, setSelected] = useState(null);

  const changeSelectOptionHandler = (event) => {
    event.changeFontSize = 12;
    setSelected(event.target.value);
  };

  const Trigger = ["New order", "Lorem"];
  const Manual = [""];


  return (
    <>
      <Select
        className={selected ? "font-highlight" : ""}

        id="select"
        onChange={changeSelectOptionHandler}
        value={selected}
        style={{
          background: "url(images/drop.svg) no-repeat right #ffffff",
          WebkitAppearance: "none",
          backgroundPositionX: "365px",
        }}
      >
        <option value="" hidden >
          -- Tap to select -- &emsp;

        </option>

        <option value="trigger" className="text-align-left">Trigger</option>
        <option value="manual" className="text-align-left">Manual</option>
      </Select>
      {selected === 'trigger' ? (
        <>
          <p className="surveylabel">Select Trigger</p>
          <Select
            style={{
              background: "url(images/drop.svg) no-repeat right #ffffff",
              WebkitAppearance: "none",
              backgroundPositionX: "365px",
            }}
          >
            {" "}
            <option value="" hidden>
              -- Click to select -- &emsp;
            </option>
            {
              Trigger.map((el) => <option key={el}>{el}</option>)
            }
          </Select>
        </>
      ) : null}
    </>
  );
};
export default App;
