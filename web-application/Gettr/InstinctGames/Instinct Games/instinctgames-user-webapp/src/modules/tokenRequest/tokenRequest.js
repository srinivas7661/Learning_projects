import React,{useEffect} from "react";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import Utils from "../../utility";
import { validationsMessages } from "../../constants";

const TokenRequest = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="bg-main bg-cover text-white pb-13 pt-43.5 mobile:pt-10">
      <Toaster />
      <div className="polygon-token bg-black-60 ml-auto mr-auto mb-0 relative w-pex mobile:w-nex pb-fff">
        <div className="font-black font-EurostileExtended text-center text-white tb:text-ft-3 pt-fff text-ft22">
          ADD YOUR TOKEN REQUEST
        </div>
        <hr className="border-t-2  text-primary-50 mt-fff w-full" />
        <div className="flex justify-center mt-fex">
          <form className="tb:w-1/2 w-eiy">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide tb:text-ft-1 text-ft-10 mb-oex  text-white opacity-100"
                  for="grid-password"
                >
                  Token name
                </label>
                <input
                  className="bg-black-300 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 border border-gray-200 rounded-sm tb:rounded py-oex px-oex tb:text-ft-1 text-ft-10 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                  id="text"
                  type="text"
                  placeholder="Enter Token Name"
                  name="tokenName"
                  autoComplete="off"
                  required
                  value={props.state?.tokenName}
                  onChange={(e) => props.handleChange(e)}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block tracking-wide tb:text-ft-1 text-ft-10 mb-oex"
                  for="grid-password"
                >
                  Token symbol
                </label>
                <input
                  className="bg-black-300 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm tb:rounded py-oex px-oex tb:text-ft-1 text-ft-10 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                  id="text"
                  type="text"
                  placeholder="Enter Token Symbol"
                  name="tokenSymbol"
                  autoComplete="off"
                  value={props.state?.tokenSymbol}
                  onChange={(e) => props.handleChange(e)}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block tracking-wide tb:text-ft-1 text-ft-10 mb-oex"
                  for="grid-password"
                >
                  Contract address
                </label>
                <input
                  className="bg-black-300 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm tb:rounded py-oex px-oex tb:text-ft-1 text-ft-10 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                  id="text"
                  type="text"
                  placeholder="Enter Contract Address"
                  name="tokenAddress"
                  autoComplete="new-password"
                  value={props.state?.tokenAddress}
                  onChange={(e) => props.handleChange(e)}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block tracking-wide tb:text-ft-1 text-ft-10 mb-oex"
                  for="grid-password"
                >
                  Email
                </label>
                <input
                  className="bg-black-300 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm tb:rounded py-oex px-oex tb:text-ft-1 text-ft-10 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                  id="email"
                  type="email"
                  placeholder="Enter Email Address"
                  name="email"
                  autoComplete="off"
                  value={props.state?.email}
                  onChange={(e) => props.handleChange(e)}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block tracking-wide tb:text-ft-1 text-ft-10 mb-oex"
                  for="grid-password"
                >
                  Phone
                </label>
                <input
                  className="bg-black-300 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm tb:rounded py-oex px-oex tb:text-ft-1 text-ft-10 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                  id="phone"
                  type="phone"
                  placeholder="Phone"
                  name="phone"
                  autoComplete="new-password"
                  value={props.state?.phone}
                  onChange={(e) => props.handleChange(e)}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block tracking-wide tb:text-ft-1 text-ft-10 mb-oex"
                  for="grid-password"
                >
                  Contract ABI
                </label>
                <textarea
                  className="bg-black-300 border-solid border-1 border-primary-50 appearance-none h-tew block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm tb:rounded py-oex px-oex tb:text-ft-1 text-ft-10 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="Token ABI"
                  id="text-area"
                  name="tokenAbi"
                  autoComplete="off"
                  value={props.state?.tokenAbi}
                  onChange={(e) => props.handleChange(e)}
                />
              </div>
              <div className="w-full px-3">
                <label
                  className="block tracking-wide tb:text-ft-1 text-ft-10 mb-oex"
                  for="grid-password"
                >
                  Comment
                </label>
                <textarea
                  className="bg-black-300 border-solid border-1 border-primary-50 appearance-none h-tew block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-sm tb:rounded py-oex px-oex tb:text-ft-1 text-ft-10 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                  type="text"
                  placeholder="Write comment"
                  id="text-area"
                  name="comment"
                  autoComplete="off"
                  value={props.state?.comment}
                  onChange={(e) => props.handleChange(e)}
                />
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div class="w-2/3 flex justify-center">
                <button
                  class="border-solid tb:text-ft-1 text-ft-10 border-2 border-indigo-600 rounded-full  focus:shadow-outline focus:outline-none text-white font-bold py-tex px-fex border-primary-50 bg-blue-60 w-fkx mt-tix"
                  type="button"
                  onClick={props.handleSubmit}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TokenRequest;
