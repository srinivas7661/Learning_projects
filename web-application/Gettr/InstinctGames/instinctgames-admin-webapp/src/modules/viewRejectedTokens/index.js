import React from "react";
import BaseComponent from "../baseComponent";
import styled from "styled-components";
import ViewRejTokens from "./viewRejTokens";
import AdminModule from "../../services/adminMicroService";
// import UndoDialogue from "./undoDialog";

const ViewButton = styled.button`
  text-align: left;
  font: normal normal medium 14px/17px Barlow;
  letter-spacing: 0px;
  color: #6874e8;
  border: none;
  background: none;
`;

const RemovedList = [
  {
    name: "Shoto Todoroki",
    contract: "asasasasasasa2423144353455",
    date: "12-12-2021",
    reportView: <ViewButton>See comment</ViewButton>,
  },
  {
    name: "Shoto ",
    contract: "asasasasasasa2423144353455",
    date: "12-12-2021",
    reportView: <ViewButton>See comment</ViewButton>,
  },
  {
    name: "Shoto Todoroki",
    contract: "asasasasasasa2423144353455",
    date: "12-12-2021",
    reportView: <ViewButton>See comment</ViewButton>,
  },
  {
    name: "Shoto Todoroki",
    contract: "asasasasasasa2423144353455",
    date: "12-12-2021",
    reportView: <ViewButton>See comment</ViewButton>,
  },
];

class RemovedNFTComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableColumns: ["Name", "Contract", "Date", ""],
      RemovedList: RemovedList,
      list: [],
      rejectedList:[]
    };
  }

  componentDidMount() {
    this.approveRejectToken();
  }
  approveRejectToken = async () => {

    const result = await AdminModule.getRejectedTokens();


    if (result) this.setState({ rejectedList:result.rejectedTokenContent });
  };

  render() {
    return <ViewRejTokens state={this.state} />;
  }
}

export default RemovedNFTComponent;
