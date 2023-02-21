import React from "react";
import { Router, Route } from "react-router-dom";
import { Redirect, Switch } from "react-router";
import { connect } from "react-redux";
import Stats from "./modules/stats/index";
import "./assets/styles/custom.css";
// import Home from "./modules/homePage/index";

import { history } from "./managers/history";
import {
  ExplorePage,
  ProfilePage,
  CollectionsPage,
  CollectionsDetailsPage,
  SearchResultsPage,
  NFTDetails,
  PrivacyPolicy,
  MakeSuggestionPage,
  SettingsPage,
  NotificationsPage,
} from "./modules/index";
import Faq from "./modules/faq";
import walletConnect from "./modules/connectWallet/index";
import TokenRequest from "./modules/tokenRequest/index";
import selectCategory from "./modules/categories";
import CreateItem from "./modules/createItem/index";
import MenuMobile from "./modules/mobileMenu/index";
import MobileSearchbar from "./modules/mobileSearchbar";
import LoaderComponent from "./common/components/loader";
import EditProfileComponent from "./modules/editProfile/index";
import About from "./modules/about/about";
import { Toaster } from "react-hot-toast";
import TransferNft from "./modules/transferNft/transferNft";
import TransferNftComponent from "./modules/transferNft";
import ListItem from "./modules/listItem/index"
const Home = React.lazy(() => import("./modules/homePage/index"));
const Routes = (props) => {
  let loader =
    props && props.walletConnect && props.walletConnect.loading ? (
      <LoaderComponent />
    ) : null;
  return (
    <React.Suspense fallback={<div className="container"><div className="loader-container"><div className="spinner"></div></div></div>}>
    <Router history={history}>
      {loader}
      <Toaster />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/explore"} component={ExplorePage} />
        <Route exact path={"/stats"} component={Stats} />
        {/* <Route exact path="/home" component={ExplorePage} /> fgdfgg*/}
        <Route
          exact
          path={"/collectionDetails/:id/:collectionAddress"}
          component={CollectionsDetailsPage}
        />
        <Route exact path={"/privacy-policy"} component={PrivacyPolicy} />
        <Route exact path={"/collections"} component={CollectionsPage} />
        <Route exact path={"/resources"} component={Faq} />
        <Route exact path={"/profile"} component={ProfilePage} />
        <Route exact path={"/wallet-connect"} component={walletConnect} />
        <Route exact path={"/token-request"} component={TokenRequest} />
        <Route exact path={"/select-category"} component={selectCategory} />
        <Route exact path={"/create-item/:id"} component={CreateItem} />
        <Route exact path={"/edit-profile"} component={EditProfileComponent} />
        <Route exact path={"/search-items"} component={SearchResultsPage} />
        <Route exact path={"/about"} component={About} />
        <Route exact path={"/nft"} component={NFTDetails} />
        <Route exact path={"/search-items"} component={SearchResultsPage} />
        <Route exact path={"/mobile-menu"} component={MenuMobile} />
        <Route exact path={"/mobile-searchbar"} component={MobileSearchbar} />
        <Route exact path={"/make-suggestion"} component={MakeSuggestionPage} />
        <Route exact path={"/settings"} component={SettingsPage} />
        {/* <Route exact path={"/transferNft"} component={TransferNft} /> vsdfgbdf*/}
        <Route exact path={"/list-item"} component={ListItem} />
        <Route exact path={"/notifications"} component={NotificationsPage} />
        <Route exact path={"/transfer-nft"} component={TransferNftComponent} />
        <Redirect exact from="*" to="/" />
      </Switch>
    </Router>
    </React.Suspense>
  );
};

const mapStateToProps = (state) => {
  return { walletConnect: state.wallet };
};
export default connect(mapStateToProps)(Routes);
