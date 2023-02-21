import React,{useEffect} from "react";
import HeaderComponent from "../common/header";
import FooterComponent from "../common/footer";

const About = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <HeaderComponent />
      <div className="bg-main bg-cover text-white p-tix">
        <div className="polygon-token bg-black-60 mx-auto relative xl:p-10 tb:p-6 p-4">
          <div className="xl:text-ft20 text-ft4 font-EurostileBold text-center">
            Revolutionising the gaming
          </div>
          <div className="font-EurostileExtended text-center 2xl:text-ft21 lg:text-ft19 text-ft12 font-black text-blue-80 mb-8">
            METAVERSE MARKETPLACE
          </div>
          <div className="w-full xl:px-12 lg:px-10 tb:px-6 px-4 pb-10 mob:h-80vh mob:overflow-y-scroll">
            <div className="font-EurostileMedium text-justify xl:text-ft35 text-ft0">
              <img
                alt="logo"
                src="/images/logo-icon.svg"
                className="ml-eex mb-fff text-justify w-1/4 min-w-153 float-right hidden tb:block"
              ></img>
              Hoardable was created to provide our community members with unique
              access to some of the most innovative games before they are
              released to the general market, allowing members to obtain the
              finest games and add-ons at the best price. This also gives
              developers a one stop shop to spread awareness and build. This
              will be accomplished by our stringent security measures, creating
              a safe and positive environment where developers can get the
              financial backing they need whilst giving investors a safe space
              with vested development budgets being released dependant on
              roadmap checkpoints achieved. At this time, projects will be
              scarce, providing our ecosystem and its partners priority featured
              status. Participating in Hoardable offers allows members to get in
              early before the game moves to the general market, where supply
              and demand reign supreme and prices skyrocket.
              <br />
              <br />
              The continued growth of Hoardable as a fully operating NFT
              incubator sheds the constraints that have impeded others from
              becoming more than simply an NFT marketplace, putting us on the
              path to become what we have always aimed to be: a full-fledged
              gaming ecosystem. Hoardable will become the primary decentralized
              gaming exchange and incubation sector with the first and foremost
              launch of our flagship partner project, Sacred Tails, and its
              Initial NFT Offering on our platform.
              <br />
              <br />
              The future of Hoardable is the incorporation of Metaverse
              technology. We seek to build a Hoardable metaverse global lobby,
              featuring the hottest projects. Stroll through actual storefronts,
              browsing goods, and meeting face to face with your friends and
              rivals. A portal to directly link into the many different
              iterations of the metaverse, a social hub built for the new world
              we are fast approaching. Chat, trade, barter, Game, this is the
              true vision of Hoardable.
            </div>
            <div className="tb:hidden">
              <img
                alt="logo"
                src="/images/logo-icon.svg"
                className="my-fff w-full"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default About;
