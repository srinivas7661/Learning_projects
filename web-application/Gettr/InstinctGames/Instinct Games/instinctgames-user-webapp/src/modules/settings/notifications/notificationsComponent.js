import React from "react";
import { useSelector } from "react-redux";
import {notificationItemDetails, notificationPreferencesConstants} from "../../../constants";

function NotificationComponent(props) {
    const walletId = useSelector((state) => state.wallet.walletConnect.userId)
    return(
        <div className="notification-dl mb-15 bg-black-90 w-full">
            <h1 className="text-white text-center text-ft14 tb:text-ft20 lg:text-ft68 font-black font-EurostileExtd border-b pt-5.25 pb-8 uppercase border-blue-80 tb:border-primary-50">Notification</h1>
            <div className="flex flex-col px-8 w-full items-center">
                <div className="mt-8 font-EurostileMedium">
                    <p className="text-white mb-6 text-ft1 tb:text-ft35 lg:text-ft16 opacity-64">Select which notifications you would like to recieve for {walletId?.slice(0,4) +"...."+walletId?.slice(-5) }</p>
                    <div className="flex flex-col mb-13 gap-10">
                        {Object.keys(notificationPreferencesConstants).map((key, index)=>(
                            <div key={key} className="flex gap-5 lg:gap-9 text-white">
                                <div>
                                    <div 
                                        onClick={()=>{props.toggleNotificationsRadio(key)}}
                                        className="border-2 tb:border-5 cursor-pointer flex justify-center w-6 h-6 tb:w-10 tb:h-10 lg:w-11.75 lg:h-11.75 p-1 tb:p-1.25 border-white rounded-half"
                                        >
                                        {props.state?.notificationPreferences.includes(notificationPreferencesConstants[key]) &&
                                        (<div className="w-full bg-white rounded-half"></div>)}
                                    </div>
                                </div>
                                <div className="w-full min-w-50">
                                    <p className="mb-4 text-ft29 tb:text-ft35 lg:text-ft17">{notificationItemDetails[key].title}</p>
                                    <p className="opacity-64 text-ft34 tb:text-ft24 lg:text-ft35">{notificationItemDetails[key].info}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-white mb-10.75 text-ft25 font-EurostileMedium tb:text-ft13 flex gap-7">
                    <button className="relative z-10 market-button overflow-hidden border bg-blue-100 border-blue-80 w-30 h-8  tb:h-12 tb:w-45 rounded-full" onClick={props.saveChanges}>Save changes</button>
                    <button 
                    onClick={props.clearNotifications}
                    className="relative z-10 market-button overflow-hidden border bg-blue-100 border-blue-80 w-21.25 h-8 tb:h-12 tb:w-33 rounded-full">Reset</button>
                </div>            
            </div>
        </div>
    )
}

export default NotificationComponent