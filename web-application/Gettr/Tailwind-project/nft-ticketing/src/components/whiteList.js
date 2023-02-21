import React from "react";
import Pagination from "./pagination";

const WhiteList = () => {
  return (
    <div className="bg-grey-200 h-full px-12.5 pt-14.5">
      <h1 className="text-black-50 font-OpenSansSemiBold text-ft22">
        Whitelist
      </h1>
      <div className="mt-11 xs:block flex justify-between">
        <div className="flex items-center justify-between bg-white border border-white rounded-lsm xs:w-auto xs:mr-5 w-75 h-11 px-5">
          <input type="text" placeholder="Search" className=" outline-none" />
          <img
            src="/images/search-icon.svg"
            alt="searchIcon"
            className="w-4 h-4.5"
          />
        </div>

        <button
          className="bg-blue-100 xs:mt-7.5pe flex justify-center items-center w-37.5 h-12.5 rounded-lsm text-white font-OpenSansSemiBold text-ft14"
          type="submit"
        >
          + Add User
        </button>
      </div>
      <div className="bg-white rounded-sm shadow-sm w-full min-w-300 py-3.5 mt-7.5 xs:overflow-x-scroll sm:overflow-x-scroll">
        <table className="table min-w-full whitespace-nowrap justify-center ">
          <thead className="border-b-2 border-grey-50">
            <th className="py-5 xr:pl-7.5 pl-3">
              <div className="flex items-baseline font-OpenSansSemiBold text-black-50 font-semibold">
                Name
                <img
                  src="/images/range-icon.png"
                  alt="rangeIcon"
                  className="w-2.25 h-3.25 ml-2.5"
                />
              </div>
            </th>
            <th className="py-5">
              <div className="flex items-baseline font-OpenSansSemiBold text-black-50 font-semibold">
                Email Address
                <img
                  src="/images/range-icon.png"
                  alt="rangeIcon"
                  className="w-2.25 h-3.25 ml-2.5"
                />
              </div>
            </th>
            <th className="py-5">
              <div className="flex items-baseline font-OpenSansSemiBold text-black-50 font-semibold">
                Mobile Number
                <img
                  src="/images/range-icon.png"
                  alt="rangeIcon"
                  className="w-2.25 h-3.25 ml-2.5"
                />
              </div>
            </th>
            <th className="py-5">
              <div className="flex items-baseline font-OpenSansSemiBold text-black-50 font-semibold">
                Features
                <img
                  src="/images/range-icon.png"
                  alt="rangeIcon"
                  className="w-2.25 h-3.25 ml-2.5"
                />
              </div>
            </th>
            <th className="py-5">
              <div className="flex items-baseline font-OpenSansSemiBold text-black-50 font-semibold">
                Action
                <img
                  src="/images/range-icon.png"
                  alt="rangeIcon"
                  className="w-2.25 h-3.25 ml-2.5"
                />
              </div>
            </th>
          </thead>
          <tbody>
            <tr className="border-b-2 border-grey-50">
              <td className="py-5 xr:pl-7.5 pl-3 font-OpenSansRegular text-black-50 text-ft14">
                John Doe
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Johndoe@gmail.com
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                09958693963
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Communite.HomePage
              </td>
              <td className="py-5">
                <img src="/images/select-icon.png" alt="actionLogo" />
              </td>
            </tr>
            <tr className="border-b-2 border-grey-50">
              <td className="py-5 xr:pl-7.5 pl-3 font-OpenSansRegular text-black-50 text-ft14">
                Juan Dela Cruz
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                jsdelacruz@gmail.com
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                09958693963
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Communite.HomePage
              </td>
              <td className="py-5 ">
                <img src="/images/select-icon.png" alt="actionLogo" />
              </td>
            </tr>
            <tr className="border-b-2 border-grey-50">
              <td className="py-5 xr:pl-7.5 pl-3 font-OpenSansRegular text-black-50 text-ft14">
                Maine Jaspeih
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Mainejaspeih@gmail.com
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                09958693963
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Communite.HomePage
              </td>
              <td>
                <img src="/images/select-icon.png" alt="actionLogo" />
              </td>
            </tr>
            <tr className="border-b-2 border-grey-50">
              <td className="py-5 xr:pl-7.5 pl-3 font-OpenSansRegular text-black-50 text-ft14">
                Melanie moore
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Melaniemoore@gmail.com
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                09958693963
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Communite.HomePage
              </td>
              <td className="py-5">
                <img src="/images/select-icon.png" alt="actionLogo" />
              </td>
            </tr>
            <tr className="border-b-2 border-grey-50">
              <td className="py-5 xr:pl-7.5 pl-3 font-OpenSansRegular text-black-50 text-ft14">
                Olivia Wharton
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Oliviawharton@gmail.com
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                09958693963
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Communite.HomePage
              </td>
              <td className="py-5">
                <img src="/images/select-icon.png" alt="actionLogo" />
              </td>
            </tr>
            <tr>
              <td className="py-5 xr:pl-7.5 pl-3 font-OpenSansRegular text-black-50 text-ft14">
                John Doe
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Johndoe@gmail.com
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                09958693963
              </td>
              <td className="py-5 font-OpenSansRegular text-black-50 text-ft14">
                Communite.HomePage
              </td>
              <td className="py-5 ">
                <img src="/images/select-icon.png" alt="actionLogo" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default WhiteList;
