import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DropDown from "../../common/DropDown";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import SecondDialog from "@material-ui/core/Dialog";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Row, Column } from "simple-flexbox";
import NoRecordPlaceholderComponent from "../../common/components/NoRecordPlaceholderComponent";
import { connect } from "react-redux";
import {
  credsConstants,
  currencyTypes,
  stringConstants,
} from "../../constants";

const SearchIcon = styled.img`
  width: 14px;
  height: 14px;
`;
const Image = styled.img`
  width: 285px;
  height: 315px;
  border-radius: 16px;
`;

function Collections(props) {
  const [nft, setNft] = useState(props.particularUserData?.nfts || "");
  const handleSearchCollection = (param) => {
    const data = props.particularUserData?.nfts || "";
    const filterData = data.filter((item, i) => {
      return item.name.toLowerCase().indexOf(param.toLowerCase()) !== -1;
    });
    if (param.length > 0) {
      setNft(filterData);
    } else {
      setNft(data);
    }
  };

  const filterType = props.particularUserData?.nfts?.map(({ nftType }) => {
    return nftType;
  });
  const handleType = (type) => {
    const data = props.particularUserData?.nfts?.filter(
      (item) => item.nftType === type
    );
    setNft(data);
  };

  const handleDeleteNft = async (data) => {
    await props.deleteNFT(data);
    setNft(nft);
  };
  const [pricingOrder, setPricingOrder] = useState(null);

  const [sortBy, setSortBy] = useState(null);

  const optionsType = [
    stringConstants.RECENTLY_ADDED,
    stringConstants.RECENTLY_UPDATED,
  ];
  const priceRange = [stringConstants.LOW_TO_HIGH, stringConstants.HIGH_TO_LOW];
  // const menuItem = ["Delete", "Move to Collection"];

  //TODO WE NEED TO MOVE SORTING FROM BACKEND
  useEffect(() => {
    setPricingOrder(null);
    if (pricingOrder === stringConstants.LOW_TO_HIGH) {
      const data = nft?.sort((a, b) => a?.saleData?.price - b?.saleData?.price);
      setNft(data);
    } else if (pricingOrder === stringConstants.HIGH_TO_LOW) {
      const data = nft?.sort((a, b) => b?.saleData?.price - a?.saleData?.price);
      setNft(data);
    }
  }, [pricingOrder]);

  useEffect(() => {
    setSortBy(null);
    if (sortBy === stringConstants.RECENTLY_ADDED) {
      const data = nft.sort(
        (a, b) => parseFloat(b.addedOn) - parseFloat(a.addedOn)
      );
      setNft(data);
    }
  }, [sortBy]);

  useEffect(() => {
    setNft(props.particularUserData?.nfts);
  }, [props.particularUserData?.nfts]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  return (
    <div className="p-t-100 p-r-79 p-b-67 p-l-71 bg-F0F0F6 padding-tab-table p-l-r-16 p-mob">
      <div className="row p-b-20 m-t-16-mob">
        <button
          type="button"
          className="border-none"
          onClick={() => props.navigateToTab("collectionList")}
        >
          <img src="/back.svg" className="width-25 m-b-20" />
        </button>
        <span className="p-l-10">Collections</span>
      </div>

      {/* main logo */}
      <img
        src={props.particularUserData?.coverUrl}
        className="w-100-per h-288"
      />

      <div className="bg-white p-t-20 p-b-22 p-r-10 p-l-10 h-max p-l-25-tab">
        <img src={props.particularUserData?.imageUrl} className="img-circle" />

        {/* right side button */}

        <button
          className="edit-btn"
          onClick={() =>
            props.navigateToTab({
              comp: "editCollection",
              id: props.particularUserData?._id,
            })
          }
        >
          Edit
        </button>

        {/* midside text centered */}
        <div className="m-r-auto m-l-auto w-400 text-align w-100per">
          <p className="c-p fs-16 f-w-b">{props.particularUserData?.name}</p>
          <p className="m-t-25">{props.particularUserData?.description}</p>
        </div>

        {/* dropdown section */}

        <div className="display-flex justify-s-b flex-direction-column">
          <div className="heading-container display-flex flex-d-c-mob">
            <div className=" coll-search br-4 bg-EFF0F4 m-b-r-l-mob w-100-per-Mob">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) =>
                  handleSearchCollection(e.target.value.substr(0, 20))
                }
                className="coll-search-input outline-none border-none"
              />
              <img src="/search.svg" className="m-r-8 m-t-4" />
            </div>

            <DropDown
              options={filterType || []}
              color={"#EFF0F4"}
              name={"Type"}
              width={"139px"}
              handleInput={handleType}
              customMargin={true}
            />

            <DropDown
              handleInput={setPricingOrder}
              options={priceRange}
              color={"#EFF0F4"}
              name={"Price Range"}
              customMargin={true}
            />
          </div>
          <DropDown
            handleInput={setSortBy}
            options={optionsType}
            color={"#EFF0F4"}
            name={"Sort by"}
            icon={<SearchIcon src="/images/sorting.svg" />}
            customMargin={true}
          />
        </div>

        <div
          className="wrapper h-863 p-top-32 p-right-55 p-r-44 padding-30 grid-responsive "
          id="category_scroll"
        >
          <ul className="auto-grid">
            {nft && nft.length > 0 ? (
              nft.map((item) => {
                return (
                  !item?.isDeleted && (
                    <CommonCards
                      props={props}
                      item={item}
                      handleClick={handleClick}
                      handleClick1={handleClick1}
                      handleClose={handleClose}
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      handleDeleteNft={handleDeleteNft}
                    />
                  )
                );
              })
            ) : (
              <NoRecordPlaceholderComponent
                text={stringConstants.NO_COLLECTION_FOUND}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { currencies: state.currency };
};
export default connect(mapStateToProps)(Collections);

function CommonCards({
  item,
  handleClick,
  handleClose,
  handleClick1,
  id,
  open,
  anchorEl,
  handleDeleteNft,
  props,
}) {
  const [convertedData, setConvertedData] = React.useState(
    props.currencies?.priceBNBToUSD
  );

  React.useEffect(() => {
    if (item?.saleData?.currency === currencyTypes.BNB) {
      setConvertedData(item?.saleData?.price * props.currencies?.priceBNBToUSD);
    } else if (
      item?.saleData?.currency === currencyTypes.SACREDTALES
    ) {
      setConvertedData(
        item?.saleData?.price * props.currencies?.priceSacredToUSD
      );
    } else if (
      item?.saleData?.currency === currencyTypes.INSTINCTGAMES ||
      item?.saleData?.currency === currencyTypes.INSTINCT
    ) {
      setConvertedData(
        item?.saleData?.price * props.currencies?.priceInstinctToUSD
      );
    }
  }, [item?.saleData?.price]);

  return (
    <div className="card bg-white br-t-b-20 p-10 m-l-10 m-r-10 w-303 h-404">
      <Image src={item && item.cdnUrl} />

      <div className="display-flex a-i justify-s-b m-t-14">
        <p className=" color-6C2CA2 m-b-0">{item && item.name}</p>

        <div>
          <Button onClick={handleClick}>
            <img src="/menu.svg" />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            elevation={1}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography className="MuiPaper-elevation24-45">
              <div className="cursor-pointer p-8">
                <span
                  onClick={(handleClick1, () => handleDeleteNft(item?._id))}
                >
                  Delete
                </span>
              </div>
            </Typography>
          </Popover>
        </div>
      </div>
      <p className="color-241134 m-t-5">
        {item?.saleData && item?.saleData?.price}&nbsp;
        {item?.saleData?.currency} = $&nbsp;
        {convertedData ? convertedData?.toFixed(2) : 0}
      </p>
    </div>
  );
}
