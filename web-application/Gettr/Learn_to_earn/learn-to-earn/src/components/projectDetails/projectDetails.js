import React from "react";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PopUp from "../popUp/popUp";

const ProjectDetails = (props) => {
  let homeHistory = useHistory();
  const homeBtn = () => {
    homeHistory.push("/");
  };
  const [openTab, setOpenTab] = useState(1);
  const [showPopUp, setShowPopUp] = React.useState(false);

  const { history } = props;
  const { state } = history.location;
  const { details } = state;

  return (
    <div className="w-full bg-blue-100">
      <div className="py-10 xl:w-312.5 w-95per ml-auto mr-auto ">
        <div className="flex items-center w-22 justify-between">
          <p
            className=" text-violet-100 text-ft0 cursor-pointer"
            onClick={homeBtn}
          >
            Project
          </p>
          <img className="w-1 h-2" src="/images/next-arrow.png" alt="/" />
          <p className=" text-grey-200 text-ft0">Details</p>
        </div>
        <h1 className="text-black my-2 text-ft20 font-PoppinsMedium">
          Project Details
        </h1>

        <div className="details-bg lg:p-8 md:p-6 p-4 flex sm:flex-col xs:flex-col md:flex-row lg:flex-row xs:items-center sm:items-center bg-cover lg:h-80 md:h-113.5 xs:h-144 sm:h-144 rounded-lg">
          <img
            src={details.image}
            className="lg:w-28.5 lg:h-28.5 w-19.5 h-19.5 rounded-full"
            alt="/"
          />
          <div className="flex flex-col h-full justify-between md:items-center sm:items-center xs:items-center w-full md:ml-8 lg:ml-8">
            <div className="lg:flex items-center xs:mt-7 sm:mt-7 justify-between">
              <div className="md:w-118 lg:w-118 w-90per">
                <h1 className="text-white font-PoppinsBold md:text-ft36 lg:text-ft36 text-ft24">
                  {details.projectName}
                </h1>
                <p className="text-white opacity-100 text-ft15 font-PoppinsRegular">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit cras
                  quis odio justo. Sed elit mi, aliquam congue justo in,
                  molestie semper dui.
                </p>
              </div>

              <div className="flex items-center mt-6.5 lg:mt-0 md:w-87.5 lg:w-87.5 justify-between">
                <div className=" border border-blue-150 p-2.5 flex flex-col justify-between md:w-157px lg:w-157px w-31 h-115px rounded-lg">
                  <div className="flex items-center">
                    <p className=" text-blue-50 text-ft18 font-PoppinsMedium">
                      Earn&nbsp;
                    </p>
                    <img
                      className="w-3 h-3"
                      src="/images/info-icon.png"
                      alt="/"
                    />
                  </div>
                  <div className="flex">
                    <h1 className="text-ft46 font-semibold font-PoppinsRegular text-white">
                      {details.price}
                    </h1>
                    <p className="text-ft23 font-PoppinsMedium text-violet-200 flex items-center">
                      {details.type}
                    </p>
                  </div>
                  <p className=" text-ft14 text-violet-150 font-PoppinsMedium">
                    32.30 USD
                  </p>
                </div>

                <img src="/images/plus-icon.png" alt="/" className="w-3 h-3" />
                <div className="border border-blue-150 p-2.5 flex flex-col justify-between md:w-157px lg:w-157px w-31 h-115px rounded-lg">
                  <div className="flex items-center">
                    <p className=" text-blue-50 text-ft18 font-PoppinsMedium">
                      Get&nbsp;
                    </p>
                    <img
                      className="w-3 h-3"
                      src="/images/info-icon.png"
                      alt="/"
                    />
                  </div>
                  <h1 className="text-ft46 font-semibold font-PoppinsRegular text-white">
                    NFT
                  </h1>
                  <p className=" text-ft14 text-violet-150 font-PoppinsMedium">
                    Certificate
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:hidden xs:hidden block">
              <img
                className="w-112.5 h-5"
                src="/images/project-details.png"
                alt="/"
              />
            </div>
            <div className="w-90per sm:block xs:block hidden text-white font-PoppinsMedium">
              <div className="flex justify-between">
                <div className="flex">
                  <img src="/images/timer-icon.png" alt="/" />
                  <p>30 min Duration</p>
                </div>
                <div className="flex">
                  <img src="/images/graph-icon.png" alt="/" />
                  <p>Beginners</p>
                </div>
              </div>
              <div className="flex mt-4">
                <img src="/images/user-icon.png" alt="/" />
                <p>221 Participants</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-8 my-5 h-8 justify-between ">
          <div className="flex items-center">
            <h1>Project Status</h1>
            <div className=" bg-green-100 ml-3 w-19 h-6.5 rounded-lg flex justify-center items-center">
              {openTab === 1 ? (
                <p className=" text-green-50 text-ft0 font-PoppinsMedium">
                  Activated
                </p>
              ) : null}
              {openTab === 2 ? (
                <p className=" text-green-50 text-ft0 font-PoppinsMedium">
                  In Progress
                </p>
              ) : null}
              {openTab === 3 ? (
                <p className=" text-green-50 text-ft0 font-PoppinsMedium">
                  Completed
                </p>
              ) : null}
            </div>
          </div>
          {openTab === 3 ? (
            <button className="flex justify-evenly items-center w-40 rounded-lg h-8 bg-violet-50">
              <img
                className="h-5 w-5"
                src="/images/document-icon.png"
                alt="/"
              />
              <p className=" text-ft14 font-PoppinsMedium text-white">
                View Certificate
              </p>
            </button>
          ) : null}
        </div>
        <div>
          <div className="flex flex-wrap">
            <div className="">
              <ul
                className="flex mb-10 rounded-lg bg-blue-50 list-none flex-wrap flex-row"
                role="tablist"
              >
                <li
                  className={
                    " last:mr-0 flex-auto text-center " +
                    (openTab === 1 ? "bg-white rounded-lg" : "")
                  }
                >
                  <div
                    className={
                      "gap-x-2.5 justify-center px-5 py-3 flex " +
                      (openTab === 1 ? "text-violet-50" : "text-blue-200")
                    }
                    data-toggle="tab"
                  >
                    {openTab === 2 || openTab === 3 ? (
                      <img
                        className="w-5"
                        src="/images/tick-icon.png"
                        alt="/"
                      />
                    ) : null}
                    <p>Task 1</p>
                  </div>
                </li>
                <li
                  className={
                    " last:mr-0 flex-auto text-center " +
                    (openTab === 2 ? "bg-white rounded-lg" : "")
                  }
                >
                  <div
                    className={
                      "gap-x-2.5 justify-center px-5 py-3  rounded flex  " +
                      (openTab === 2 ? "text-violet-50" : "text-blue-200")
                    }
                    data-toggle="tab"
                  >
                    {openTab === 3 ? (
                      <img
                        className="w-5"
                        src="/images/tick-icon.png"
                        alt="/"
                      />
                    ) : null}
                    <p>Task 2</p>
                  </div>
                </li>
                <li
                  className={
                    " last:mr-0 flex-auto text-center " +
                    (openTab === 3 ? "bg-white rounded-lg" : "")
                  }
                >
                  <div
                    className={
                      " font-bold  px-5 py-3 block  " +
                      (openTab === 3 ? "text-violet-50" : "text-blue-200")
                    }
                    data-toggle="tab"
                  >
                    Claim Reward
                  </div>
                </li>
              </ul>
              <div className="relative flex flex-col bg-blue-100 min-w-0 break-words w-full mb-6  rounded">
                <div className=" flex-auto">
                  <div className="tab-content tab-space ">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <div className="lg:flex">
                        <img
                          className="w-183.5 h-98"
                          src="/images/screen-shot.png"
                          alt="/"
                        />
                        <div className="p-2.5 pl-11">
                          <h1 className=" text-ft28 font-PoppinsMedium">
                            Perform a Swap
                          </h1>
                          <p className="text-ft15 font-PoppinsMedium">
                            Mauris lobortis massa ut urna dictum, at congue
                            magna porta. Curabitur ut quam eu velit maximus
                            pellentesque ornare vel magna. Nunc dictum tristique
                            neque, eu maximus metus vulputate eget.
                          </p>
                          <p className="w-50 flex justify-center mt-20">
                            watched the video?
                          </p>
                          <button
                            className="text-ft18 bg-violet-250 w-50 h-13 text-white rounded-lg"
                            onClick={() => setShowPopUp(true)}
                          >
                            Validate Task
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
                      <div className="lg:flex">
                        <img
                          className="w-183.5 h-98"
                          src="/images/import-screenShot.png"
                          alt="/"
                        />
                        <div className="p-2.5 pl-11">
                          <h1 className=" text-ft28 font-PoppinsMedium">
                            Import Pool
                          </h1>
                          <p className="text-ft15 font-PoppinsMedium">
                            Mauris lobortis massa ut urna dictum, at congue
                            magna porta. Curabitur ut quam eu velit maximus
                            pellentesque ornare vel magna. Nunc dictum tristique
                            neque, eu maximus metus vulputate eget.
                          </p>
                          <p className="w-50 flex justify-center mt-20">
                            watched the video?
                          </p>
                          <button
                            className="text-ft18 bg-violet-250 w-50 h-13 text-white rounded-lg"
                            onClick={() => setOpenTab(3)}
                          >
                            Validate Task
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className={openTab === 3 ? "block" : "hidden"}
                      id="link3"
                    >
                      <div className="lg:flex">
                        <img
                          className="w-183.5 h-98"
                          src="/images/three-screen.png"
                          alt="/"
                        />
                        <div className="p-2.5 pl-11">
                          <h1 className=" text-ft28 font-PoppinsMedium">
                            Claim your Reward
                          </h1>
                          <p className="text-ft15 font-PoppinsMedium">
                            You have won 10 Cake tokens for successfully
                            completing the tasks in this project. Click on the
                            Claim Reward button to get these tokens in your
                            wallet.
                          </p>

                          <button
                            onClick={() => setOpenTab(1)}
                            className="text-ft18 mt-8 bg-green-50 w-50 h-13 text-white rounded-lg"
                          >
                            Claim Reward
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" text-ft15 flex justify-center">
          <p className="mt-14 mb-5">
            Facing any technical issue?{" "}
            <span className=" text-violet-100">Contact Us</span>
          </p>
        </div>
        {showPopUp ? (
          <>
            <PopUp close={setShowPopUp} open={setOpenTab} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(ProjectDetails);
