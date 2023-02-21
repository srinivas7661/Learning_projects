import React, { Component } from "react";
import { addToken } from "../../services";
import Utils, { dispatchAction } from "../../utility";
import CommonToasts from "../../common/components/commonToasts";
import { connect } from "react-redux";
import { eventConstants, validationsMessages } from "../../constants";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import TokenRequest from "./tokenRequest";

class HomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenName: "",
      tokenSymbol: "",
      tokenAddress: "",
      email: "",
      phone: "",
      tokenAbi: "",
      comment: "",
    };
  }
  componentDidMount() {}
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddToken = async () => {
    try {
      let selectedData = {
        tokenName: this.state?.tokenName,
        tokenAddress: this.state?.tokenAddress,
        tokenAbi: JSON.parse(this.state?.tokenAbi) || "",
        addedBy: this.props.user?.walletConnect?._id || "",
        status: validationsMessages.STATUS_REQUIRED,
        tokenSymbol: this.state?.tokenSymbol,
        email: this.state?.email,
        phone: this.state?.phone,
        comment: this.state?.comment,
      };
      this.props.dispatchAction(eventConstants.SHOW_LOADER);
      const result = await addToken(selectedData); //parse the code
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
      if (result.responseData !== validationsMessages.TOKEN_ALREADY_EXISTS) {
        CommonToasts.successToast(validationsMessages.REQUEST_SUCCESFULL);
        this.setState({
          tokenName: "",
          tokenSymbol: "",
          tokenAddress: "",
          email: "",
          phone: "",
          tokenAbi: "",
          comment: "",
        });
      } else {
        CommonToasts.errorToast(validationsMessages.TOKEN_ALREADY_EXISTS);
      }
    } catch (e) {
      return;
    }
  };

  validateFields = () => {
    if (
      this.state.tokenName?.length !== 0 &&
      this.state.tokenSymbol !== "" &&
      this.state.tokenAddress?.length !==0 &&
      this.state.email?.length !== 0 &&
      this.state.tokenAbi?.length !== 0
    ) {
      if(this.state.tokenAddress?.slice(0,2)== "0x" && this.state.tokenAddress?.length>40){
      Utils.validateEmail(this.state.email) === true //remove ===
        ? this.handleAddToken()
        : CommonToasts.errorToast(validationsMessages.EMAIL_VALIDATION);
      }
      else{
        CommonToasts.errorToast(validationsMessages.CONTRACT_ADDRESS_ERROR);
      }
    } 
    else {
      CommonToasts.errorToast(validationsMessages.FORM_FIELD_ERROR);
    }
  };

  handleSubmit = () => {
    if (
      this.props.user?.walletConnect?._id?.length !== undefined &&
      this.props.user?.walletConnect?._id?.length !== 0
    ) {
      this.validateFields();
    } else {
      CommonToasts.errorToast(validationsMessages.WALLET_CONNECT);
    }
  };

  render() {
    return (
      <>
        <HeaderComponent />
        <TokenRequest
          state={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <FooterComponent />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(HomePageComponent);
