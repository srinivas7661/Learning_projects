import React, { useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
width: 100%;
box-shadow: 5px 10px 5px #00000012;
margin-top: 20px;
padding: 10px;
`;
const Heading = styled.div`
text-align: left;
font: normal normal bold 14px/19px Nunito;
color: #7D84C0;
`;
const ConsentProvided = styled.div`
text-align: right;
font: normal normal normal 14px/19px Nunito;
color: #5B482C;
`;
const GreenDot = styled.span`
width: 12px;
height: 12px;
background-color: #90CFB3;
border-radius: 50%;
display: inline-block;
margin-left: 5px;
`;
const RedDot = styled.span`
width: 12px;
height: 12px;
background-color: #EE5858;
border-radius: 50%;
display: inline-block;
margin-left: 5px;
`;
const Text = styled.p`
text-align: left;
font: normal normal normal 16px/22px Nunito;
color: #3E344B;
`;
const DownloadButton = styled.button`
width: 297px;
height: 56px;
text-align: center;
font: normal normal bold 16px/22px Nunito;
color: #5C4B75;
background: #F6CB83 0% 0% no-repeat padding-box;
box-shadow: 0px 4px 15px #00000012;
border-radius: 5px;
border: none;
`;
const ViewButton = styled.button`
margin-left: 80%;
background: transparent;
border: none;
margin-bottom: 20px;
`;

const consentsData = {
    private: {
        provide: "18 Sep 2020",
        detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et viverra urna. Suspendisse suscipit, nulla sit amet blandit sollicitudin, magna sem vehicula justo, at porttitor turpis lorem ac velit. Nam tincidunt, arcu at volutpat ultrices, nisi metus consectetur neque, id varius nunc nibh quis massa. Nam ac pretium magna, eu elementum risus. Quisque semper a libero et accumsan. Nulla consectetur tortor et dolor bibendum, at gravida nisi pulvinar. Nulla vel vestibulum nunc, suscipit rutrum mi. Vestibulum ornare semper faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et viverra urna. Suspendisse suscipit, nulla sit amet blandit sollicitudin, magna sem vehicula justo, at porttitor turpis lorem ac velit. Nam tincidunt, arcu at volutpat ultrices, nisi metus consectetur neque, id varius nunc nibh quis massa. Nam ac pretium magna, eu elementum risus. Quisque semper a libero et accumsan. Nulla consectetur tortor et dolor bibendum, at gravida nisi pulvinar. Nulla vel vestibulum nunc, suscipit rutrum mi. Vestibulum ornare semper faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et viverra urna. Suspendisse suscipit, nulla sit amet blandit sollicitudin, magna sem vehicula justo, at porttitor turpis lorem ac velit. Nam tincidunt, arcu at volutpat ultrices, nisi metus consectetur neque, id varius nunc nibh quis massa. Nam ac pretium magna, eu elementum risus. Quisque semper a libero et accumsan. Nulla consectetur tortor et dolor bibendum, at gravida nisi pulvinar. Nulla vel vestibulum nunc, suscipit rutrum mi. Vestibulum ornare semper faucibus."
    },
    sample: {
        provide: "5 Oct 2020",
        detail: "Donec lectus nisl, dignissim eget pharetra et, porttitor a risus. Curabitur condimentum, enim nec sollicitudin tristique, nisl tortor bibendum mauris, id finibus lectus diam non libero. Phasellus nec sagittis nisi. Fusce et fringilla ligula, non pharetra nulla. Suspendisse in ligula molestie, feugiat libero in, finibus lectus. Phasellus vel nisi varius, interdum orci a, gravida ex. Pellentesque interdum nunc nec lacus tincidunt, sit amet auctor est tempor. Curabitur sed dolor risus. Nullam et tellus non tellus aliquet suscipit. Aliquam accumsan nisi ipsum, ut ultricies tellus placerat in. Morbi mattis ligula id pharetra fringilla. Vestibulum nunc leo, tristique eget consectetur sed, aliquet non ipsum. Sed non sem pharetra, blandit nisi sed, varius tellus. Suspendisse pharetra molestie eros, eget faucibus odio porttitor in. Nullam iaculis, ipsum eu dignissim posuere, odio metus ultricies ligula, eget condimentum lorem ex sed nulla. Cras placerat tortor massa, eu efficitur lorem lacinia quis. Curabitur ultrices non ipsum vestibulum facilisis. Sed at ex ullamcorper, auctor felis vel, accumsan diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla pellentesque tempor nunc, eget suscipit libero dignissim sed. Nam commodo rhoncus turpis, quis molestie neque luctus vel. Nullam porta dolor velit, vel tristique nulla maximus at. Vestibulum sed fringilla nulla, id scelerisque odio. Integer at tellus scelerisque, commodo enim eu, condimentum leo."
    },
    medical: {
        provide: "no",
        detail: "Aliquam semper in velit sit amet tincidunt. Etiam nec leo malesuada, aliquam neque in, lobortis mauris. Cras a ligula odio. Fusce vel augue quis ipsum pellentesque placerat condimentum in quam. Donec euismod finibus suscipit. Nullam lorem enim, lacinia a ultrices ut, rutrum pretium sem. Phasellus diam orci, euismod sodales fermentum vel, posuere ac nisi. Quisque vitae massa et odio vestibulum imperdiet non a magna. Praesent sollicitudin ultricies ligula ac consectetur. Etiam ultricies viverra scelerisque. Nam vel justo dignissim, accumsan felis id, porttitor augue. Vestibulum lacinia risus et suscipit sagittis. Mauris a orci aliquam, faucibus sapien ac, dignissim quam. Fusce sollicitudin tempor mauris, vel pretium ante. Nunc nulla ligula, blandit et convallis eget, luctus efficitur lorem. Vivamus aliquam nulla volutpat pulvinar lobortis. Nam rutrum bibendum maximus. Sed in pretium orci, quis porta neque. Cras vestibulum libero id ullamcorper rhoncus. Donec lectus nisl, dignissim eget pharetra et, porttitor a risus. Curabitur condimentum, enim nec sollicitudin tristique, nisl tortor bibendum mauris, id finibus lectus diam non libero. Phasellus nec sagittis nisi. Fusce et fringilla ligula, non pharetra nulla. Suspendisse in ligula molestie, feugiat libero in, finibus lectus. Phasellus vel nisi varius, interdum orci a, gravida ex. Pellentesque interdum nunc nec lacus tincidunt, sit amet auctor est tempor. Curabitur sed dolor risus. Nullam et tellus non tellus aliquet suscipit. Aliquam accumsan nisi ipsum, ut ultricies tellus placerat in. Morbi mattis ligula id pharetra fringilla. Vestibulum nunc leo, tristique eget consectetur sed, aliquet non ipsum. Sed non sem pharetra, blandit nisi sed, varius tellus."
    }
}

function Consents(props) {
    const [showPrivate, setShowPrivate] = useState(false);
    const [showSample, setShowSample] = useState(false);
    const [showMedical, setShowMedical] = useState(false)
    return (
        <>
            <MainContainer>
                <div className="padding-10-px">
                    <div>
                        <div className="display-flex">
                            <Heading className="flex-1">Private Data Utilization</Heading>
                            <ConsentProvided className="flex-1">{consentsData.private.provide === "no" ? <>No Consent Provided<RedDot></RedDot></> : <>Consent Provided on {consentsData.private.provide}<GreenDot></GreenDot></>}</ConsentProvided>
                        </div>
                        <hr className="margin-bottom-20-px" />
                        <div className="display-none display-block-tab">
                            <Text>
                                <span>{consentsData.private.detail.slice(0, 300)}</span>
                                {showPrivate ? <span>{consentsData.private.detail.slice(300,)}</span> : <></>}
                            </Text>
                            <div>{showPrivate ? <ViewButton onClick={() => setShowPrivate(!showPrivate)}>Less detail</ViewButton> :
                                <ViewButton onClick={() => setShowPrivate(!showPrivate)}>View detail</ViewButton>}</div>
                        </div>
                        <div className="display-block display-none-web">
                            <Text className="margin-bottom-50-px">{consentsData.private.detail}</Text>
                        </div>
                    </div>
                    <div>
                        <div className="display-flex">
                            <Heading className="flex-1">Sample Data Utilization</Heading>
                            <ConsentProvided className="flex-1">{consentsData.sample.provide === "no" ? <>No Consent Provided<RedDot></RedDot></> : <>Consent Provided on {consentsData.sample.provide}<GreenDot></GreenDot></>}</ConsentProvided>
                        </div>
                        <hr className="margin-bottom-20-px" />
                        <div className="display-none display-block-tab">
                            <Text>
                                <span>{consentsData.sample.detail.slice(0, 300)}</span>
                                {showSample ? <span>{consentsData.sample.detail.slice(300,)}</span> : <></>}
                            </Text>
                            <div>{showSample ? <ViewButton onClick={() => setShowSample(!showSample)}>Less detail</ViewButton> :
                                <ViewButton onClick={() => setShowSample(!showSample)}>View detail</ViewButton>}</div>
                        </div>
                        <div className="display-block display-none-web">
                            <Text className="margin-bottom-50-px">{consentsData.sample.detail}</Text>
                        </div>
                    </div>
                    <div>
                        <div className="display-flex">
                            <Heading className="flex-1">Medical Data Utilization</Heading>
                            <ConsentProvided className="flex-1">{consentsData.medical.provide === "no" ? <>No Consent Provided<RedDot></RedDot></> : <>Consent Provided on {consentsData.medical.provide}<GreenDot></GreenDot></>}</ConsentProvided>
                        </div>
                        <hr className="margin-bottom-20-px" />
                        <div className="display-none display-block-tab">
                            <Text>
                                <span>{consentsData.medical.detail.slice(0, 300)}</span>
                                {showMedical ? <span>{consentsData.medical.detail.slice(300,)}</span> : <></>}
                            </Text>
                            <div>{showMedical ? <ViewButton onClick={() => setShowMedical(!showMedical)}>Less detail</ViewButton> :
                                <ViewButton onClick={() => setShowMedical(!showMedical)}>View detail</ViewButton>}</div>
                        </div>
                        <div className="display-block display-none-web">
                            <Text className="margin-bottom-50-px">{consentsData.medical.detail}</Text>
                        </div>
                    </div>
                    <div className="display-none display-block-tab">
                        <DownloadButton className="margin-top-50-px margin-left-30-pr">Download Consent Sheet</DownloadButton>
                    </div>
                    <div className="display-block display-none-web">
                        <DownloadButton className="margin-top-100-px">Download Consent Sheet</DownloadButton>
                    </div>
                </div>
            </MainContainer>
        </>
    )
}

export default Consents;