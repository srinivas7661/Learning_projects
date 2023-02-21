import React from "react";

import BaseComponent from "../baseComponent";
import { Row, Column } from "simple-flexbox";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
// import Kitorder from "./kitorderingsurvey";
import ReportOrderingSurvey from "./reportOrdering";

class ReportOrdering extends BaseComponent {
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
                    <Column className="w-100-per" >
                        <ReportOrderingSurvey state={this.state} />
                    </Column>
                </Row>
            </Column>
        );
    }
}

export default ReportOrdering;
