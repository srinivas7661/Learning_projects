import React, { Component } from "react";
import HeaderComponent from "../header";
import HomePage from "./homePage";
import { projectData } from "../../constants";
import FooterComponent from "../footer";

class HomePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [...projectData],
    };
  }
  componentDidMount() {}
  render() {
    const { projectList } = this.state;
    return (
      <div>
        <HeaderComponent />
        <HomePage projectList={projectList} />
        <FooterComponent />
      </div>
    );
  }
}
export default HomePageComponent;
