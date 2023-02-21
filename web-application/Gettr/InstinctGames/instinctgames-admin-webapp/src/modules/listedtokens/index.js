import React from "react";
import BaseComponent from "../baseComponent";
import ListedTokens from "./listedtoken";
import AdminModule from "../../services/adminMicroService";
// import Utils from "../../utility"
// import {GetApproveService} from "../../services/index";

class ListedToken extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { approvedTokens: [] };
  }

  componentDidMount() {
    this.approvedToken();
  }
  approvedToken = async () => {
    const result = await AdminModule.getApproveTokens();
    if (result) this.setState({ approvedTokens: result.approvedTokensContent });
    
  };

  render() {
    return <ListedTokens state={this.state} />;
  }
}

export default ListedToken;