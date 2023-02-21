import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Redirect, Switch } from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from "react-redux";

import { history } from "./managers/history";

import BaseComponent from "./modules/baseComponent";

import Appointment from "./Appointment";
// import Doct
// import Afeedback from './modules/Appoint-feedback/';
import Afeedback from "../Appoint-feedback/Appointfeedback";

class Routes extends BaseComponent {


    render() {
        return (

            <MuiThemeProvider muiTheme={getMuiTheme()}>

                <Router history={history}>

                    <Switch>
               
                        <Route exact path={'/appointment'} component={Appointment} />

                        <Route exact path={'/feedback'} component={Afeedback} />
                        
                        <Redirect exact from='*' to="/" />
                    </Switch >
                </Router >
            </MuiThemeProvider >);
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
};
export default connect(mapStateToProps)(Routes);