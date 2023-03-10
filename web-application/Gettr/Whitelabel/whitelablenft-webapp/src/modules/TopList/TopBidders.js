import React, { useState, useEffect } from "react";
import { getTopCollections } from "../../services/sellAndPurchaseMicroService";
import style from "styled-components";
import dropdown from "../../assets/images/drop down.png";
import {
  LeaderBoardApi,
  LeaderBoardApi2,
  LeaderBoardApi3,
  LeaderBoardApi4,
  LeaderBoardApi5,
} from "../../constants/LeaderBoardApi";
import profileImage from "../../assets/images/NoProfile.svg";
import { Link } from "react-router-dom";
import Spinner from "../../common/components/Spinner";
import NoItem from "../../assets/images/Noitems.svg";
import { getTopBuyers } from "../../services/sellAndPurchaseMicroService";

// MUI select code
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled'
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled'
import PopperUnstyled from '@mui/base/PopperUnstyled'
import { styled } from '@mui/system'
import { makeStyles } from "@mui/material";
import { fetchPalletsColor } from "../../utility/global";
import { useSelector } from "react-redux";
import TopListShimmer from "./TopListShimmer";

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
}
const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
}
const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 118px;
  background: url(${dropdown});
  background-position: 95%;
  background-repeat: no-repeat;
  border: 1px solid #707070;
  border-radius: 6px;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: #000000;

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }
  `,
)
const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: poppins-medium;
  font-size: 14px;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 118px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid #707070;
  border-radius: 0.25em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;

  `,
)
const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.25em;
  cursor: pointer;
  font-family: poppins-medium;
  font-size: 14px;
  color: #000;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
)
const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`
const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  }

  return <SelectUnstyled {...props} ref={ref} components={components} />
})

const queryString = require("query-string");

const Container = style.div`
  display: flex;
  flex-direction: column;
  margin-left: 7%;
  margin-right: 7%;
  color: #191919;
  margin-top: 29px;
  @media only screen and (min-width:425px) and  (max-width:769px) {
    margin-left: 6%;
    margin-right: 6%;
  }
  @media only screen and (max-width:426px) {
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 52px;
    overflow-y: scroll;
  }
`;
const Header = style.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width:426px) {
    overflow: scroll;
    width: 557px;
  }
`;
const Title = style.h3`
  font-size: 20px;
  line-height:30px;
  font-family: 'poppins-bold';
  margin-bottom: 0px;
  @media screen and (max-width:426px){
    font-size: 18px;
    margin: auto 0;
  }
`;
const Select = style.select`
  width: 118px;
  height: 42px;
  padding: 11px 8px 11px 8px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #707070;
  background: #ffffff;
  border-radius: 6px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${dropdown});
  background-repeat: no-repeat;
  background-position: 90% center;
  color: #000000;
  font-family: 'poppins-medium';
`;
const Body = style.div`
  margin-top: 58px;
  margin-bottom: 16px;
  @media only screen and (min-width:425px) and  (max-width:769px) {
    margin-top: 39px;
  }
  @media only screen  and (max-width:769px) {
    margin-top: 22px;
  }
  @media only screen  and (max-width:426px) {
    overflow: scroll;
    width: 557px;
  }
`;
const Column = style.div`
  font-size: 16px;
  line-height:25px;
  font-family:'poppins-semibold';
  color:#191919;
`;
const Collection = style.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  margin-bottom: 42px;
  height: 68px;
  border: 1px solid #FCFCFC;
  border-radius: 13px;
  @media screen and (max-width:426px){
    overflow: scroll;
    width: 557px;
  }
`;
const Image = style.img`
  width: 42px;
  height: 42px;
  /* padding-left: 31px;
  padding-right: 14px; */
  border-radius: 22px;
  margin: auto 0;
`;
const NameColumn = style.div`
  display: flex;
  margin-left: 31px;
  align-items: center;
`;
const Name = style.p`
  font-size: 16px;
  font-weight: 500;
  margin: 24px 0 21px 14px;
`;
const VolumeColumn = style.div`
  width:100%;
`;
const Span = style.p`
  color: #366eef;
  font-size: 16px;
  line-height: 25px;
  font-family: poppins-medium;
  margin-bottom:0px;
`;
const Text = style.div`
  font-size: 16px;
  line-height: 25px;
  font-family: 'poppins-medium';
  color: #191919;
`;
const Volume = style.span`
  font-family: 'poppins';
  font-size: 16px;
  line-height: 25px;
  color: #818181;
`;
function TopBidders({loader}) {

  const appearance = useSelector(state => state.customize.appearance)

  const [topBuyers, setTopBuyers] = useState([]);
  const [buyerDuration, setBuyerDuration] = useState({
    duration: "all",
  });
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const buyerReqObj = queryString.stringify(buyerDuration);

    function fetchData() {
      setIsloading(true)
      setTopBuyers([])


      getTopBuyers(buyerReqObj).then((response) => {
        setTopBuyers(response);
        setIsloading(false);
      });


    }

    fetchData();

  }, [buyerDuration]);
  
  // useEffect(async() => {
  //   async function fetchData() {


  //   setIsloading(true)
  //   setTopBuyers([])

  //  await getTopBuyers(buyerReqObj).then((response) => setTopBuyers(response));
  //   setIsloading(false)


  // }, [buyerDuration,isloading]);

  const ChangeBuyerDuration = (e) => {
    setBuyerDuration({ ...buyerDuration, duration: e })
  }


  return (
    <Container className="leader-viewmore">
      <Header>
        <Title>Top Buyers</Title>
        <CustomSelect
          name="duration"
          onChange={(e) => ChangeBuyerDuration(e)}
          value={buyerDuration.duration}
          defaultValue="all"
        >
          <StyledOption value="all">All</StyledOption>
          <StyledOption value="weekly">Weekly</StyledOption>
          <StyledOption value="monthly">Monthly</StyledOption>
          <StyledOption value="yearly">Yearly</StyledOption>
        </CustomSelect>
      </Header>
      <Body className="container-fluid">
        <div className="row">
          <Column className="col" style={{ paddingLeft: "42px" }}>
            Name
          </Column>
          <Column className="col">Volume</Column>
          <Column className="col itembought">Items bought</Column>
        </div>
      </Body>
      { loader===false && topBuyers.map((curElem) => {
        const { img, name, volume, itemsbought, itemsSold, buyer } =
          curElem;
        var precise = volume.toPrecision(4);
        var result = parseFloat(precise);
        return (
          <div className="container-fluid">
            <Collection className="row">
              <NameColumn className="col">

                {buyer.photo == "" || !buyer.photo ? (
                  <Image src={profileImage} alt="pic" />


                ) : (
                  <Image src={typeof (buyer.photo) !== "object" ? buyer?.photo : buyer?.photo?.compressedURL} alt="pic" />

                )}

                {buyer.userName == "" ? (
                  <h2 className="seller-name" title={buyer.wallet_address}> <Link style={{ textDecoration: "null" }} to={"/user-profile/" + buyer._id}>{buyer.wallet_address.substring(0, 4)}...{buyer.wallet_address.slice(buyer.wallet_address.length - 4)}</Link></h2>

                ) : (
                  <h2 className="seller-name" title={buyer.userName}><Link style={{ textDecoration: "null" }} to={"/user-profile/" + buyer._id}>
                    {
                      buyer.hasOwnProperty('userName') ?
                        buyer.userName.length > 13 ? (
                          buyer.userName.substring(0, 8) + "..."
                        ) : (
                          buyer.userName
                        ) : null
                    }
                  </Link>
                  </h2>

                )}



              </NameColumn>
              <VolumeColumn className="col">
                <Span style={{color: `${fetchPalletsColor(appearance?.colorPalette)}`}}>{result} ETH
                  {/* <Volume>({"$"})</Volume>  */}
                </Span>

              </VolumeColumn>
              <Text className="col">{itemsSold}</Text>
            </Collection>
          </div>
        );
      })}
      {/* <div className="spinnerloader"> */}
        {isloading || loader ? <TopListShimmer /> :
          (topBuyers.length === 0 && (
            <div className="Noitemdiv">
              <img style={{ filter: "opacity(0.4) drop-shadow(0 0 0 grey)" }} src={NoItem} />
              <p className="textitem">No items available</p>
            </div>
          ))}
      {/* </div> */}
      {/* {topBuyers.length === 0 && (

        <div className="spinnerloader">{<Spinner />}


        </div>)} */}
    </Container>
  );
}

export default TopBidders;