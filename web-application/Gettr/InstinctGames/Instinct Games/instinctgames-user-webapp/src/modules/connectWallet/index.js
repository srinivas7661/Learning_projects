import React, { Component } from "react";
import WalletConnect from "./connectWallet";
import { faqData } from "../../constants/index";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";

class ConnectWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <HeaderComponent />
        <WalletConnect />
        <FooterComponent />
      </>
    );
  }
}

export default ConnectWallet;
