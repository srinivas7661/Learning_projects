import React from "react";

const PopUp = (props) => {
  const close = () => {
    props.close(false);
  };
  const open = () => {
    props.open(2);
  };

  function tabTwo() {
    close();
    open();
  }

  return (
    <div className="bg-balck-50 bg-opacity-40 z-20 px-10 fixed top-0 right-0 left-0 justify-center flex w-full min-h-screen items-center ">
      <div className="fixed grid gap-y-8 p-5 top-18.5 lg:right-1/3 z-10 md:w-160 lg:w-160 sm:w-107.5 w-90per   bg-white rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className=" text-ft22 font-extrabold">Validate Task</h1>
          <img
            onClick={close}
            className=" cursor-pointer"
            src="/images/close-icon.png"
            alt="/"
          />
        </div>
        <div className=" text-ft18">
          <p>
            1.&nbsp;Open{" "}
            <span className="text-blue-150">www.pancakeswap.finance</span> and
            click on Trade.
          </p>
          <p>2.&nbsp;Connect you wallet.</p>
          <p>3.&nbsp;Make a Swap as explained in the video.</p>
        </div>
        <div className="text-ft18 grid gap-y-1">
          <p>
            Copy paste swap transaction addres from
            <span className="text-blue-150"> Etherscan</span> and click Verify
          </p>
          <div className="w-90per overflow-hidden p-2.5 border border-grey-50 rounded-lg">
            0xafd4f2a6291402355flf482lf7383f47la8daeebfa9622s03e3fc8c63afac53
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={tabTwo}
            className="text-ft18 bg-violet-250 w-50 h-11 text-white rounded-lg"
          >
            Validate Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
