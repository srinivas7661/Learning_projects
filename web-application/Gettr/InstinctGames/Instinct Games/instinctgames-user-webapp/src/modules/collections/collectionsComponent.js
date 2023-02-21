import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collectionsTab } from "../../constants";

function CollectionsComponent(props) {
  const { activeTab, changeActiveTab, collectionsList } = props;
  function shorten(b, amountL = 40, amountR = 4, stars = 3) {
    return `${b.slice(0, amountL)}${".".repeat(stars)}${b.slice(
      b.length - 3,
      b.length
    )}`;
  }
  return (
    <div className="w-full flex justify-center bg-main min-h-screen bg-cover">
      {/* Collections */}
      <div className="mt-14 w-efx mobile:mt-10">
        <h1 className="text-white text-ft18 font-EurostileExtd mb-11 font-black mobile:text-ft22 mobile:mb-1">
          COLLECTIONS
        </h1>
        {/* View Tab */}
        <ul className="list-none mb-7.5 flex gap-20.5 mobile:gap-2.25 tablet:gap-5">
          {collectionsTab?.map((tabs, index) => {
            return (
              <div
                key={tabs}
                onClick={() => {
                  changeActiveTab(index);
                }}
                className="flex flex-col cursor-pointer"
              >
                <li
                  className={`text-ft16 font-bold font-Eurostile mobile:text-ft4 mobile:pr-2.25 ${
                    activeTab === tabs ? "text-blue-80" : "text-white"
                  }`}
                >
                  {tabs}
                </li>
                {activeTab === tabs && (
                  <hr className="w-3 border-t-3 rounded-full self-center text-blue-80" />
                )}
              </div>
            );
          })}
        </ul>
        {/* Games List */}
        <div className="grid grid-cols-2 lg:grid-cols-3 mb-43.75 gap-10 mobile:gap-3 mobile:flex mobile:flex-wrap">
          {collectionsList.map((game) => (
            <Link key={game._id} to={{pathname:`/collectionDetails/${game._id}/${game.collectionAddress}`}}>
              <div className="w-full max-w-627 group border border-transparent transition hover:transform duration-100 hover:-translate-y-2 rounded-lg-1 hover:border-current hover:border-grey-5 hover:shadow-card cursor-pointer mobile:w-39.25 mobile:mr-3">
                <img
                  id="imageBox"
                  className="h-50 lg:h-85 object-cover rounded-t-lg-1 w-full mobile:w-39.5 mobile:h-25.55"
                  src={game.imageUrl}
                  alt={game.name.toLowerCase()} 
                />
                <div className="bg-black-80 overflow-hidden border pt-3.25 pl-5.5 pr-4.75 pb-7 h-34  border-primary-50 group-hover:border-0 group-hover:border-t group-hover:border-grey-5 rounded-b-lg-1 mobile:h-10.25 mobile:pl-2 mobile:pt-1">
                  <h1 className="md:text-ft14 break-words xl:text-ft15 3xl:text-ft17 mb-2 text-white font-black mobile:text-ft36 mobile:mb-0">
                    {game.name.toUpperCase()}
                  </h1>
                  <AutoScroll>
                    <p className={`md:text-ft4 xl:text-ft6 3xl:text-ft12 text-grey-600 mobile:text-ft37 mobile:w-34 ${game.description?.length > 100 ? "h-13" : ""}`}>
                      {game.description}
                      {/* {shorten( "Sacred Tails is a MMORPG giving endless possibilities of playstyles tailored to the player, chat, trade, explore and battle. Huge E-Sports PVP tournaments funded by our smart tokenomics and seasonal based rewards dependant on your rankings. Guild Vs Guild, Guild Housing and much more.Players will be able to upgrade or breed their NFTs, compete in tournaments & earn rewards, access exclusive content and benefits, and conquer their way through the all-immersive Sacred Tails Metaverse.")} */}

                    </p>
                  </AutoScroll>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const AutoScroll = ({ children }) => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const { current: container } = containerRef;

    if (isHovering) {
      const intervalId = setInterval(() => {
        container.scrollTop += 1;
      }, 50);

      return () => clearInterval(intervalId);
    }
  }, [isHovering, children]);

  return (
    <div
      ref={containerRef}
      className="overflow-auto h-13"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
    </div>
  );
};

export default CollectionsComponent;
