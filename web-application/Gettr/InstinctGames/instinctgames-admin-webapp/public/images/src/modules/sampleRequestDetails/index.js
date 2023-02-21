import React from "react";
import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import StatusUpdateComponent from "./sampleRequest"

class statusUpdate extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      menuType : 'icon'
    };
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Column className="w-100-per">
        <Column>
          {" "}
          <Header handleChange={this.handleChange} />{" "}
        </Column>
        <Row className="w-100-per">
          <Column>
            {" "}
            <Sidebar handleChange={this.handleChange}  open={this.state.menu} 
            menuType={this.state.menuType}/>{" "}
          </Column >
          <Column className="w-100-per">
            <StatusUpdateComponent   />
          </Column>
        </Row>
      </Column>
    );
  }
}

export default statusUpdate;
