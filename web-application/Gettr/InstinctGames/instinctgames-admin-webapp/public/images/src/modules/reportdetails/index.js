import React from "react";
import Report from "./reportdetails";
import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";



class ReportDetails extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      
    };
  }

  render() {
    return (
      <Column className="w-100-per">
        <Column>
          <Header handleChange={this.handleChange} />
        </Column>
        <Row className="w-100-per">
          <Column>
            <Sidebar handleChange={this.handleChange}
              open={this.state.menu}
            />
          </Column>
          <Column className="w-100-per">
            <Report 
              state={this.state} />
          </Column>
        </Row>
      </Column>
    );
  }
}


export default ReportDetails;
