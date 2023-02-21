import React from "react";
import styled from "styled-components";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/styles";

const Image = styled.img`
  width: 160px;
  height: 55px;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

const Box = styled.div`
  max-width: 720px;
  min-width: 410px;
  border-radius: 5px;
  background-color: #ffffff;
  padding: 35px;
  margin-top: 35px;
  margin-bottom: 75px;
  box-shadow: 0px 4px 15px #00000012;
`;

const InputBox = styled.input`
  max-width: 400px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 4px 30px #00000012;
  border: 0.4000000059604645px solid #acacac;
  background-color: #ffffff;
  margin-bottom: 10px;
  padding: 9px 9px;
  font-size: 12px;
  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  max-width: 400px;
  width: 100%;
  border-radius: 4px;
  border: none;
  background-color: #5c4b75;
  padding: 12px 0px;
  color: #fff4f3;
  box-shadow: 0px 4px 30px #00000012;
  font-size: 12px;
  margin-bottom: 16px;
  margin-top: 20px;
`;

const Text = styled.div`
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #acacac;
  font-family: system-ui;
`;
const SignIn = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #acacac;
  margin-right: auto;
  margin-left: 40px;
  margin-bottom: 10px;
`;
const Redirect = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: #5c4b75;
  cursor: pointer;
::hover{
  color: #5c4b75 !important;
}
`;
const Heading = styled.h4`
  margin-bottom: 18px;
  font: normal normal normal 16px/22px Nunito;
  margin-top: 10px;

  color: #3e344b;
  text-align: center;
`;

const Align = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 100vh;
  align-items: center !important;
  box-sizing: border-box;
  background-color: #fff4f3;
  justify-content: center;
`;
const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: "-30px",
  },
}));

function ResetPasswordForm(props) {
  const classes = useStyles();
  const [newPassword, setnewPassword] = React.useState(false);
  const [confirmPassword, setconfirmPassword] = React.useState(false);

  const toggleNewPassword = () => {
    setnewPassword(newPassword ? false : true);
  };
  const toggleConfirmPassword = () => {
    setconfirmPassword(confirmPassword ? false : true);
  };

  return (
    <Align>
      <Box>
        <form onSubmit={(event) => props.resetPassword(event)}>
          <Image src="/images/Logo.svg"></Image>
          <Heading>Reset your password here</Heading>
          <Text>Email:</Text>
          <InputBox
            onChange={(event) => props.handleChange("email", event.target.value)}
            type="email"
            name="email" />

          <Text>Enter New Password:</Text>
          <InputBox
            onChange={(event) => props.handleChange("password", event.target.value)}
            type={newPassword ? "text" : "password"}
          ></InputBox>
          <span>
            {newPassword ? (
              <VisibilityIcon
                className={classes.icon}
                fontSize="small"
                style={{ color: "#3E344B" }}
                onClick={toggleNewPassword}
              />
            ) : (
              <VisibilityOff
                className={classes.icon}
                fontSize="small"
                style={{ color: "#3E344B" }}
                onClick={toggleNewPassword}
              />
            )}
          </span>
          <Text>Confirm New Password:</Text>
          <InputBox
            onChange={(event) => props.handleChange("confirmPassword", event.target.value)}
            type={confirmPassword ? "text" : "password"}
          ></InputBox>
          <span>
            {confirmPassword ? (
              <VisibilityIcon
                className={classes.icon}
                fontSize="small"
                style={{ color: "#3E344B" }}
                onClick={toggleConfirmPassword}
              />
            ) : (
              <VisibilityOff
                className={classes.icon}
                fontSize="small"
                style={{ color: "#3E344B" }}
                onClick={toggleConfirmPassword}
              />
            )}
          </span>
          <SubmitButton type="submit">Reset Password</SubmitButton>
        </form>
      </Box>
      <SignIn>
        Return to <Redirect href="/">Sign In</Redirect>
      </SignIn>
    </Align>
  );
}
export default ResetPasswordForm;
