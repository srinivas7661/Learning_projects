import React from "react";

import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
// import Sidebar from "../common/sidebar";
import Feedback from "./Appointfeedback";

class Fedback extends BaseComponent {
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
      <div style={{ overflow: "hidden" }}>
        <Column >
          <Column>
            <Header handleChange={this.handleChange} />
          </Column>
          <Row >
            <Column>
              {/* <Sidebar handleChange={this.handleChange}
              open={this.state.menu}
            /> */}
            </Column>
            <Column >
              <Feedback state={this.state} />
            </Column>
          </Row>
        </Column>
      </div>
    );
  }
}

export default Fedback;
