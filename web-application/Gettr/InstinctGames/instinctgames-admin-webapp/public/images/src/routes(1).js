import React from 'react';
import {Router, Route} from 'react-router-dom';
import {Redirect, Switch} from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from "react-redux";
import {Login, SignUp} from "./modules";
import FirstPageNft  from "./modules/CreateNft"
import {history} from "./managers/history";
import BaseComponent from "./modules/baseComponent";
import Stats from './modules/stats/stats'
import Sidebar from "./modules/filterSideBar"

class Routes extends BaseComponent {

    componentDidMount() {

    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/'} component={Login}/>
                        <Route exact path={'/sign-up'} component={SignUp}/>
                        <Route exact path={'/CreateNft'} component={FirstPageNft}/>
                        <Route exact path={'/stats'} component={Stats}/>
                        <Route exact path={'/filter-sidebar'} component={Sidebar}/>

                        <Redirect exact from='*' to="/"/>
                    </Switch>
                </Router>
            </MuiThemeProvider>);
    }
}

const mapStateToProps = (state) => {
    return {user: state.user}
};
export default connect(mapStateToProps)(Routes);