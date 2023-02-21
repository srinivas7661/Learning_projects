import styled from "styled-components";


const Button = styled.button`

  background: ${props => props.primary ? "#7D84C0" : "#F6CB83"};
  color: ${props => props.primary ? "white" : "#5C4B75"};
  margin:0 10px 0 200px;
  border-color:${props => props.primary ? "#5C4B75" : "#F6CB83"};
  font-size: 1em;
  height:31px; 
  font-size:small;
  border-radius: 5px;
`;

const ButtonWrapper = styled.div`
    margin-left: auto;
    align-items: center;
    display:flex;
    justify-content: right;    
`;
export { Button, ButtonWrapper };












