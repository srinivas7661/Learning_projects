import React from "react";
import styled from "styled-components";
import { Row, Column } from "simple-flexbox";
import UploadFile from "./uploadFile";
import DIV from "./ToogleDiv";

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  background: #2a0e5d 0% 0% no-repeat padding-box;
  justify-content: center;
  height: 100%;
`;
const Heading = styled.div`
  width: 100%;
  height: 42px;

  text-align: left;
  font: normal normal 600 22px/70px Barlow;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;
const SubHeading = styled.div`
  width: 100%;
  margin: 40px 0px 30px 0px;
  display: flex;
  /* align-items: center; */
  text-align: left;
  font: normal normal medium 16px/70px Barlow;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  border:none;
  type: text;
  background: #564C7D 0% 0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
::placeholder{
  
  text-align: left;
  font: normal normal medium 16px/70px Barlow;
  letter-spacing: 0px;
  color: #C3C3C3;
  opacity: 1;
}
  outline: none;
  margin-top:-10px
  padding: 10px;
  &:focus {
    border: none;
  }
`;
const ImageDiv = styled.div`
  width: 190px;
  height: 209px;
  background: #afafaf00 0% 0% no-repeat padding-box;
  border: 2px dashed #ffffff;
  border-radius: 12px;
  opacity: 1;
`;
const ImgUpload = styled.div`
  text-align: center;
  font: normal normal normal 14px/70px Barlow;
  letter-spacing: 0px;
  color: #d6d6d6;
  opacity: 1;
`;

const Img = styled.img`
  margin-top: 50px;
  margin-left: 65px;
  width: 54px;
  height: 47px;
`;
const Span = styled.span``;

const Button = styled.button`
  background: transparent linear-gradient(270deg, #00bfff 0%, #51c3f500 100%) 0%
    0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 0.3;
  display: flex;
  width: 218px;
  height: 74px;
  justify-content: center;
  align-items: center;
  letter-spacing: 0px;
  margin-top: 50px;
  opacity: 0.3;
  font: normal normal medium 40px Barlow;
  letter-spacing: 0px;
  color: white;
`;

export default function HomePageComponent(props) {

  const [statData , setStatData] = React.useState([
    {
      type : "",
       value : "" ,
       color : "",
      },
  
      {
        type : "boy",
         value : "hey", 
         color : "green",
        }
      ])

  const addItem = () => {
    console.log("clicked");
    let tempData = statData;
    tempData.push({
      type: "",
      value : "",
      color : "",})
  console.log(tempData);
  setStatData(tempData)
}
  
  const removeItem = (index) => {
  console.log("minus ")
    let tempData = statData;
    tempData.splice(index, 1);
    console.log(tempData)
    setStatData(tempData)
  }
  


   const [status,setStatus]=React.useState(false)
  return (
    <MainComponent>
      <div className="subMain">
        <Heading>Create Item</Heading>

        <div
          style={{
            color: "white",
            fontSize: 16,
            margin: "35px 0 23px 0",
            opacity: "0.9",
          }}
        >
          Upload File
        </div>
        <UploadFile />
        <SubHeading>Name*</SubHeading>
        <SearchInput placeholder="Name" />
        <SubHeading>Price*</SubHeading>
        <div className="priceDiv">
          <input className="in" placeholder="Enter Price"></input>
          <select className="slct">
            <option>BNB</option>
            <option>EURO</option>
            <option>$</option>
            <option>ETHER</option>
          </select>
        </div>

        <SubHeading>External Link</SubHeading>
        <SearchInput placeholder="Https://yourlink.com" />
        <SubHeading>Description</SubHeading>
        <SearchInput placeholder="Details about this item" />
        <SubHeading>Collection</SubHeading>
        <div className="opDiv">
          <select className="op">
            <option>Add to Collection</option>
            <option>hello</option>
            <option>hey</option>
            <option>bye</option>
          </select>
        </div>
        <Row className="row">
          <Column className="colmn">
            <SubHeading className="wi">Type</SubHeading>

            <div className="opDivC">
              <select className="op">
                <option>Character</option>
                <option>hello</option>
                <option>hey</option>
                <option>bye</option>
              </select>
            </div>
          </Column>
        </Row>
        <SubHeading>
          Stats
          <span >
            <label class="switch">
              <input onClick={()=>setStatus(!status)} type="checkbox"></input>
              <span class="slider round"></span>
            </label>
          </span>
        </SubHeading>
{/* 
        <div>
          <div className="toogleMainDiv">
            <div>
              <div className="toogleDiv">
                <input className="toogleInput" placeholder="Type"></input>
              </div>
            </div>
            <div>
              <div className="toogleDiv" style={{ margin: "0 19px 0 19px" }}>
                <input placeholder="Value" className="toogleInput"></input>
              </div>
            </div>
            <div>
              <div className="colourDiv"></div>
            </div>
            <img src="" className="imgInToogle"></img>
          </div>
        </div> */}
      
      
       {/* {
         
         status?<DIV />:null
         
         }
       */}

{
        statData.map((data, index) => (
      <div style={{backgroundColor:'red'}}>

        <input value={data.type}></input>
        <input value={data.value }></input>
        <input value={data.color }></input>
        
        {index===statData.length-1 
        ?
         <button onClick={ addItem}>+</button>
       :
         <button onClick={()=> removeItem(index)}>-</button>}
         </div>) 
         
        )}

        <SubHeading>Add Tag</SubHeading>
        <SearchInput placeholder="Tag" />
        <Button>
          <Span>Create</Span>
        </Button>
      </div>
    </MainComponent>
  );
}
