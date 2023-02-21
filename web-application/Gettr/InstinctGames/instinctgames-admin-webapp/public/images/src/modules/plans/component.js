import React from "react";
import styled from "styled-components";
import { history } from "../../managers/history";
import CustomTable from "../../common/components/customTable";

const Container = styled.div`
  width: 100%;
  padding: 50px 25px 25px 25px;
`;
const Heading = styled.div`
  text-align: left;
  font: normal normal bold 20px/27px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
  display: flex;
  justify-content: space-between;
`;


const NewPlanButton = styled.button`
background: #f6cb83;
border-radius: 5px;
height: 35px;
color: #5c4b75;
width: 150px;
border: none;
font-weight: bold;
font-size: 16px;
margin-left: auto;
 @media (max-width: 1025px) {
display: ${props => props.tab ? "block" : "none"};
 }
 @media (min-width: 1025px) {
display: ${props => !props.tab ? "block" : "none"};
 }
`;

function SubscriptionPlansComponent(props) {
  const { state } = props
  return (
    <>
      <Container>
        <Heading>
          Subscription Plans
          <NewPlanButton tab={true} onClick={() => history.push("/plans/create")}> New Plan </NewPlanButton>
        </Heading>
        <NewPlanButton tab={false} onClick={() => history.push("/plans/create")} > New Plan </NewPlanButton>
        <div className="margin-top-25">
          <CustomTable
            tableHeading={""}
            columns={state.tableColumns}
            rows={state.plans}
            isCheckBoxVisible={false}
          />
        </div>
      </Container>
    </>
  );
}

export default SubscriptionPlansComponent;
