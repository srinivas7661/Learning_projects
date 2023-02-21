import React from "react";
import BaseComponent from "../baseComponent";
import Wallet from "./walletConnect";
import Dashboard from "../dashboard";

class CreateCollectionNew extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Wallet />
      </>
    );
  }
}
export default CreateCollectionNew;
