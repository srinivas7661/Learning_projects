import React from "react";
import styled from "styled-components";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/styles";

const ParentContainer = styled.div`
min-height: 100vh;
height: 100%;
display: flex;
width: 100%;
align-items: center;
flex-flow: column;
justify-content: center;
`

const InputField = styled.input`
max-width: 400px;
height: 50px;
width: 100%;
padding-left: 10px;
border: 1px solid #ACACAC;
border-radius: 5px;
margin: 5px 0 0 0;
:active, :focus{
    outline: none;
    border: 1px solid #ACACAC;
}
`
const Text = styled.div`
color: #686868;
letter-spacing: 0px;
text-align: left;
font: normal normal bold 16px/22px Nunito;
`

const HeadingText = styled.div`
text-align: center;
font: normal normal normal 14px/19px Nunito;
letter-spacing: 0px;
color: #ACACAC;
`
const ComponentsContainer = styled.div`
margin: 50px 0 0 0;
display: flex;
flex-flow: column;
max-width: 400px;
width: 100%;

`
const ComponentsBox = styled.div`
display: flex;
flex-flow: column;
margin: 20px 0 0 0;
`

const CreateProfileButton = styled.div`
margin: 50px 0 0 0;
background: #5C4B75 0% 0% no-repeat padding-box;
border-radius: 5px;
max-width: 300px;
width: 100%;
height: 45px;
color: white;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`;

const Error = styled.div`
margin: 10px 0 0 0;
color: red;
font: normal normal bold 16px/22px Nunito;
`;

const useStyles = makeStyles((theme) => ({
    icon: {
        marginLeft: "-30px",
        visibility: 'hidden',
    },
    showicon: {
        visibility: 'display',
        marginLeft: "-30px",

    }
}));

function AdminRegisterComponent(props) {
    const { handleChange, state, resetPassword } = props
    const classes = useStyles();
    const [passwordVisibility, setPasswordVisibility] = React.useState({
        password: false,
        confirmPassword: false,
    });


    return (
        <ParentContainer>
            <HeadingText>Please fill the credentials and click on 'Create Profile'</HeadingText>
            <ComponentsContainer>
                <ComponentsBox>
                    <Text>Name:</Text>
                    <InputField onChange={(event) => handleChange("firstName", event.target.value)} />
                </ComponentsBox>
                <ComponentsBox>
                    <Text>Email ID:</Text>
                    <InputField value={state.email} disabled />
                </ComponentsBox>
                <ComponentsBox>
                    <Text>Select New Password:</Text>
                    <div>
                        <InputField
                            type={passwordVisibility.password ? "text" : "password"}
                            onChange={(event) => handleChange("password", event.target.value)} />
                        {state.password ? passwordVisibility.password ? (
                            <span>
                                <Visibility
                                    className={classes.showicon}
                                    fontSize="small"
                                    style={{ color: "#3E344B" }}
                                    onClick={() => setPasswordVisibility({
                                        ...passwordVisibility,
                                        password: !passwordVisibility.password
                                    })}
                                />
                            </span>
                        ) : (
                            <span>
                                <VisibilityOff
                                    className={classes.showicon}
                                    fontSize="small"
                                    style={{ color: "#3E344B" }}
                                    onClick={() => setPasswordVisibility({
                                        ...passwordVisibility,
                                        password: !passwordVisibility.password
                                    })}
                                />
                            </span>
                        )
                            : null}
                    </div>
                </ComponentsBox>
                <ComponentsBox>
                    <Text>Confirm New Password:</Text>
                    <div>
                        <InputField
                            type={passwordVisibility.confirmPassword ? "text" : "password"}
                            onChange={(event) => handleChange("confirmPassword", event.target.value)} />
                        {state.confirmPassword ? passwordVisibility.confirmPassword ? (
                            <span>
                                <Visibility
                                    className={classes.showicon}
                                    fontSize="small"
                                    style={{ color: "#3E344B" }}
                                    onClick={() => setPasswordVisibility({
                                        ...passwordVisibility,
                                        confirmPassword: !passwordVisibility.confirmPassword
                                    })}
                                />
                            </span>
                        ) : (
                            <span>
                                <VisibilityOff
                                    className={classes.showicon}
                                    fontSize="small"
                                    style={{ color: "#3E344B" }}
                                    onClick={() => setPasswordVisibility({
                                        ...passwordVisibility,
                                        confirmPassword: !passwordVisibility.confirmPassword
                                    })}
                                />
                            </span>
                        )
                            : null}
                    </div>
                </ComponentsBox>
            </ComponentsContainer>
            <CreateProfileButton onClick={() => resetPassword()}>
                Create Profile
            </CreateProfileButton>
            {state.error ? <Error>{state.error}</Error> : ""}
        </ParentContainer>
    )
}

export default AdminRegisterComponent