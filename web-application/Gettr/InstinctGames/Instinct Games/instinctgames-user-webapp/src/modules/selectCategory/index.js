import React, { Component } from "react";
import seletctCategory from "./homePageComponent";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";

class HomePageComponent extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <HeaderComponent />
        <seletctCategory />
        <FooterComponent />
      </>
    );
  }
}

export default HomePageComponent;
