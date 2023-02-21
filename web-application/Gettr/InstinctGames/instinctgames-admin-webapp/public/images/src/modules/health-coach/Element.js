import styled from "styled-components";



const Select = styled.select`
  
  background: white;
  color: gray;
  padding-left: 5px;
  font: normal normal normal 15px/20px Nunito;
  letter-spacing: 0px;
  color: #5C4B75;
  border-radius: 6px;
  border: 0.30000001192092896px solid #acacac;
  box-shadow: 0px 4px 15px #00000012;
  height:33px;
  background: url(images/drop.svg) no-repeat right #ffffff ;
  -webkit-appearance: none;
  background-position-x: 170px;
  width:195px;
  color:#5C4B75;
  margin-left: 8px;
head
  &:focus-visible {
    outline:none;
  }

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 9px;
    padding: 0px 2px 1px;
    border-color:white;
    width:50px;
  }
`;


const Select2 = styled.select`
  
  background: white;
  color: gray;
  padding-left: 5px;
  font: normal normal normal 15px/20px Nunito;
  letter-spacing: 0px;
  color: #5C4B75;
  border-radius: 6px;
  border: 0.30000001192092896px solid #acacac;
  box-shadow: 0px 4px 15px #00000012;
  height:33px;
  background: url(images/drop.svg) no-repeat right #ffffff ;
  -webkit-appearance: none;
  background-position-x: 114px;
  width:137px;
  color:#5C4B75;
  margin-left: 8px;
head
  &:focus-visible {
    outline:none;
  }

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 9px;
    padding: 0px 2px 1px;
    border-color:white;
    width:50px;
  }
`;



const Button = styled.button`

  background: ${props => props.primary ? " #5C4B75;" : "#F6CB83"};
  color: ${props => props.primary ? "white" : "#5C4B75"};
  margin:0 0 0 10px;
  border-color:${props => props.primary ? "#5C4B75" : "#F6CB83"};
  height:35px;
  border:none;
  padding: 0.2em 3em;
//  font-size:small;
//  font-size: 1em;
font: normal normal bold 16px/22px Nunito;
  border-radius: 5px;
  // @media(max-width:768px){
  //     margin:0;
  //     margin-left:5px;
  // }
`;

const ButtonWrapper = styled.div`
   display:flex;
   flex-diection:row;
   align-items:center;

   margin-left:auto;
   
   
    @media(max-width:1040px){
        
        margin:0;
        margin-left:auto;
    }
    @media(max-width:768px){
     
        margin:0;
        margin-left:auto;
    }
    
    
    
`;
export { Select2, Select, Button, ButtonWrapper };
