import React from "react";

const RemoveSaleDialog = (props) => {
  const handleCheckout = () => {
    props.removeSaleHandler();
  };

  return (
    <div className="bg-black-100 bg-opacity-85 z-20 px-10 fixed top-0 right-0 left-0 justify-center flex w-full min-h-screen items-center ">
      <div
        className="flex flex-col w-full min-w-303 max-w-604 polygon-wallet shadow-layout  bg-black-100"
        open={props.open}
        onClose={() => props.handleClose(false)}
      >
        <img
          onClick={() => {
            props.handleClose(false);
          }}
          className="w-4 h-4 tb:w-7 tb:h-7 self-end relative top-4 right-5 cursor-pointer"
          src="/images/xIcon.svg"
          alt="close"
        />
        <h1 className="font-EurostileBold text-center text-white text-ft6 tb:text-ft16 pt-8">
          Remove this Item
        </h1>
        <div className="mt-9.5 justify-center">
          <div className="font-EurostileMedium text-center text-grey-120 text-opacity-80 text-ft1 tb:text-ft13">
            Are you sure want to remove <br /> this item from sale ?
          </div>
        </div>
        <div className="text-center mt-9.5 mb-11.5">
          <button
            className="border rounded-full market-button overflow-hidden relative z-10 focus:shadow-outline focus:outline-none text-white font-bold py-1 tb:py-2 px-4 border-blue-80 bg-blue-60 w-25 tb:w-45 text-ft1 tb:text-ft6 tb:h-12"
            type="button"
            onClick={handleCheckout}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveSaleDialog;
