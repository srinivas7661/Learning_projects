import React from "react";
import styled from "styled-components";

const StatusContainer = styled.div`
  position: absolute;
  width: 174px;
  height: 210px;
  padding: 12px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 9px;
  display: flex;
  flex-direction: column !important;
  margin: 25px 0px 0px 40px;
  p{
    font: normal 700 16px/22px 'Roboto';
    display: flex;
    align-items: center;
    letter-spacing: -0.408px;
    color: #1E1E1E;
    margin-bottom: 0px;
    white-space: nowrap;
  }
  div{
    display: flex;
    flex-direction: column !important;
    
    button{
      background: none;
      border: none;
      font: normal 700 14px/22px 'Roboto';
      color: #298FFF;
    }
  }
  `;

  const EachButton = styled.div`
      height: 33px;
      background: ${(props) => (props.eachButton === props.activeButton) ? "#50555C" : "#E7E7E7"};
      border: 1px solid #E7E7E7;
      padding: 5px;
      color: ${(props) => (props.eachButton === props.activeButton) ? "#FFFFFF" : "#000000"};
      border-radius: 6px;
      font-weight: 400;
    `;

const dropDownList = [
  {
    name: "ACTIVE",
    value: "ACTIVE",
  },
  {
    name: "INACTIVE",
    value: "INACTIVE",
  },
  {
    name: "BLOCKED",
    value: "BLOCKED",
  },
];

function FilterStatus({head, statusFilter, setDropDown, setStatusFilter}) {
  if(head==='Status'){
    return (
    <StatusContainer>
      <p>Select Status</p>
      <div>
        {dropDownList.map((statusType)=>(
          <EachButton eachButton={statusType.value} activeButton={statusFilter} onClick={()=>setStatusFilter(statusType.value)}>
          {statusType.name}
        </EachButton>
        ))}
        <button onClick={()=>setDropDown(false)}>Done</button>
      </div>
    </StatusContainer>
  );
}else{
  return <></>
}
}

export default FilterStatus;