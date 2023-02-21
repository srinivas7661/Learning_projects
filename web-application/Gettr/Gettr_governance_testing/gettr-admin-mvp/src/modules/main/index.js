import React, { useState, useEffect } from "react";
import { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { OktaService, ProposalService } from "../../services";
import utility from "../../utility";
import store from "../../store";
import { userConstants } from "../../constants";
import LoginAuth from "../loginAuth";
import { history } from "../../managers/history";
import LoadingScreen from "../../common/popupScreens/loadingScreen";

function Main(props) {
  const [loginError, setLoginError] = useState(false);
  const [loader, setLoader] = useState(false);
  function generateUrl(url, params) {
    let i = 0,
      key;
    for (key in params) {
      if (i === 0) {
        url += "?";
      } else {
        url += "&";
      }
      url += key;
      url += "=";
      url += params[key];
      i++;
    }
    return url;
  }
  const sessionDetails = JSON.parse(
    sessionStorage.getItem("okta-transaction-storage")
  );
  let url = generateUrl(`${sessionDetails?.issuer}/v1/authorize`, {
    client_id: sessionDetails?.clientId,
    response_type: "token",
    scope: "openid%20profile%20email",
    redirect_uri: encodeURIComponent(sessionDetails?.redirectUri),
    state: sessionDetails?.state,
    nonce: sessionDetails?.nonce,
  });

  useEffect(() => {
    if (!sessionStorage.getItem("url")) {
      sessionStorage.setItem("url", window.location.href);
    }
    if (sessionDetails && !sessionStorage.getItem("accessToken")) {
      window.location.href = url;
      let accessToken = window.location.href
        .split("access_token=")[1]
        .split("&token")[0];
      sessionStorage.setItem("accessToken", accessToken);
      window.location.replace(sessionStorage.getItem("url"));
    }

    if (
      sessionStorage.getItem("url") &&
      sessionStorage.getItem("accessToken")
    ) {
      getUserInfo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserInfo = async () => {
    let [error, response] = await utility.parseResponse(
      OktaService.getUserDetails()
    );
    if (error) {
      return error;
    }
    setLoader(true);
    await getUserId(response.email);
  };

  const getUserId = async (userEmail) => {
    let userResponse = await OktaService.getUserId(userEmail);
    if (userResponse !== undefined) {
      props.dispatchAction(userConstants.USER_DETAILS, userResponse);
      await getUserGroups(userResponse?.id);
      await LoginDetails(
        userResponse.profile.email,
        userResponse.profile.firstName,
        userResponse.profile.lastName
      );
    }
  };

  const getUserGroups = async (id) => {
    let response = await OktaService.getGroups(id);
    if (response) {
      response.forEach((element) => {
        if (
          String(element?.profile?.name).includes(
            userConstants.SUPER_ADMIN.name
          )
        ) {
          props.dispatchAction(
            userConstants.USER_ROLE,
            userConstants.SUPER_ADMIN.value
          );
        }

        if (String(element?.profile?.name).includes(userConstants.ADMIN.name)) {
          props.dispatchAction(
            userConstants.USER_ROLE,
            userConstants.ADMIN.value
          );
        }
      });
    }
  };

  const LoginDetails = async (email, firstName, lastName) => {
    let requestData = {
      email: email,
      role: sessionStorage.getItem(userConstants.USER_ROLE),
    };
    let [error, response] = await utility.parseResponse(
      ProposalService.getAdminInfo(requestData)
    );
    if (error) {
      return;
    }
    if (response?.isApproved === true && response?.status === "ACTIVE") {
      history.push({
        pathname: "/dashboard/overview",
        state: {
          email: email,
          firstName: firstName,
          lastName: lastName,
        },
      });
    }
    if (response?.isApproved === true && response?.status === "INACTIVE") {
      history.push({
        pathname: "/passcode",
        state: {
          email: email,
          firstName: firstName,
          lastName: lastName,
        },
      });
    }
    if (
      (response?.isApproved === false && response?.status === "INACTIVE") ||
      response === undefined
    ) {
      setLoginError(true);
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <LoadingScreen />}
      {loginError && <LoginAuth />}
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { dispatchAction })(Main);
