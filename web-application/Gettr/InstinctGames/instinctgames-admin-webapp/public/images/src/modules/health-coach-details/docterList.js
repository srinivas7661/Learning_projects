import React from "react";
import styled from "styled-components";
import { Popover } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { Row } from "simple-flexbox";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const Layerp = styled.div`
  display:flex;`;

const Path = styled.div`
 margin-left:210px;
`;
const Layer = styled.div`
margin-left:8px;`;
const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1025px)  { 
    flex-direction:row;
    margin:0;
  }
`;
const TopBar = styled.div`
  padding-top: 10px;
  display: flex;
  width: 250px;
  height: auto;
  flex-direction: column;
  background-color: #fffaf9;
  @media (max-width: 1025px)  { 
    flex-direction:column;
    width: 32%;
    margin:0;
  }
`;
const BottomBar = styled.div`
  display: flex;
  width: 250px;
  height: px;
  flex-direction: column;
  background-color: #FFF4F3;
  justify-content: center;
  padding-left: 30px;
  @media (max-device-width: 1025px) { 
    flex-direction:column;
    justify-content:center;
    width:34%;
  }
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 30px;
  padding: 10px;
  color: var(--unnamed-color-5c4b75);
  text-align: center;
  font: normal normal bold 16px/22px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
`;


const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LightText = styled.div`
  font: bold 14px Nunito;
  color: #5c4b75;
  padding-top: 7%;
  color: var(--unnamed-color-7d84c0);
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #7d84c0;
  opacity: 1;
  padding-bottom: 10px;
`;
const Bio = styled.div`
  color: var(--unnamed-color-5c4b75);
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
  padding-right: 15px;
`;

const Id = styled.div`
  color: var(--unnamed-color-acacac);
  text-align: center;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #acacac;
  opacity: 1;
  padding-top: 10px;
`;
const BoldText = styled.div`
  font: bold 14px Nunito;

  color: var(--unnamed-color-5c4b75);
  text-align: left;
  font: normal normal bold 16px/22px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
`;
const Stardiv = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 25px;
`;
const Star = styled.div`
  margin-left: 10px;
`;
const ProfileImage = styled.div`
  border-radius: 50%;
  background-color: lightblue;
  height: 100px;
  width: 100px;
  align-self: center;
`;
const Header = styled.div`
  padding-top: 30px;
  padding-left: 30px;
`;
const PopoverText = styled.p`
text-align: left;
font: normal normal normal 15px/20px Nunito;
letter-spacing: 0px;
color: #3E344B;
opacity: 1;
`;

const Logo = styled.img`
  height: 100px;
`;

function DoctorList(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (

    <SideBar>

      <TopBar>

        <Layerp>
          <Layer>
            <Link className="link" to='/health-coach'><img src="/images/Layer 2.svg" /></Link>
          </Layer>
          <Path>
            <MoreHorizIcon onClick={(event) => handleClick(event)} className="cursor-pointer" />
          </Path>
          <Popover
            className="profile-popover-health "
            id={id}
            open={open}

            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <Row className="popup margin-top-10-px ">
              <PopoverText>Deactivate User</PopoverText>
            </Row>
            <Row className="popup margin-top-10-px">
              <PopoverText>Reset Password</PopoverText>
            </Row>
            <Row className="popup margin-top-10-px">
              <PopoverText>Export Data</PopoverText>
            </Row>
          </Popover>
        </Layerp>
        <ProfileImage />
        <UserName>
          <BoldText>Dr.John Doe</BoldText>
          <Id>BHC0023</Id>
        </UserName>

        <Stardiv>
          <Star>
            <img src="images/star.svg" />
          </Star>
          <Star>
            <img src="images/star.svg" />
          </Star>
          <Star>
            <img src="images/star.svg" />
          </Star>
          <Star>
            <img src="images/star.svg" />
          </Star>
          <Star>
            <img src="images/star.svg" />
          </Star>
        </Stardiv>

      </TopBar>

      <BottomBar>
        <LightText>Status</LightText>
        <BoldText>Active</BoldText>
        <LightText>Phone Number</LightText>
        <BoldText>+1 857 452 1254</BoldText>
        <LightText>Email</LightText>
        <BoldText>holly.higgins@gmail.com</BoldText>
        <LightText>Website</LightText>
        <BoldText>www.hollyfisherhiggins.com</BoldText>

      </BottomBar>
      <BottomBar>
        <LightText>Specialization</LightText>
        <BoldText>Wellness</BoldText>
        <LightText>Bio</LightText>
        <Bio>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you
          need to be sure there isn't anything embarrassing hidden in the
          middle of text.
        </Bio>
      </BottomBar>
    </SideBar>

  );
}
export default DoctorList;
