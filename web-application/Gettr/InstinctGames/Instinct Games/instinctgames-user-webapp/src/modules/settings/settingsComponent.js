import React from "react";
import { settingsTab } from "../../constants";
import Notifications from "./notifications";
import SettingsProfile from "./settingsProfile"

function SettingsComponent(props){
    return(
        <div className="flex w-full px-5.25 justify-center">
            <div className="w-full max-w-lg_5">
                <h1 className="text-ft20 tb:text-ft68 text-white font-EurostileExtd font-black uppercase mt-14.5">Settings</h1>
                <div className="flex tb:text-ft16 text-ft5 mt-10 mb-10 gap-5 lg:gap-11.5">
                    {settingsTab.map((tab,index)=>(
                        <div 
                        onClick={()=>{props.changeActiveTab(index)}}
                        className="flex flex-col cursor-pointer font-bold font-EurostileMedium" key={index}>
                            <h1 className={`${props.state.activeTab === tab ? "text-blue-80":"text-white"} `}>{tab}</h1>
                            {props.state.activeTab === tab  && <hr className="text-blue-80 w-2.5 border-t-2 self-center" />}
                        </div>
                    ))}
                </div>
                {props.state.activeTab === settingsTab[0] && <SettingsProfile /> }            
                {props.state.activeTab === settingsTab[1] && <Notifications /> }
            </div>            
        </div>
    )
}

export default SettingsComponent