import React from "react";
import styled from "styled-components";


const TextContainer = styled.div`
  color: #c7c7c7;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const NoRecordPlaceholderComponent = ({text = ''}) => {
    return (
        <div className="p-4 display-flex justify-c m-l-auto m-r-auto maxWidth " >
            {/*<center>*/}
            {/*    <img src="/images/Group 51.svg" className=""/>*/}
            {/*</center>*/}
            <TextContainer>
                {text || `No Record Found`}
            </TextContainer>
         </div>
    )
}
export default NoRecordPlaceholderComponent;
