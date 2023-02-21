import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function MakeSuggestionComponent(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-main w-full px-10 tb:px-0 bg-cover min-h-screen flex justify-center items-center pt-15">
      <div className="policy_clip w-full min-w-333 max-w-lg2 shadow-layout bg-black-100 m-20">
        <div className="text-white py-5  w-full text-center border-b-2 border-blue-80 sm:border-primary-50 text-ft22 md:text-ft9 xl:text-ft19  font-EurostileExtd font-black">
          <h1>
            MAKE A <br className="tb:hidden" /> SUGGESTION
          </h1>
        </div>
        <div className="w-full flex sm:justify-center my-14 px-4">
          {/* Form Submission */}
          <form
            autoComplete="off"
            onSubmit={(event) => {
              props.onSubmission(event);
            }}
            className="text-ft23 w-full max-w-627 sm:text-ft6 xl:text-ft13 flex flex-col text-white"
          >
            <div className="flex flex-col gap-3 tb:gap-8 mb-4 tb:flex-row tb:justify-between">
              <div className="flex flex-col tb:w-75.75 font-EurostileMedium">
                <label className="text-white mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  value={props.state.name}
                  onChange={(e) => {
                    props.changeFormValues(e);
                  }}
                  placeholder="Enter your name"
                  className="bg-transparent pl-4 placeholder-opacity-30 placeholder-white h-5.5 sm:h-11 rounded focus:outline-none border border-primary-50"
                />
              </div>
              <div className="flex flex-col tb:w-75.75 font-EurostileMedium">
                <label className="text-white mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={props.state.email}
                  placeholder="Write your email address"
                  onChange={(e) => {
                    props.changeFormValues(e);
                  }}
                  className="bg-transparent pl-4 placeholder-opacity-30 placeholder-white h-5.5 sm:h-11 rounded focus:outline-none border border-primary-50"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4 font-EurostileMedium">
              <label className="text-white mb-2">Topic</label>
              <input
                id="topic"
                type="text"
                value={props.state.topic}
                onChange={(e) => {
                  props.changeFormValues(e);
                }}
                placeholder="Enter Topic"
                className="bg-transparent pl-4 placeholder-opacity-30 placeholder-white h-5.5 sm:h-11 rounded focus:outline-none border border-primary-50"
              />
            </div>
            <div className="flex flex-col mb-11 font-EurostileMedium">
              <label className="text-white mb-2">Comment</label>
              <textarea
                id="comment"
                type="text"
                value={props.state.comment}
                onChange={(e) => {
                  props.changeFormValues(e);
                }}
                rows="8"
                placeholder="Write your comment or question."
                className="bg-transparent pt-4 pl-4 placeholder-opacity-30 placeholder-white rounded focus:outline-none border border-primary-50 resize-none"
              />
            </div>
            <button
              type="submit"
              className="self-center relative z-10 market-button overflow-hidden border bg-blue-100 border-blue-80  py-2 px-16 rounded-full"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MakeSuggestionComponent;
