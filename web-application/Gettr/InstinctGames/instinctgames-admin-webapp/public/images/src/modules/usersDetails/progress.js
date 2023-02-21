import React from "react";
import styled from "styled-components";
import { Row, Column } from 'simple-flexbox';
import { onBoardingStageConstant, statusConstants } from "../../constants";

const OutCircle = styled.div`
min-width: 30px;
min-height: 30px;
background: ${props => props.state === statusConstants.ACTIVE ? "#3E344B" : "grey"};;
border-radius: 50%;
position: relative;
display: flex;
justify-content: center;
align-items: center;
`;

const InBetweenCircle = styled.div`
min-width: 30px;
min-height: 30px;
background: #F6CB83;
border-radius: 50%;

`;
const InCircle = styled.div`
width: 10px;
height: 10px;
background: #FFFFFF;
border-radius: 50%;
position: absolute;
`;


const ProgressBar = styled.div`
height: 4px;
background: ${props => props.state === statusConstants.ACTIVE ? "#3E344B" : "grey"};
width: 100%;
margin: 0;
@media (max-width:1024px){
min-height:80px !important;
height: 100%;
width: 4px !important;
}
`

const Stages = styled.div`
display: flex;
flex-flow: column;
width: 100%;
align-items: center;

`

const StageProgressBar = styled.div`
display: flex;
flex-flow: row;
width: 100%;
align-items: start;
padding: 0 15px 0 15px;
margin-top: 30px;
@media (max-width:1024px){
display: none;
}

`

const StageProgressBarTab = styled.div`
display: flex;
flex-flow: column;
align-items: start;
width: 100%;
@media (min-width:1025px){
display: none;
}
`
const Stage = styled.div`
display: flex;
flex-flow: row;
width: 100%;
align-items: center;
@media (max-width:1024px){
flex-flow: column;
min-height: 100px;
height: 100%;
align-items: flex-start;
}
`
const StageTitle = styled.div`
display: flex;
width: 100%;
flex-flow: row;
@media (max-width:1024px){
display: ${props => props.tab ? "flex" : "none"};
margin-left: 15px;
}
`

function Progress(props) {
    const { progress } = props

    let onBoardingStages = [...onBoardingStageConstant]
    let selectedStageIndex = onBoardingStageConstant.findIndex(item => item.value.includes(progress ? progress.trim() : ''))
    let leftStages = onBoardingStages.slice(0, selectedStageIndex)
    let rightStages = onBoardingStages.slice(selectedStageIndex, onBoardingStages.length)
    rightStages = rightStages.map(item => {
        item['state'] = statusConstants.INACTIVE
        return item
    })
    leftStages = leftStages.map(item => {
        item['state'] = statusConstants.ACTIVE
        return item
    })

    let stages = [...leftStages, ...rightStages]
    stages.sort((itemA, itemB) => itemA.order - itemB.order)

    return (
        <>
            <StageProgressBar>
                {stages.map((row, index) => (
                    <Stages key={index}>
                        {row.name === progress ?
                            <Stage>
                                <InBetweenCircle />
                                <ProgressBar state={row.state} />
                            </Stage>
                            :
                            <Stage>
                                <OutCircle state={row.state}><InCircle /></OutCircle>
                                <ProgressBar state={row.state} />
                            </Stage>
                        }
                        <StageTitle tab={false}>{row.name}</StageTitle>
                    </Stages>
                ))}
            </StageProgressBar>
            <StageProgressBarTab>
                {stages.map((row, index) => (
                    <Stages key={index}>

                        {row.name === progress ?
                            <Stage>
                                <Row>
                                    <Column className="align-items-center">
                                        <InBetweenCircle />
                                        {index !== stages.length - 1 ? <ProgressBar state={row.state} /> : ""}
                                    </Column>
                                    <StageTitle tab={true}>{row.name}</StageTitle>
                                </Row>

                            </Stage>
                            :
                            <Stage>
                                <Row>
                                    <Column className="align-items-center">
                                        <OutCircle state={row.state}><InCircle /></OutCircle>
                                        {index !== stages.length - 1 ? <ProgressBar state={row.state} /> : ""}
                                    </Column>
                                    <StageTitle tab={true}>{row.name}</StageTitle>
                                </Row>
                            </Stage>
                        }

                    </Stages>
                ))}
            </StageProgressBarTab>

        </>
    )
}

export default Progress;