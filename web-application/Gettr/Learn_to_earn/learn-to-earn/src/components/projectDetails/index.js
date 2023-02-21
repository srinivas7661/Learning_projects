import React, { Component } from "react";
import HeaderComponent from "../header";
import ProjectDetails from "./projectDetails";
import FooterComponent from "../footer";

class ProjectDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <HeaderComponent />
        <ProjectDetails />
        <FooterComponent />
      </div>
    );
  }
}
export default ProjectDetailsComponent;
