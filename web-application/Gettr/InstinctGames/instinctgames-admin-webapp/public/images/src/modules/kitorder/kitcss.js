import styled from "styled-components";



const Select = styled.select`
  
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border-radius: 6px;
  border: 0.30000001192092896px solid #acacac;
  box-shadow: 0px 4px 15px #00000012;
  height:33px;
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

  background: ${props => props.primary ? "#5C4B75" : "#F6CB83"};
  color: ${props => props.primary ? "white" : "#5C4B75"
};
  margin:0 10px 0 5px;
  border-color:${props => props.primary ? "#5C4B75":"#F6CB83"};
  font-size: 1em;
  height:31px;
  padding: 0.2em 3em;
 font-size:small;
  border-radius: 5px;
 
  }
`;

const ButtonWrapper=styled.div`
    margin-left: 25px;
    padding-right: 15px;
    display:flex;
    
  
    
    
    
`;
export {  Select,Button,ButtonWrapper};