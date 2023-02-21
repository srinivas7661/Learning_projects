import React from "react";

function MainNotificationComponent(props) {
    return (
        <div className="w-full min-h-screen flex mt-30.75 mmobile:mt-17.5 px-10 justify-center">
            <div className="main-dl mb-13.25 bg-black-90 w-full min-w-333 max-w-lg2">
                <h1 className={`${props.state.notifications.length === 0?"border-b border-primary-50":""} text-white text-center text-ft14 tb:text-ft66 font-black font-EurostileExtd pt-4.25 pb-4.25 lg:pt-5 lg:pb-8 uppercase `}>Notifications</h1>
                {props.state?.notifications && props.state?.notifications?.length ? props.state.notifications.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => {
                        }}
                        className={`${item.active ? "bg-primary-100" : ""} border-t border-primary-100 cursor-pointer flex w-full font-EurostileMedium py-9 justify-center h-45.5`}>
                        <div className="flex px-4 w-nex gap-6 justify-between items-center">
                            <div className="flex gap-5 tb:gap-9.5 items-center ">
                                <img className="w-10 h-10 tb:w-15 tb:h-15 lg:w-20 lg:h-20"
                                     src="/images/bellNotifications.svg"/>
                                <div className="text-white w-full max-w-987">
                                    <h1 className="text-ft25 md:text-ft13 lg:text-ft65 mb-2">{item.title}</h1>
                                    <p className={`text-ft34 md:text-ft6 lg:text-ft67 ${item.active ? "opacity-100" : "opacity-64"} `}>{item.description}</p>
                                </div>
                            </div>
                            {!item.isRead && (
                                <div>
                                    <p className="w-3.5 h-3.5 tb:w-5 tb:h-5 lg:w-6.75 bg-primary-100 lg:h-6.75 right-thp rounded-full"></p>
                                </div>)}
                        </div>
                    </div>
                )) : (
                <div className="flex justify-center items-center h-3/4">
                    <span className="text-white text-ft14 font-EurostileExtd">No Notification yet</span>
                </div>)
                }
                {(props?.state?.skip+props?.state?.limit) <= props?.state?.totalNotificationCount ? (
                    <div className="flex justify-center pb-5">
                        <button
                            onClick={() => props.handleLoadMoreClick()}
                            className="market-button text-ft0 py-1.25 sm:text-ft13 w-24 h-6.5 sm:w-44 sm:h-12 rounded-3xl text-white bg-blue-60 relative overflow-hidden border border-blue-80"
                        >
                            Load More
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}

export default MainNotificationComponent