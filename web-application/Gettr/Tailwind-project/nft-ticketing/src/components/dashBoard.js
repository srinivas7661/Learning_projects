import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DashBoard = () => {
  const [isVenueDropDownVisible, setVenueDropDownVisible] = useState(false);
  const [selectedVenueIndex, setSelectedVenueIndex] = useState(null);
  const [venueList, setVenueList] = useState([
    {
      name: "Venue",
      value: "venue",
    },
    {
      name: "Online Event",
      value: "online",
    },
  ]);
  const [isStatusDropDownVisible, setStatusDropDownVisible] = useState(false);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(null);
  const [statusList, setStatusList] = useState([
    {
      name: "Recently",
      value: "recently",
    },
    {
      name: "Oldest",
      value: "old",
    },
  ]);
  const [isDurationDropDownVisible, setDurationDropDownVisible] =
    useState(false);
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(null);
  const [durationList, setDurationList] = useState([
    {
      name: "Monthly",
      value: "monthly",
    },
    {
      name: "Yearly",
      value: "yearly",
    },
    {
      name: "All Time",
      value: "all",
    },
  ]);
  return (
    <div className="px-12.5 xs:px-2 pb-13 bg-grey-200 min-h-screen ">
      <div className="2.5xl:flex pt-12.5 xs:pt-8 text-black-50 text-ft22 font-OpenSansSemiBold items-center justify-between">
        <h1>DashBoard</h1>

        <div className="tb:flex tb:w-145 w-full justify-between">
          <div className="relative mt-5pe 2.5xl:mt-0">
            <div
              className="flex tb:p-3.5 p-2.75 justify-between items-center rounded-xsm tb:w-42.5 w-37.5 h-11 bg-white text-ft14 text-black-50"
              onClick={(e) => {
                setVenueDropDownVisible(!isVenueDropDownVisible);
              }}
            >
              <span className="text-ft14">
                {selectedVenueIndex != null
                  ? venueList[selectedVenueIndex].name
                  : "Event Type"}
              </span>

              <img src="/images/arrow.png" className="w-2 h-1" />
            </div>
            {isVenueDropDownVisible ? (
              <div className="bg-white absolute z-10 tb:w-42.5 w-37.5 rounded-xsm text-ft14 mt-5pe tb:p-3.5 p-2.75">
                {venueList.map((item, index) => (
                  <div
                    key={item.value}
                    className="hover:bg-grey-50 tb:p-3.5 p-2.75"
                    onClick={() => {
                      setSelectedVenueIndex(index);
                      setVenueDropDownVisible(false);
                    }}
                  >
                    <span className="break-words">{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="relative mt-5pe 2.5xl:mt-0">
            <div
              className=" text-black-50 flex tb:p-3.5 p-2.75 justify-between items-center rounded-xsm tb:w-42.5 w-37.5 h-11 bg-white text-ft14"
              onClick={(e) => {
                setStatusDropDownVisible(!isStatusDropDownVisible);
              }}
            >
              <span className="text-ft14">
                {selectedStatusIndex != null
                  ? statusList[selectedStatusIndex].name
                  : "Published"}
              </span>

              <img src="/images/arrow.png" className="w-2 h-1" />
            </div>
            {isStatusDropDownVisible ? (
              <div className="bg-white z-10 absolute tb:w-42.5 w-37.5 rounded-xsm text-ft14 mt-5pe tb:p-3.5 p-2.75">
                {statusList.map((item, index) => (
                  <div
                    key={item.value}
                    className=" hover:bg-grey-50 tb:p-3.5 p-2.75"
                    onClick={() => {
                      setSelectedStatusIndex(index);
                      setStatusDropDownVisible(false);
                    }}
                  >
                    <span className="break-words">{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="relative mt-5pe 2.5xl:mt-0">
            <div
              className=" text-black-50 opacity-100 flex tb:p-3.5 p-2.75 justify-between items-center rounded-xsm tb:w-42.5 w-37.5 h-11 bg-white text-ft14"
              onClick={(e) => {
                setDurationDropDownVisible(!isDurationDropDownVisible);
              }}
            >
              <span className="text-ft14">
                {selectedDurationIndex != null
                  ? durationList[selectedDurationIndex].name
                  : "All Time"}
              </span>

              <img src="/images/arrow.png" className="w-2 h-1" />
            </div>
            {isDurationDropDownVisible ? (
              <div className="bg-white z-10 absolute tb:w-42.5 w-37.5 rounded-xsm text-ft14 mt-5pe tb:p-3.5 p-2.75">
                {durationList.map((item, index) => (
                  <div
                    key={item.value}
                    className="hover:bg-grey-50 tb:p-3.5 p-2.75"
                    onClick={() => {
                      setSelectedDurationIndex(index);
                      setDurationDropDownVisible(false);
                    }}
                  >
                    <span className="break-words">{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between flex-wrap items-centerxl:justify-center 2xl:justify-center mt-10">
        <div className="flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col flex-wrap items-center py-11 px-5 md:px-1 2xl:px-1 mt-5 mr-7 w-full max-w-115 min-w-60 rounded-sm bg-white">
          <img
            src="/images/revenue-icon.png"
            alt="revenueIcon"
            className="h-17.5 w-17.5 2xl:mb-2 xl:mb-2"
          />
          <div className="flex flex-col ml-7.5 md:ml-0">
            <h1 className="text-black-50 text-ft18 font-OpenSansRegular mb-1.5">
              Revenue
            </h1>
            <h1 className="text-ft24 text-blue-100 font-OpenSansSemiBold">
              $400,642
            </h1>
          </div>
        </div>
        <div className="flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col flex-wrap items-center py-11 px-5 md:px-1 2xl:px-1 mt-5 mr-7 w-full max-w-115 min-w-60 rounded-sm bg-white">
          <img
            src="/images/users-icon.png"
            alt="revenueIcon"
            className="h-17.5 w-20 2xl:mb-2 xl:mb-2"
          />
          <div className="flex flex-col ml-7.5">
            <h1 className="text-black-50 text-ft18 font-OpenSansRegular mb-1.5">
              Total Attendees
            </h1>
            <h1 className="text-ft24 text-black-50 font-OpenSansSemiBold">
              2,000
            </h1>
          </div>
        </div>
        <div className="flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col flex-wrap items-center py-11 px-5 md:px-1 2xl:px-1 mt-5 w-full mr-7 3.5xl:mr-0 max-w-115 min-w-60 rounded-sm bg-white">
          <img
            src="/images/ticket-icon.png"
            alt="revenueIcon"
            className="h-17.5 w-20 2xl:mb-2 xl:mb-2"
          />
          <div className="flex flex-col ml-7.5">
            <h1 className="text-black-50 text-ft18 font-OpenSansRegular mb-1.5">
              Ticket Sold
            </h1>
            <h1 className="text-ft24 text-black-50 font-OpenSansSemiBold">
              2,023
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-12.5 flex flex-col 4xl:flex-row">
        <div className="4xl:w-1/2 4xl:mr-2.5">
          <h1 className="font-OpenSansSemiBold text-ft18 text-black-50">
            Splits per contributors
          </h1>
          <div className="mt-10 tb:flex mbl:h-148 items-center bg-white min-w-full rounded-sm shadow-sm">
            <Chart />
            <div className="mbl:flex mbl:flex-col mbl:items-center">
              <div>
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 bg-blue-100 rounded-xsm"></div>
                  <h1 className="text-grey-150 font-OpenSansRegular text-ft10">
                    Organizer
                  </h1>
                </div>
                <div className="mt-2.5">
                  <h1 className="text-ft16 font-OpenSansSemiBold text-black-50">
                    $200,321
                  </h1>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mt-5">
                  <div className="w-2.5 h-2.5 bg-grey-150 rounded-xsm"></div>
                  <h1 className="text-grey-150 font-OpenSansRegular text-ft10">
                    Artist
                  </h1>
                </div>
                <div className="mt-2.5">
                  <h1 className="text-ft16 font-OpenSansSemiBold text-black-50">
                    $120,192
                  </h1>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mt-5">
                  <div className="w-2.5 h-2.5 bg-grey-75 rounded-xsm"></div>
                  <h1 className="text-grey-150 font-OpenSansRegular text-ft10">
                    Promoter
                  </h1>
                </div>
                <div className="mt-2.5">
                  <h1 className="text-ft16 font-OpenSansSemiBold text-black-50">
                    $80,092
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="4xl:w-1/2 mbl:mt-7.5pe">
          <h1 className="font-OpenSansSemiBold text-ft18 text-black-50">
            Sales by Event
          </h1>
          <div className="mt-10 bg-white h-100 rounded-sm xs:overflow-x-scroll">
            <table className="table min-w-full whitespace-nowrap">
              <thead className="border-b border-grey-50 bg-white sticky top-0 py-3pe">
                <tr className="flex">
                  <th className="flex items-center pl-3pe font-OpenSansSemiBold text-black-50 w-40pe">
                    Event Name
                    <img
                      src="/images/range-icon.png"
                      alt="rangeIcon"
                      className="w-2.25 h-3.25 ml-2.5"
                    />
                  </th>
                  <th className="flex items-center font-OpenSansSemiBold text-black-50 w-40pe">
                    Ticket Sold
                    <img
                      src="/images/range-icon.png"
                      alt="rangeIcon"
                      className="w-2.25 h-3.25 ml-2.5"
                    />
                  </th>
                  <th className="flex items-center font-OpenSansSemiBold text-black-50 w-40pe">
                    Revenue
                    <img
                      src="/images/range-icon.png"
                      alt="rangeIcon"
                      className="w-2.25 h-3.25 ml-2.5"
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="items-center">
                <tr className="border-b border-grey-50 flex">
                  <td className="w-40pe py-5 pr-5 pl-3pe font-OpenSansRegular text-black-50 text-ft14 truncate">
                    Hard Summer Music Festival
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    250/500
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    $200,321
                  </td>
                </tr>
                <tr className="border-b border-grey-50 flex">
                  <td className="w-40pe pl-3pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14 truncate">
                    When we were you
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    370/500
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    $120,192
                  </td>
                </tr>
                <tr className="border-b border-grey-50 flex">
                  <td className="w-40pe pl-3pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14 truncate">
                    Buku 2022
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    400/500
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    $80,092
                  </td>
                </tr>
                <tr className="border-b border-grey-50 flex">
                  <td className="w-40pe pl-3pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14 truncate">
                    Coachella 2022
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    189/500
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    $20,095
                  </td>
                </tr>
                <tr className="border-b border-grey-50 flex">
                  <td className="w-40pe pl-3pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14 truncate">
                    Lovers and Friends
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    50/500
                  </td>
                  <td className="w-40pe py-5 pr-5 font-OpenSansRegular text-black-50 text-ft14">
                    $10,244
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    count: 120192,
    contributors: "Artist",
  },
  {
    count: 80092,
    contributors: "Promoter",
  },
  {
    count: 200321,
    contributors: "Organizer",
  },
];

function Chart() {
  return (
    <ResponsiveContainer className="w-100 h-100 xs:w-75 xs:h-75 xs:ml-auto xs:mr-auto">
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={90}
          endAngle={450}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Artist" fill="#949CAE" />
          <Cell name="Promoter" fill="#525272" />
          <Cell name="Organizer" fill="#395FF1" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DashBoard;
