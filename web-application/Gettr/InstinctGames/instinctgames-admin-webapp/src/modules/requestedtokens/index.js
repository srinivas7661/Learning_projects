import React from "react";
import BaseComponent from "../baseComponent";
import RequestedTokens from "./requestedtokens";
import RequestedDetails from "./requesteddetails";
import AdminModule from "../../services/adminMicroService";
import Utils from "../../utility";
class RequestedToken extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "requestedTokens",
      requestTokens: [],
    };
  }

  navigateToTab = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  render() {
    return (
      <>
        {this.state.activeTab === "requestedTokens" && (
          <RequestedTokens navigateToTab={this.navigateToTab} state={this.state} />
        )}
        {this.state.activeTab === "requested-details" && <RequestedDetails />}
      </>
    );
  }
}
export default RequestedToken;
