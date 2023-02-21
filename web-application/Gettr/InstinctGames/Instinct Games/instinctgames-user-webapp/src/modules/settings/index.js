import React, {Component} from "react";
import HeaderComponent from "../common/header";
import SettingsComponent from "./settingsComponent";
import { settingsTab } from "../../constants";
import FooterComponent from "../common/footer";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeTab: settingsTab[0],
        }        
    }
 
    changeActiveTab = (index)=>{
        this.setState({
            activeTab:settingsTab[index]
        })
    }
    
    render() { 
        return ( 
            <div className="bg-main bg-cover min-h-screen">
                <HeaderComponent />
                <SettingsComponent 
                    state={this.state}
                    changeActiveTab={this.changeActiveTab} />
                <FooterComponent />
            </div>
         );
    }
}
 

export default  (Settings) ;
