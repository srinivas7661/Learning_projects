import React from "react";
import { useHistory } from "react-router-dom";

const HomePage = (props) => {
  const { projectList } = props;
  let history = useHistory();
  const redirect = (item) => {
    history.push({
      pathname: `/projectDetails/${item.id}`,
      state: { details: item },
    });
  };

  return (
    <div>
      <div className="earn-bg bg-cover w-full h-130 lg:-mt-15 -mt-1 flex justify-center items-end">
        <div className="xl:w-312.5 w-95per flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="lg:w-1/2 md:w-70per w-90per">
            <h1 className="text-white font-PoppinsSemiBold text-ft50 sm:text-ft46 xs:text-ft32">
              Earn as you Learn
            </h1>
            <p className="text-white font-PoppinsRegular text-ft15">
              Lorem ipsum dolor sit amet, consectetur adipiscing ibulum gravida
              semper enim vel fermentum.
            </p>
            <div className="lg:mt-12 mt-8 sm:flex sm:flex-col sm:items-center xs:flex xs:flex-col xs:items-center xs:mt-3per sm:mt-3per">
              <button className="bg-violet-100 text-white text-ft18 font-PoppinsBold rounded-xl w-50 xs:w-75 sm:w-75 lg:h-13 h-10.5 opacity-100">
                Connect Wallet
              </button>
              <button className="bg-blue-50 text-violet-100 md:ml-5per lg:ml-5per text-ft18 font-PoppinsBold rounded-xl w-50 xs:mt-3per sm:mt-3per xs:w-75 sm:w-75 lg:h-13 h-10.5">
                How it works
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-7 lg:mt-0 flex justify-end">
            <img
              className="md:h-65 md:w-90 sm:h-65 sm:w-90 xs:h-65 xs:w-90"
              src="/images/hand-phone.svg"
              alt="/"
            />
          </div>
        </div>
      </div>
      <div className="bg-blue-100 pb-5per">
        <div className="xl:w-312.5 w-95per ml-auto mr-auto">
          <div className="flex mt-7.5 mb-5  justify-between ">
            <h1 className="text-black font-black text-ft20 font-PoppinsSemiBold">
              Choose a Project to Start Earning
            </h1>
            <div className="xs:hidden sm:hidden flex">
              <img
                className="w-9.5 h-9.5"
                src="/images/search-icon.png"
                alt="/"
              />
              <img
                className="w-9.5 h-9.5"
                src="/images/sort-icon.png"
                alt="/"
              />
            </div>
          </div>
          <div className=" grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-x-12.5">
            {projectList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white cursor-pointer h-57.5 w-80 xs:w-75
                   xl:w-92.5 rounded-xl shadow-sm sm:mr-7 md:mr-7 lg:mr-7 mb-7"
                  onClick={() => redirect(item)}
                >
                  <div className="h-65per border-b-2 border-grey-100 flex justify-center items-center">
                    <img className="w-15 h-15" src={item.image} alt="/" />
                  </div>
                  <div className="flex justify-between mt-1 mx-3">
                    <h1 className="w-40per font-semibold text-ft16">
                      {item.projectName}
                    </h1>
                    <div>
                      <p className="font-semibold">
                        Earn
                        <span className=" text-violet-50 text-ft24">
                          {item.price}
                        </span>
                        <span className="text-grey-150 text-ft0">
                          {item.type}
                        </span>
                      </p>
                      <p className="text-grey-150 text-ft0">
                        + Nft Certificate
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
