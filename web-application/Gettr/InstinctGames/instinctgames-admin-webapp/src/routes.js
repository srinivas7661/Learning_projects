import React from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { connect } from "react-redux";
import { Login, SignUp } from "./modules";
import { history } from "./managers/history";
import { ToastContainer } from "react-toastify";
import BaseComponent from "./modules/baseComponent";
import Dashboard from "./modules/dashboard";
import BlockedUser from "./modules/blockeduser";
import LoaderComponent from "./common/components/loader";
import TokenDetails from "./modules/listedtokens/tokendetails";
import RequestedTokens from "./modules/requestedtokens";
import RequestedDetails from "./modules/requestedtokens/requesteddetails";
import TokenList from "./modules/requestedtokens/requestedtokens";
import ReviewNftPage from "./modules/manageReportNft/reviewNftPage";
import WalletConnect from "./modules/walletConnect";

class Routes extends BaseComponent {
  componentDidMount() {}

  toast = () => {
    return (
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable={false}
        pauseOnHover={false}
        closeButton={null}
      />
    );
  };
  render() {
    let loader =
      this.props && this.props.user && this.props.user.loading ? (
        <LoaderComponent />
      ) : null;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={history}>
          {loader}
          {this.toast()}
          <Switch>
            <Route exact path={"/"} component={Login} />
            <Route exact path={"/sign-up"} component={SignUp} />
            <Route exact path={"/dashboard/:menu"} component={Dashboard} />
            <Route
              exact
              path={"/dashboard/:menu/:subMenu"}
              component={Dashboard}
            />
            <Route exact path={"/blockeduser"} component={BlockedUser} />
            <Route
              exact
              path={"/dashboard/:menu/:subMenu"}
              component={Dashboard}
            />
            {/*all the below routes needs to be delete*/}
            {/* <Route exact path={'/listedtokens'} component={ListedTokens} /> */}
            <Route exact path={"/blockeduser"} component={BlockedUser} />
            <Route exact path={"/tokendetails/:id"} component={TokenDetails} />

            <Route
              exact
              path={"/requestedtokens"}
              component={RequestedTokens}
            />
            <Route
              exact
              path={"/requesteddetails"}
              component={RequestedDetails}
            />
            <Route
              exact
              path={"/dashboard/tokens-list/requested-tokens"}
              component={TokenList}
            />
            <Route exact path={"/wallet-connect"} component={WalletConnect} />

            {/* <Route exact path={'/dashboard/manage-content/reported-nft/review-nft'} component={ReviewNftPage} /> */}
            <Redirect exact from="*" to="/" />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(Routes);
