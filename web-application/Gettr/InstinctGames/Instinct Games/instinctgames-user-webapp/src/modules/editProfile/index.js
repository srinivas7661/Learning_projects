import React, { Component } from "react";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";
import EditProfile from "./editProfile";
import { getUserData } from "../../services/userMicroservice";
import Utils, { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { eventConstants } from "../../constants";
import { validationsMessages } from "../../constants";
import CommonToasts from "../../common/components/commonToasts";
import { history } from "../../managers/history";
class EditProfileComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          profileImage: "",
          firstName: "",
          bio: "",
          portFolio: "",
        
        };
      }
      componentDidMount() {
        if(!this.props?.user?.walletConnect?.userId)
          history.push("/wallet-connect")
        this.getUsersData();
      }
    
    
      getUsersData = async () => {
        if (!this.props.user.userDetails?.userId) return;
        this.props.dispatchAction(eventConstants.SHOW_LOADER);
        const [error, result] = await Utils.parseResponse(
          getUserData(this.props?.user?.userDetails?.userId)
        );
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        if (error) {
          CommonToasts.errorToast(
            error?.message || validationsMessages.UNABLE_TO_FETCH_USER
          );
          return;
        }
        this.props.dispatchAction(eventConstants.SIGN_IN_SUCCESS, result);
      };
  render() {
    return (
      <>
        <HeaderComponent />
        <EditProfile
        />
        <FooterComponent />
      </>
    );
  }
}
const mapStateToProps = (state) => {
    return { user: state.wallet };
  };
export default  connect(mapStateToProps, { dispatchAction })(EditProfileComponent) ;
