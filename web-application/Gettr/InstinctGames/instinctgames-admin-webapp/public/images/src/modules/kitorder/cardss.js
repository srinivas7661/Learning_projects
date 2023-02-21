import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Card = styled.div`
  padding-left: 10px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 15px #00000012;
  border-radius: 7px;
`;
const CardHeader = styled.div``;
const Q1 = styled.div`
  display: flex;
  margin: 10px 20px 10px 0;
`;
const Image = styled.img`
  height: 20px;
  width: 20px;
`;

const Bold = styled.div`
color: var(--unnamed-color-5c4b75);
text-align: left;
font: normal normal bold 19px/22px Nunito;
letter-spacing: 0px;
color: #5C4B75;
opacity:1;
padding-top:5px;


}
`;

const Light = styled.div`
  border: 0px solid var(--unnamed-color-acacac);

  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.30000001192092896px solid #dedcdc;
  border-radius: 5px;
  opacity: 1;
  height: 33px;
  width: 380px;

  margin-left: 18px;
  padding-top: 7px;
  padding-left: 10px;
`;
const T2 = styled.div`
  color: var(--unnamed-color-3e344b);
  font: normal normal normal 11px/17px Nunito;
  letter-spacing: 0px;

  color: #3e344b;
  opacity: 1;

  margin-bottom: 0px;
`;
const Select = styled.select`
  
font: normal normal normal 12px/20px Nunito;
border: 0.3px solid var(--unnamed-color-acacac);
background: #FFFFFF 0% 0% no-repeat padding-box;
border: 0.30000001192092896px solid  #dedcdc;
border-radius: 5px;
opacity: 1;
color:#3E344B;
padding-right: 39px;
margin-left: 16px;

  

  &:focus-visible {
    outline:none;
  }

  option {
    color: var(--unnamed-color-3e344b);
    text-align: left;
    font: normal normal normal 12px/20px Nunito;
    letter-spacing: 0px;
    color: #3E344B;
    opacity: 1;
    
  }

`;

const ImageDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 4px;
`;

export {
  Container,
  Q1,
  CardHeader,
  Bold,
  Light,
  T2,
  Image,
  Select,
  Card,
  ImageDiv,
};
