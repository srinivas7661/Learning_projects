import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Media } from "react-bootstrap";

function ReportNFTDialog(props) {
  const { handleClose, open } = props;
  const [reportListDropDown, setReportListDropDown] = useState(false);
  const reportListConstants = [
    {
      name: "Copyright Infringement",
      value: "Copyright Infringement",
    },
    {
      name: "Spam",
      value: "Spam",
    },
    {
      name: "Might be stolen",
      value: "Might be stolen",
    },
    {
      name: "Other",
      value: "Other",
    },
  ];

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
          maxWidth: "900px",

          // maxHeight:"200px"
        },
      }}
    >
      <div className="bg-black-100 text-white report-item">
        <div className="flex justify-end p-4 mobile:p-3">
          <img
            className="w-8 mobile:w-4"
            onClick={handleClose}
            src="/images/xIcon.svg"
          ></img>
        </div>
        <div className="pl-20 pr-20 pb-15 mobile:pl-17.5 mobile:pr-17.5 mobile:pb-7.5">
          <div className="text-ft7 text-center mb-5 font-bold mobile:mb-2 mobile:text-ft4">
            Report this item
          </div>
          {!props.reportConfirmDialog ? (
            <>
              <div className="flex cursor-pointer relative items-center w-60">
                <div
                  onClick={() => setReportListDropDown((prev) => !prev)}
                  className="flex justify-between  bg-blue-400 cursor-pointer relative border border-blue-80 text-white text-ft3 items-center  w-full h-9.5 gap-1 p-2 mob:text-ft1"
                >
                  <span className="whitespace-nowrap relative">
                    {props?.state?.selectedReason || "Select a Reason "}
                  </span>
                  <img
                    src={
                      reportListDropDown
                        ? "/images/arrow-up.svg"
                        : "/images/arrow-down.svg"
                    }
                    className="2xl:h-3.5 h-2.5 w-4"
                  />
                </div>
                {reportListDropDown && (
                  <div className="bg-blue-400 z-50  absolute sm:w-60 text-white text-ft3 border border-blue-80 top-0 left-0">
                    {reportListConstants?.map((report, index) => (
                      <div
                        key={index}
                        className="pt-2 px-4 hover:bg-blue-80 border-b border-blue-80  2xl:h-10.5 h-9.5 mob:text-ft1 whitespace-nowrap"
                        onClick={() => {
                          setReportListDropDown(false);
                          props.handleSetState({
                            selectedReason: report.value,
                          });
                        }}
                      >
                        {report.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* <select
                className="w-70 bg-blue-60 border border-blue-80 focus:outline-none mb-6 p-1 mobile:mx-auto mobile:text-ft2 mobile:w-45"
                onChange={props.selectReason}
              >
                <option value="">Select a reason</option>
                <option value="Copyright Infringement">
                  Copyright Infringement
                </option>
                <option value="Spam">Spam</option>
                <option value="Might be stolen">Might be stolen</option>
                <option value="Other">Other</option>
              </select> */}
              <button
                className="w-35 mt-8  market-button relative overflow-hidden z-10 bg-blue-60 border border-blue-80 focus:outline-none ml-auto mr-auto block  pb-2 pt-2 rounded-full mobile:w-25 mobile:text-ft2"
                onClick={props.onReportNFT}
              >
                Report
              </button>{" "}
            </>
          ) : (
            <>
              <div className="text-center">This Item is Reported By you</div>
              <button
                className="w-35 bg-blue-60 border border-blue-80 focus:outline-none ml-auto mr-auto block  pb-2 pt-2 rounded-full mobile:w-20"
                onClick={props.handleClose}
              >
                Close
              </button>{" "}
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default ReportNFTDialog;
