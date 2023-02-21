import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ResultPopup from "../../components/popUps/resultPopup";
import { useNavigate } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const MainDiv = styled.div`
  width: 500px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 100px;
  div {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
`;
const RockButton = styled.button`
  background-color: red;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  font-weight: 900;
  opacity: ${(props) => (props.active[1] === "r" ? "1" : "0.3")};
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
`;
const SicissorButton = styled.button`
  background-color: blue;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  font-weight: 900;
  opacity: ${(props) => (props.active[1] === "s" ? "1" : "0.3")};
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
`;
const PaperButton = styled.button`
  background-color: green;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  font-weight: 900;
  opacity: ${(props) => (props.active[1] === "p" ? "1" : "0.3")};
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
  }
`;
const Done = styled.button`
  background-color: gold;
  width: 200px;
  height: 50px;
  border: none;
  border-radius: 2px;
  font-weight: 500;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  border-radius: 20px;
`;

function RockPaper() {
  const Navigate = useNavigate();
  const win = ["ps", "sr", "rp"];
  const draw = ["pp", "ss", "rr"];

  let randomSelect = ["s", "p", "r"];
  const [select, setSelect] = useState("");
  const [modal, setModal] = useState(false);
  const [randomPick, setRandomPick] = useState("");
  const [winText, setWinText] = useState("");
  const [color, setColor] = useState("");
  const WinsCount = useRef(0);

  let selectRandom = () => {
    setRandomPick(
      randomSelect[Math.ceil(Math.random() * randomSelect.length - 1)]
    );
  };

  const decideWinner = () => {
    if (select.length > 1) {
      if (win.includes(select)) {
        setWinText("You Have Won");
        setColor("green");
        WinsCount.current += 1;
      } else if (draw.includes(select)) {
        setWinText("Draw Match");
        setColor("yellow");
        WinsCount.current = WinsCount.current;
      } else {
        setWinText("You Lose");
        setColor("red");
        WinsCount.current *= 0;
      }
    }
  };

  useEffect(() => {
    selectRandom();
  }, []);
  return (
    <>
      <Container>
        <button onClick={() => Navigate(`/`)}>Back</button>
        <h1>Total Number of Wins:{WinsCount.current}</h1>
        <MainDiv>
          <div>
            <RockButton
              onClick={() => {
                setSelect(randomPick + "r");
              }}
              active={select}
            >
              <img src="/images/stone.png" />
            </RockButton>
            <SicissorButton
              onClick={() => {
                setSelect(randomPick + "s");
              }}
              active={select}
            >
              <img src="/images/scissors.png" />
            </SicissorButton>
          </div>
          <PaperButton
            onClick={() => {
              setSelect(randomPick + "p");
            }}
            active={select}
          >
            <img src="/images/paper.png" />
          </PaperButton>
        </MainDiv>
        <Done
          onClick={() => {
            decideWinner();
            setModal(true);
          }}
        >
          play
        </Done>
      </Container>
      {modal && (
        <ResultPopup winText={winText} setModal={setModal} color={color} />
      )}
    </>
  );
}

export default RockPaper;
