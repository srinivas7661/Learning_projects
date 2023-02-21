import React from "react";
import styled from "styled-components";
import { history } from "../../managers/history";
import { Column, Row } from "simple-flexbox";
import { onBoardingStageConstant } from "../../constants";
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 50px 25px 25px 25px;
    @media(max-width:1024px){
    margin: 0 auto;
  }
`;

const HeadingSubscriptionAddPlan = styled.div`
  margin-top: 10px;
  text-align: left;
  font: normal normal bold 20px/27px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  opacity: 1;
  margin-bottom: 20px;
  @media(max-width:1024px){
      display: none;
  }
   // css of media quary is in src/assets/style/custom.css
`;
const PlanContent = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 15px #00000012;
  border-radius: 7px;
  opacity: 1;
  padding: 20px 0 20px 20px;
  @media (max-width:1024px){
  background: none;
  box-shadow: none;
  border-radius: 0;
  width: 100%;
  max-width: 550px;
  margin: auto;
  display: flex;
  flex-flow: column;
  padding: 20px 0 20px 0;
}
`;
const BackIcon = styled.img`
  height: 18px;
  margin-right: 10px;
`;

const Titles = styled.div`
margin-top: 20px;
width: auto;
font: normal normal bold 16px/22px Nunito;
text-align: left;
letter-spacing: 0px;
opacity: 1;
color: #7d84c0;
// padding-left: px;
`;
const PerDetails = styled.div`
margin-top: 20px;
width: auto;
font: normal normal bold 16px/22px Nunito;
text-align: left;
letter-spacing: 0px;
opacity: 1;
color: #7d84c0;
padding-left: 10px;
`;
const TestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 550px;
  width: 100%;
`;

const PlanDetailInput = styled.input`
  max-width: 550px;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 0.30000001192092896px solid #ACACAC;
  border-radius: 5px;
  opacity: 1;
  color: #5C4B75;
  font-size: 16px;
`;


const DescriptionInput = styled.textarea`
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.30000001192092896px solid #acacac;
  border-radius: 5px;
  opacity: 1;
  max-width: 550px;
  width: 100%;
  height: 120px;
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #5C4B75;
  margin-top: 10px;
`;

const TestAllowedInput = styled.input`
  max-width: 260px;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border: 1px solid #ACACAC;
  border-radius: 5px;
  opacity: 1;
  color: #5C4B75;
  font-size: 16px;
`;

const CostPerTestInput = styled.input`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 0.30000001192092896px solid #ACACAC;
  border-radius: 5px;
  opacity: 1;
  color: #5C4B75;
  font-size: 16px;
  padding-left: 10px;
  
  `;
const SaveChanges = styled.button`
  max-width: 250px;
  width: 100%;
  height:45px;
  background-color: #F6CB83;
  border:none;
  color: #3E344B;
  font-size: 16px;
  border-radius:5px;
  @media(max-width:1024px){
    max-width: 200px;
    width: 100%;
  }
  `;
const Discard = styled.button`
  max-width: 250px;
  width: 100%;
  height:45px;
  background-color: #5C4B75;
  border:none;
  border-radius:5px;
  color: #FFF4F3;
  font-size: 16px;
  margin-left: 0px;
  margin-right: 0px;
  @media(max-width:1024px){
    max-width: 200px;
    width: 100%;
  }
  `;
const OnbaordSelect = styled.select`
  max-width: 550px;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 0.30000001192092896px solid #ACACAC;
  border-radius: 5px;
  opacity: 1;
  padding-left:6px;
  background: url(images/drop.svg) no-repeat right #ffffff ;
-webkit-appearance: none;
background-position-x: 523px;
  color: #5C4B75;
  font-size: 16px;
`;
const ButtonParent = styled.div`
display: flex;
margin: 20px 40px 0 40px;
justify-content: space-between;
  @media(max-width:1024px){
    margin: 20px;
  }
`;



function AddAndEditSubscrpitionComponent(props) {
  const { state, handleChange, saveChanges, deletePlan } = props
  return (
    <>
      <Container>
        <HeadingSubscriptionAddPlan>Subscription Plans</HeadingSubscriptionAddPlan>
        <PlanContent>
          <Row className="align-items-center">
            <BackIcon src="/images/back.svg" alt="Back" onClick={() => history.push("/plans")} />
            <Row className="w-100-per justify-content-between padding-right-20 fc-5c4b75 font-family-Nunito"> {state.detail ? state.title : state.title + " Plan"}
              {state.detail ? <Row className="justify-content-center">
                <img className="cursor-pointer" src="/images/editIcon.svg" onClick={() => history.push(`/plans/edit?planId=${state.plan?.planId}`)} />
                <img className="margin-left-20 cursor-pointer" onClick={() => deletePlan(state.plan?.planId)} src="/images/deleteIcon.svg" />
              </Row> : ""}
            </Row>
          </Row>
          {state.detail ? PlanDetails(props)
            : <div>
              <Titles>Plan Name:</Titles>
              <PlanDetailInput value={state.plan?.planName} onChange={(event) => handleChange("planName", event.target.value)} />

              <Titles>Description:</Titles>
              <DescriptionInput value={state.plan?.description} onChange={(event) => handleChange("description", event.target.value)} />

              <Titles>Price:</Titles>
              <PlanDetailInput type="number" value={state.plan?.price} onChange={(event) => handleChange("price", event.target.value)} />

              <TestContainer>
                <Column className="w-50-per">
                  <Titles>Test Allowed:</Titles>
                  <TestAllowedInput type="number" value={state.plan?.testAllowed} onChange={(event) => handleChange("testAllowed", event.target.value)} />
                </Column>
                <Column className="w-50-per">
                  <PerDetails>Per Test Cost:</PerDetails>
                  <CostPerTestInput type="number" value={state.plan?.perTestCost} onChange={(event) => handleChange("perTestCost", event.target.value)} />
                </Column>
              </TestContainer>

              <Titles>Onboard Stage:</Titles>
              <OnbaordSelect value={state.plan?.onBoardingStage} onChange={(event) => handleChange("onBoardingStage", event.target.value)} >
                {onBoardingStageConstant.map(item => {
                  return <option value={item.value}>{item.name}</option>
                })}
              </OnbaordSelect>
              <Titles>Benefits:</Titles>
              <PlanDetailInput value={state.plan?.benefits} onChange={(event) => handleChange("benefits", event.target.value)} />

              <ButtonParent>
                <SaveChanges onClick={() => saveChanges()}>
                  Save Changes
                </SaveChanges>
                <Discard onClick={() => history.push("/subscription")}>
                  Discard
                </Discard>
              </ButtonParent>
            </div>}

        </PlanContent>

      </Container>

    </>
  );
}

const PlanTitle = styled.div`
width: auto;
font: normal normal bold 16px/22px Nunito;
text-align: left;
letter-spacing: 0px;
opacity: 1;
color: #7d84c0;
`;

const Value = styled.div`
font-size: 15px;
margin-left: 10px;
`

function PlanDetails(props) {
  const { state } = props
  return (
    <div>
      <Row className="align-items-center margin-top-25">
        <PlanTitle>Plan Name:</PlanTitle>
        <Value>{state.plan?.planName}</Value>
      </Row>

      <Row className="align-items-center margin-top-25">
        <PlanTitle>Description:</PlanTitle>
        <Value>{state.plan?.description}</Value>
      </Row>

      <Row className="align-items-center margin-top-25">
        <PlanTitle>Price:</PlanTitle>
        <Value>{state.plan?.price}</Value>
      </Row>

      <TestContainer>
        <Row className="w-50-per align-items-center margin-top-25">
          <PlanTitle>Test Allowed:</PlanTitle>
          <Value>{state.plan?.testAllowed}</Value>
        </Row>

        <Row className="w-50-per align-items-center margin-top-25">

          <PlanTitle>Per Test Cost:</PlanTitle>
          <Value>{state.plan?.perTestCost}</Value>
        </Row>
      </TestContainer>

      <Row className="align-items-center margin-top-25">
        <PlanTitle>Onboard Stage:</PlanTitle>
        <Value>{state.plan?.onBoardingStage}</Value>
      </Row>

      <Row className="align-items-center margin-top-25">

        <PlanTitle>Benefits:</PlanTitle>
        <Value>{state.plan?.benefits}</Value>
      </Row>


    </div>
  )
}

export default AddAndEditSubscrpitionComponent;
