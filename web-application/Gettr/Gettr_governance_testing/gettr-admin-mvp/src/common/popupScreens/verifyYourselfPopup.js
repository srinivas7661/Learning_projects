import React from "react";
import Modal from "../components/modal";
import VerifyYourself from "../components/verifyYourself";

export default function VerifyYourselfPopup({
  mintModal,
  setMintModal,
  addVotePasscode,
  setaddVotePasscode,
  AddVoteToProposal,
  verifyLoader,
}) {
  const handleClose = () => {
    setMintModal((pre) => ({ ...pre, verifyYourself: false }));
    setaddVotePasscode(new Array(6).fill(""));
  };
  const apiCallFunction = (passcode) => {
    AddVoteToProposal(true);
    setaddVotePasscode(new Array(6).fill(""));
  };
  return (
    <Modal
      open={mintModal}
      handleClose={() => {
        setMintModal((pre) => ({ ...pre, verifyYourself: false }));
      }}
      marginTop={"83px"}
    >
      <VerifyYourself
        passcode={addVotePasscode}
        setPasscode={setaddVotePasscode}
        handleClose={handleClose}
        apiCallFunction={(passcode) => apiCallFunction(passcode)}
        buttonText="Confirm Voting"
        verifyLoader={verifyLoader}
      />
    </Modal>
  );
}
