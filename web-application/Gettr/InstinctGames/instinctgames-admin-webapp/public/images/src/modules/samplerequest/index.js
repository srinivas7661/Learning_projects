import React from "react";
import BaseComponent from "../baseComponent";
// import FeedComponent from "./feed";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import Samplerequest from "./sampleRequest"
import styled from "styled-components";

const ProfileImage = styled.div`
  border-radius: 50%;
  background-color: lightgray;
  height: 35px;
  width: 35px;
  align-self: center;
  justify-content: center;
`;

const data = [
  {
    test: <ProfileImage />,
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
  {
    test: <ProfileImage />,
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
  {
    test: <ProfileImage />,
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
  {
    test: <ProfileImage />,
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
  {
    test: <ProfileImage />,
    column1: "Alexa Appleseeds",
    column2: "BM0325",
    column3: "Mother's Stool Sample",
    column4: "First Trimster (13th Week)",
    column5: "10:30 AM,5 Jan 2021",
    column6: "546020",
    column7: "In Transit",
  },
];

class Sample extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      sampleRequests: [...data],
      sampleRequestList: [],
      tableColumns: ["", "User Name", "Sample ID", "Sample Type", "Sample Event", "Order Date and Time", "Zip Code", "Status"],
      menu: false,
    }
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  handleDropDownChange = () => {

  }

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
          <Column className="w-100-per">
            <Samplerequest
              handleDropDownChange={this.handleDropDownChange}
              state={this.state} />
            {/* userDetails={this.userDetails}/> */}
          </Column>
        </Row>
      </Column>
    );
  }
}

export default Sample;
