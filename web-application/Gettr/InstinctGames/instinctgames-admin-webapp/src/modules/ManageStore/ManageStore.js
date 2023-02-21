import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Row, column } from "simple-flexbox";
import Utils from "../../utility";
import onClickOutList from "react-onclickoutside";
import PaginationFooter from "../../common/components/paginationFooter";
import DropDown from "../../common/DropDown";
import NoRecordPlaceholderComponent from "../../common/components/NoRecordPlaceholderComponent";
import useWindowDimensions from "../../common/windowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../managers/history";
import { RecentCollection } from "../../services";
const MainComponent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background: #f0f0f6 0% 0% no-repeat padding-box;
  align-items: center;
`;
const SubComponent = styled.div`
  ${"" /* display: flex; */}
   width: 96%;
  ${"" /* height: 850px; */}
  border-radius: 6px;
  opacity: 1;
  margin: 0px 30px 0px 30px;
  @media (min-width: 1350px) and (max-width: 1550px) {
    width: 95%;
  }
  @media (min-width: 1100px) and (max-width: 1349px) {
    width: 94%;
  }
  @media (min-width: 1025px) and (max-width: 1099px) {
    width: 93%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    padding: 0 23px;
  }
  @media (max-width: 767px) {
    margin: 0;
    width: 100%;
    padding: 0 16px;
  }
`;

const CollectionRow = styled.div`
  width: 96%;
  margin: 0px 0px 22px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1350px) and (max-width: 1550px) {
    width: 95%;
  }
  @media (min-width: 1100px) and (max-width: 1349px) {
    width: 94%;
  }
  @media (min-width: 1025px) and (max-width: 1099px) {
    width: 93%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    padding: 22px 23px 0;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    padding: 0 16px;
  }
`;

const Image = styled.img`
  width: 295px;
  // width: 100%;
  height: 160px;
  background: #d3d3d3 0% 0% no-repeat padding-box;
  border-radius: 6px 6px 0px 0px;
  opacity: 1;
  @media (min-width: 1025px) and (max-width: 1240px) {
    width: 223px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 200px;
  }
`;

const Text = styled.div`
  text-align: left;
  font: normal normal 600 18px/22px Barlow;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
  align-self: center;
`;
const ImageIcon = styled.div`
  ${"" /* width: 275px; */}
  ${"" /* height: 291px; */}
  /* width: 100%;
  height: 100%; */
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 12px #00000014;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  opacity: 1;
`;
const CreateBtn = styled.button`
  width: 82px;
  height: 34px;
  background: #6874e8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  text-align: center;
  font: normal normal 14px/17px Barlow;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  border: none;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 0px 0px 18px;
  width: 278px;
  height: 34px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  @media (min-width: 1024px) and (max-width: 1028px) {
    margin: 0px 0px 0px 10px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 254px;
  }
  @media (max-width: 767px) {
    ${"" /* margin-top: 13px; */}
    width: 100%;
    height: 40px;
    margin-left: 0;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  border: none;
  text-align: left;
  font: normal normal 14px/17px Barlow;
  letter-spacing: 0px;
  color: #535877;
  outline: none;
  padding-left: 8px;
  // padding-bottom:3px;
  align-self: center;
  &:focus {
    border: none;
  }
`;
const SearchIcon = styled.img`
  margin-right: 0.625rem;
  width: 16px;
  height: 16px;
`;
const Paging = styled.div`
  margin: 32px 5px 32px 5px;
  font: normal normal medium 14px/17px Barlow;
  color: #797979;
  opacity: 1;
`;

const NavIcon = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 4px;
`;
const Cardbox = styled.div`
  /* display: flex;
  align-content: baseline;
  flex-wrap: wrap;
  padding: 0 10px; */
  display: flex;
  flex-flow: wrap;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 12px #0000000d;
  border: 1px solid #f0f0f0;
  justify-content:space-evenly;
  ${"" /* height: 100vh; */}
  @media(max-width:767px) {
    ${"" /* margin:0 16px; */}
  }
`;
const collMob = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cards = styled.div`
  display: flex;
`;

const ItemCount = styled.span`
  padding-right: 23px;
`;

export default function HomePageComponent(props) {
  const userData = useSelector((state) => state.wallet.userAddress);
  const { handleSearchCollection, setSortBy } = props;
  const handleSortBy = (e) => {
    setSortBy(e);
  };
  const propsData = props.data.filterCollection;
  // const [sortBy, setSortBy] = useState("Recently Added");
  const optionsType = ["Recently Added", "Recently Updated"];

  const { height, width } = useWindowDimensions();
  const handleClickWallet = () => {
    history.push("/wallet-connect");
  };
  // useEffect(() => {
  //   getCollection();
  // }, []);
  // const getCollection = async () => {
  //   let [error, collectionRes] = await RecentCollection.getrecentCollections();
  //   if (error || !collectionRes) return;
  // };

  return (
    <MainComponent>
      <CollectionRow>
        <div className="row flex-d-c resmob">
          <div className="display-flex p-b-16-mob ">
            <Text>Collections</Text>
            {width <= 767 && (
              <DropDown
                handleInput={handleSortBy}
                options={optionsType}
                name={"Sort by"}
                icon={<SearchIcon src="/images/sorting.svg" />}
              />
            )}
          </div>
          <Search>
            <SearchInput
              placeholder="Search"
              size="2em"
              onChange={(e) =>
                handleSearchCollection(e.target.value.substr(0, 20))
              }
            />
            <SearchIcon src="/images/search (1).svg" />
          </Search>
        </div>
        <div className="row resmob">
          <CreateBtn
            onClick={
              !userData?.userAddress
                ? handleClickWallet
                : () => props.navigateToTab("createCollection")
            }
          >
            Create
          </CreateBtn>
          {width > 767 && (
            <DropDown
              handleInput={handleSortBy}
              options={optionsType}
              name={"Sort by"}
              icon={<SearchIcon src="/images/sorting.svg" />}
            />
          )}
        </div>
      </CollectionRow>
      <SubComponent>
        <Cardbox>
          {propsData && propsData.length > 0 ? (
            propsData.map((index) => (
              <Cards
                className="m-21 display-flex  a-i position-r"
                item
                xs
                key={index}
                onClick={() =>
                  props.navigateToTab({
                    comp: "collectionDetails",
                    id: index._id,
                  })
                }
              >
                <div className="position-ab m-b">
                  <img
                    src={index && index.imageUrl}
                    className="h-68 w-68 br-50 "
                  />
                </div>
                <ImageIcon>
                  <Image
                    src={index && index.coverUrl ? index.coverUrl : "/goku.svg"}
                  />
                  {/* <img src="goku.jpg"/> */}
                  <div className="m-19">
                    <p className="f-w fc-151e58 fs-16 m-b-5">
                      {index && index.name}
                    </p>
                    <div className="display-flex w-150 align-c">
                      <ItemCount>
                        {index && index.nftCount}{" "}
                        {index.nftCount > 1 ? `Items` : `Item`}
                      </ItemCount>
                      <div>
                        {" "}
                        <img src="/images/eyeIcon.svg" className="p-r-10" />
                        <span>
                          {index && index.viewCount}
                          {/* {index.addedOn} */}
                        </span>
                      </div>
                    </div>
                  </div>
                </ImageIcon>
              </Cards>
            ))
          ) : (
            <NoRecordPlaceholderComponent text="No collection found"/>
          )}
        </Cardbox>
        <PaginationFooter
          state={props.data}
          list={props.data?.filterCollection || []}
          onClickPreviousPage={props.onClickPreviousPage}
          onClickNextPage={props.onClickNextPage}
          // onClickNextPage={'dcmkf;smkd'}
        />
      </SubComponent>
      {/* <Row className="pageRow">
        <Paging>Page</Paging>
        <NavIcon src="/images/back (1).svg" />
        <Paging>1</Paging>
        <NavIcon src="/images/next.svg" />
      </Row> */}
    </MainComponent>
  );
}
