import React from "react";

import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import Kitorder from "./kitorderingsurvey";

class Kit extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Column>
        <Column>
          <Header handleChange={this.handleChange} />
        </Column>
        <Row>
          <Column>
            <Sidebar handleChange={this.handleChange}
              open={this.state.menu}
            />
          </Column>
          <Column className="w-100-per padding-left-30 padding-top-20" >
            <Kitorder state={this.state} />
          </Column>
        </Row>
      </Column>
    );
  }
}

export default Kit;
