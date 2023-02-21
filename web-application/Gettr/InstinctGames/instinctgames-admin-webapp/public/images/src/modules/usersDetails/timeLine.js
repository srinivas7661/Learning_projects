import React from "react";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import UserTable from "./userTable";
import Progress from "./progress"
import { Row, Column } from 'simple-flexbox'

const TableUser = styled.div`
margin-top:25px;
width:100%;
`

const styleClasses = makeStyles(() => ({
    container: {
        display: "flex",
        flexDirection: "column",
        margin: "0px 0px 0px 20px",
        width: "100%",
    },
    styleContainer: {
        display: "flex",
        width: "100%",
        flexFlow: "nowrap",
        justifyContent: "space-between",
    },
    tab1: {
        background: "#ffffff",
        height: "38px",
        minHeight: "20px",
        minWidth: "20px",
        padding: "10px 20px 0px 20px",
        textTransform: "capitalize",
        fontSize: "12px",
        color: "#5C4B75 !important",
        fontWeight: "bold",
    },
    tab2: {
        background: "#ffffff",
        height: "38px",
        minHeight: "20px",
        minWidth: "20px",
        padding: "10px 20px 0px 20px",
        textTransform: "capitalize",
        fontSize: "12px",
        color: "#5C4B75",
    },
    tabs: {
        marginTop: "25px",
    },
    nameRelation: {
        color: "#5C4B75",
        fontSize: "14px",
    },
    tableCell: {
        align: "center",
        border: "1px solid rgba(224, 224, 224, 1)",
    },
    table: {
        border: "1px solid rgba(224, 224, 224, 1)",
    },
    tableComponenet: {
        width: "100%",
        marginTop: "30px",
        paddingTop: "1px",
        paddingBottom: "15px",
        boxShadow: "0px 4px 15px #00000012 !important",
    },
    formControl: {
        width: "240px",
        margin: "0 0 0 auto"
    },
}));


const MemberImage = styled.img`
height: 45px;
border-radius: 50%;
width: 45px;
`;


const MemberName = styled.div`
  text-align: left;
  font: normal normal bold 16px/22px Nunito;
  color: #5c4b75;
  opacity: 1;
  margin-top: 5px;
  font-size: 16px;
  word-break: break-all;
`;

const MemberType = styled.div`
  text-align: left;
  font: normal normal bold 16px/22px Nunito;
  color: #ACACAC;
  opacity: 1;
  font-size: 16px;
  word-break: break-all;
`;

const TimeLineParent = styled.div`
display: flex;
flex-flow: column;
border: 1px solid #707070;
border-radius: 5px;
margin-top: 25px;
@media (max-width:1024px){
    display: none;
}
`
const TimeLineParentTab = styled.div`
display: flex;
flex-flow: row;
justify-content: center;
width: 100%;
background: #FFFCFC;
margin-top: 25px;

@media (min-width:1025px){
    display: none;
}
`

const Phases = styled.div`
width: ${props => props.tab === 0 ? "25%" : props.tab === 1 ? "40%" : "35%"};
text-align: center;
font-size: 16px;
color: #5C4B75;
font-weight: bold ;
display: flex;
justify-content: center;
align-items: center;
@media (max-width:1024px){
    min-width: fit-content;
    width: 100%;
    height: ${props => props.tab === 0 ? "25%" : props.tab === 1 ? "40%" : "35%"};
    border-bottom:  ${props => props.tab !== 2 ? "2px dashed #ccc" : ""};
}
@media (min-width:1025px){
    height:40px;
    border-bottom: 1px solid #707070;
    border-right:  ${props => props.tab !== 2 ? "1px solid #707070" : ""};
}
`;

const MemberDummyImage = styled.div`
height: 45px;
border-radius: 50%;
background: grey;
width: 45px;
`;


function TimeLine(props) {
    const classes = styleClasses();

    return (
        <>
            {/*for web--- */}
            <div className="display-block w-100-pr">
                <Column>
                    {MemberDropDown(classes, props)}
                </Column>
                <TimeLineParent>
                    <Row>
                        <Phases tab={0}>Family Planning</Phases>
                        <Phases tab={1}>Pregnancy Phase</Phases>
                        <Phases tab={2}>Postpartun</Phases>
                    </Row>
                    <Progress progress={props.stage} />
                </TimeLineParent>
                <TimeLineParentTab>
                    <Column className="w-100-per">
                        <Phases tab={0}>Family Planning</Phases>
                        <Phases tab={1}>Pregnancy Phase</Phases>
                        <Phases tab={2}>Postpartun</Phases>
                    </Column>
                    <Progress progress={props.stage} />
                </TimeLineParentTab>
                <TableUser>
                    <UserTable />
                </TableUser>
            </div>

        </>
    )
}

function MemberDropDown(classes, props) {

    const [users, setUsers] = React.useState("0");
    const handleUsers = e => setUsers(e.target.value);
    const { familyMembers } = props

    return (
        familyMembers && familyMembers.length ?
            <FormControl className={classes.formControl}>
                <Select
                    label
                    className="h-60-px font-weight-bold"
                    onChange={(event) => handleUsers(event)}
                    defaultValue={users}
                >
                    {familyMembers.map((item, index) => {
                        return (
                            <MenuItem value={index} >
                                <Row className="align-items-center margin-top-10-px">
                                    <Column>
                                        {item.picture ?
                                            <MemberImage src={item.picture} /> :
                                            <MemberDummyImage />}
                                    </Column>
                                    <Column className="margin-left-10-px">
                                        <MemberName>{item.firstName + " " + item.lastName}</MemberName>
                                        <MemberType>{item.memberType.toLowerCase()}</MemberType>
                                    </Column>
                                </Row>
                            </MenuItem>

                        )
                    })}

                </Select>
            </FormControl> : ""
    )
}

export default TimeLine;