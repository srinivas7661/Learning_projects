import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { history } from "../../managers/history";
import { Row, Column } from "simple-flexbox";
import CustomSelect from "../../common/components/custom-select";
import { Container, Q1, CardHeader, Bold, Light, T2, Image, Select, Card, ImageDiv } from "../kitorder/cardss";

const Heading = styled.div`
;
  font: normal normal bold 18px/20px Nunito;
  color: #5c4b75;
  opacity: 1;
`;
const SubHeading = styled.div`
  color: var(--unnamed-color-686868);
    text-align: left;
    font: normal normal normal 12px/14px Nunito;
    letter-spacing: 0px;
    color: #686868;
    opacity: 1;
`;
const Button = styled.button`
width: 170px;
height: 45px;
background: #F6CB83 0% 0% no-repeat padding-box;
box-shadow: 0px 4px 30px #00000012;
text-align: center;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #5C4B75;
border-radius: 5px;
margin-right: 10px;
box-shadow: none;
border: none;
opacity: 1;
`;
const InactiveButton = styled.button`
width: 170px;
height: 45px;
background: #5C4B75 0% 0% no-repeat padding-box;
box-shadow: 0px 4px 30px #00000012;
text-align: center;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #FFF4F3;
border-radius: 5px;
margin-right: 10px;
box-shadow: none;
border: none;
opacity: 1;
`;
const ButtonBox = styled.div`
margin-left: 25px;
display:flex;
`;
const Label = styled.div`
width: 220px;
height: 45px;
background: #FFFFFF 0% 0% no-repeat padding-box;
text-align: left;
font: normal normal normal 15px/20px Nunito;
border: 0.3px solid #ACACAC;
border-radius: 5px;
margin-left: 20px;
color: #3E344B;
opacity: 1;
`;
const Imgr = styled.img`
height:21px;
margin-top:1px;`;
const ImageDiv2 = styled.div`
  margin-left: 5px;
`;
const Light2 = styled.div`
  border: 0.3px solid var(--unnamed-color-acacac);
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0.30000001192092896px solid  #dedcdc;
  border-radius: 5px;
  opacity: 1;
  height: 32px;
  width: 464px;
  margin-left: 10px;
  padding-top: 7px;
  padding-left: 7px;
`;
const Imgouter = styled.div`
display:flex;
flex-direction:row;
margin-left: 3px;
margin-right:13px;`;
const Innerdiv = styled.div`
  display: flex;
  margin: 20px 20px 7px 26px;
`;
const Innerdiv2 = styled.div`
  display: flex;
  padding-left: 44px;
  padding-bottom:7px;
 
`;
const ScaleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Scale = styled.p`
color: var(--unnamed-color-3e344b);
text-align: left;
font: normal normal bold 15px/20px Nunito;
letter-spacing: 0px;
color: #3E344B;
opacity: 1;
margin-bottom:4px;
padding-left: 43px;
`;
const RightCard = styled.div` 
   background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 4px 15px #00000012;
    border-radius: 7px;
    opacity: 1;
    margin-left: 12px;
    padding-left: 5px;
    padding-right: 5px;
`;
const RightImageDiv = styled.div`
  padding:2px
`;
const RightImage = styled.img`
  height:15px;
  weight:18px;
  opacity: 1;`;
const Main = styled.div`
padding: 50px 20px 20px 20px;
`;
const Text = styled.p`
margin-top: 10px;
margin-left: 10px;
`;

const ReportOrderingSurvey = (props) => {
    const { state } = props
    const [show, setShow] = useState(false);
    var handlechange = e => setShow(true)
    const A = show;
    return (
        <>
            <Main>
                <Row justifyContent="space-between" >
                    <div>
                        <Heading>Report Ordering Survey</Heading><SubHeading>Trigger Controlled, Required, Active</SubHeading>
                    </div>
                    <ButtonBox>
                        {A ? <Button onClick={() => history.push("/manage-survey")}>Update</Button> : <Button onClick={handlechange}>Edit</Button>}
                        <InactiveButton onClick={() => history.push("/manage-survey")}> Make Inactive</InactiveButton>
                    </ButtonBox>
                </Row>
                <div className="sec-container">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Container>
                            <Card>
                                {A ?
                                    <ImageDiv>
                                        <Image className="grid" src="images/grid.svg" />
                                    </ImageDiv> : <div className="margin-top-24-px"></div>}
                                <CardHeader>
                                    <Q1 className="Q1css">
                                        <Bold>
                                            <text>Q1</text>
                                        </Bold>
                                        <Light className="Light h-45-px">
                                            <T2 className="T2"> Donec id augue et urna venenatis fermentum?</T2>
                                        </Light>
                                        {A ?
                                            <div style={{ marginLeft: "20px" }}>
                                                <CustomSelect title="Status" valueKey="status" options={state.statusOptions} handleChange={props.handleDropDownChange} className="h-45-px" />
                                            </div> : <Label><Text>Short Answer</Text></Label>}
                                    </Q1>
                                </CardHeader>
                            </Card>
                            <Card style={{ marginTop: "10px" }}>
                                {A ?
                                    <ImageDiv>
                                        <Image className="grid" src="images/grid.svg"></Image>
                                    </ImageDiv> : <div className="margin-top-24-px"></div>}
                                <CardHeader>
                                    <Q1 className="Q1css">
                                        <Bold>
                                            <text>Q2</text>
                                        </Bold>
                                        <Light className="Light h-45-px">
                                            <T2 className='T2'> Curabitur finibus malesuada mollis elit?</T2>
                                        </Light>
                                        {A ?
                                            <div style={{ marginLeft: "20px" }}>
                                                <CustomSelect title="Status" valueKey="status" options={state.statusOptions} handleChange={props.handleDropDownChange} />
                                            </div> : <Label><Text>Dropdown</Text></Label>}
                                    </Q1>
                                    <Innerdiv className='innerdiv'>
                                        {A ?
                                            <ImageDiv2 className="repeat">
                                                <Imgr src="images/repeat.svg"></Imgr>
                                            </ImageDiv2> : ""}
                                        {A ?
                                            <Light2 className="Light2 h-45-px" >
                                                <T2 className='T2'>Turpis</T2>
                                            </Light2> :
                                            <Light2 className="Light2 h-45-px" style={{ marginLeft: "27px" }} >
                                                <T2 className='T2'>Turpis</T2>
                                            </Light2>}
                                        {A ?
                                            <Imgouter className='imgouter'> <ImageDiv2>
                                                <Image className="plus" src="images/plus.svg"></Image>
                                            </ImageDiv2> <ImageDiv2>
                                                    <Image className="plus" src="images/Subtraction.svg"></Image>
                                                </ImageDiv2></Imgouter> : ""}
                                    </Innerdiv>
                                    <Innerdiv2>
                                        <Light2 className="light2 h-45-px">
                                            <T2 className='T2'>Nulla</T2>
                                        </Light2>
                                        {A ?
                                            <Imgouter className='imgouter'> <ImageDiv2>
                                                <Image className="plus" src="images/plus.svg"></Image>
                                            </ImageDiv2> <ImageDiv2>
                                                    <Image className="plus" src="images/Subtraction.svg"></Image>
                                                </ImageDiv2></Imgouter> : ""}
                                    </Innerdiv2>
                                    <Innerdiv2>
                                        <Light2 className="light2 h-45-px">
                                            <T2 className='T2'>Aenean</T2>
                                        </Light2>
                                        {A ?
                                            <Imgouter className='imgouter'> <ImageDiv2>
                                                <Image className="plus" src="images/plus.svg"></Image>
                                            </ImageDiv2> <ImageDiv2>
                                                    <Image className="plus" src="images/Subtraction.svg"></Image>
                                                </ImageDiv2></Imgouter> : ""}
                                    </Innerdiv2>
                                    <Innerdiv2>
                                        <Light2 className="light2 h-45-px">
                                            <T2 className='T2'> Suspendisse</T2>
                                        </Light2>
                                        {A ?
                                            <Imgouter className='imgouter'> <ImageDiv2>
                                                <Image className="plus" src="images/plus.svg"></Image>
                                            </ImageDiv2> <ImageDiv2>
                                                    <Image className="plus" src="images/Subtraction.svg"></Image>
                                                </ImageDiv2></Imgouter> : ""}
                                    </Innerdiv2>
                                </CardHeader>
                            </Card>
                            <Card style={{ marginTop: "10px" }}>
                                {A ?
                                    <ImageDiv>
                                        <Image className="grid" src="images/grid.svg" />
                                    </ImageDiv> : <div className="margin-top-24-px"></div>}
                                <CardHeader>
                                    <Q1 className="Q1css">
                                        <Bold>
                                            <text>Q3</text>
                                        </Bold>
                                        <Light className="Light h-45-px">
                                            <T2 className="T2"> Mauris non porttitor augue, at gravida est?</T2>
                                        </Light>
                                        {A ?
                                            <div style={{ marginLeft: "20px" }}>
                                                <CustomSelect title="Status" valueKey="status" options={state.statusOptions} handleChange={props.handleDropDownChange} />
                                            </div> : <Label><Text>Short Answer</Text></Label>}
                                    </Q1>
                                </CardHeader>
                            </Card>
                            <Card style={{ marginTop: "10px" }}>
                                {A ?
                                    <ImageDiv>
                                        <Image className="grid" src="images/grid.svg" />
                                    </ImageDiv> : <div className="margin-top-24-px"></div>}
                                <CardHeader>
                                    <Q1 className="Q1css">
                                        <Bold>
                                            <text>Q4</text>
                                        </Bold>
                                        <Light className="Light h-45-px">
                                            <T2 className="T2"> Mauris non porttitor augue, at gravida est?</T2>
                                        </Light>
                                        {A ?
                                            <div style={{ marginLeft: "20px" }}>
                                                <CustomSelect title="Status" valueKey="status" options={state.statusOptions} handleChange={props.handleDropDownChange} />
                                            </div> : <Label><Text>Short Answer</Text></Label>}
                                    </Q1>
                                </CardHeader>
                                <ScaleContainer>
                                    <Scale>Scale</Scale>
                                    <div style={{ marginLeft: "45px", width: "50px" }}>
                                        <CustomSelect title="S" valueKey="scale" options={state.scaleOptions} handleChange={props.handleDropDownChange} />
                                    </div>
                                </ScaleContainer>
                            </Card>
                        </Container>
                        {A ?
                            <div>
                                <RightCard className='rightcard'>
                                    <RightImageDiv className="rightcard">
                                        <RightImage className="Image" src="images/right.svg"></RightImage>
                                    </RightImageDiv >
                                    <RightImageDiv className="rightcard">
                                        <RightImage className="Image" src="images/add.svg"></RightImage>
                                    </RightImageDiv>
                                    <RightImageDiv className="rightcard">
                                        <RightImage className="Image" src="images/file.svg"></RightImage>
                                    </RightImageDiv>
                                    <RightImageDiv className="rightcard">
                                        <RightImage className="Image" src="images/delete.svg"></RightImage>
                                    </RightImageDiv>
                                </RightCard>
                            </div> : ""}
                    </div>
                </div>
            </Main>

        </>
    )
}
export default ReportOrderingSurvey;