import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Utility from "../../utility";
import { adminRoleConstants } from "../../constants";
import { TextField } from "@material-ui/core";
import useWindowDimensions from "../../common/windowDimensions";
import Back from "../../assets/SVGs/back.svg"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${"" /* width: 90%; */}
  width: 80%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 11px 0 0 0;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.span`
  text-align: left;
  font: normal normal 14px/17px Inter;
  letter-spacing: 0;
  color: #151e58;
  font-weight: 600;
  padding: 22px 0 0;
`;
const CheckBoxText = styled.span`
  text-align: left;
  font: normal normal 14px/17px Barlow;
  letter-spacing: 0;
  color: #535877;
  margin-bottom: 4px;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;
const Input = styled.input`
  display: flex;
  flex-direction: column;
  ${"" /* width: 456px; */}
  height: 34px;
  background: #f8f8f8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  margin-top: 32px;
  border: 1px;
  padding-left: 10px;

  &::placeholder {
    font: normal normal 14px/17px Barlow;
    letter-spacing: 0;
    color: #c8ccdb;
    padding-left: 0px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const TextInputField = styled.input`
  display: flex;
  flex-direction: column;
  ${"" /* width: 456px !important; */}
  height: 34px !important;
  background: #f8f8f8 0% 0% no-repeat padding-box !important;
  border-radius: 4px !important;
  //margin-top: 12px;
  border: none !important;
  padding-left: 10px !important;

  &::placeholder {
    font: normal normal 14px/17px Barlow;
    letter-spacing: 0;
    color: #c8ccdb;
    padding-left: 0px;
  }
`;
const Btn = styled(Button)`
  width: 95px;
  height: 34px;
  font: normal normal 14px/17px Barlow;
  letter-spacing: 0;
  background-color: #6874e8 !important;
  color: #ffffff !important;
  margin-top: 36px !important;
`;
const BtnDisabled = styled.button`
  width: 95px;
  height: 34px;
  cursor: not-allowed !important;
  background: #6874e8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 0.56;
  color: #ffffff;
  margin-top: 36px !important;
  font: normal normal 14px/17px Barlow;
  letter-spacing: 0;
  border: none;
`;

const Title = styled.span`
  text-align: left;
  font: normal normal 18px/22px Barlow;
  font-weight: 600;
  letter-spacing: 0;
  color: #151e58;
  padding-bottom: 12px;
  @media (max-width: 767px) {
    padding: 18px 0;
  }
`;
const CloseIcon = styled.span`
  color: #151e58;
  width: 24px;
  height: 24px;
  text-align: right;
  cursor: pointer;
`;
const BackIcon = styled(CloseIcon)`
  margin: 18px;
`;

const ErrorMessage = styled.span`
  text-align: left;
  font: normal normal 18px/22px Barlow;
  letter-spacing: 0;
  color: #fa021f;
`;
const DialogContentTextNew = styled(DialogContentText)`
  width: 100%;
`;
const DialogContentNew = styled.div`
  background-color: #ffffff;
  padding: 24px 16px !important;
  margin: 0 16px 16px 16px;
  border-radius: 6px;
  box-shadow: 0px 3px 12px #0000000D;
`;
const SubCheckbox = styled(Checkbox)`
  padding: 0px !important;
  margin: 8px 8px 10px 0px !important;
`;

const SubAdminDialog = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [store, setStore] = useState(false);
  const [subAdmin, setSubAdmin] = useState(false);
  const [content, setContent] = useState(false);
  const [token, setToken] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [permissionError, setPermissionError] = useState("");
  const [isDataEdited, setIsDataEdited] = useState(false);
  const CHARACTER_LIMIT = 30;

  useEffect(() => {
    setName(props?.selectedAdmin?.name || "");
    setEmail(props?.selectedAdmin?.email || "");
    setStore(
      Utility.checkRoleExistInRoleString(
        props?.selectedAdmin?.user_metadata?.role || "",
        adminRoleConstants.storefront_admin
      )
    );
    setSubAdmin(
      Utility.checkRoleExistInRoleString(
        props?.selectedAdmin?.user_metadata?.role || "",
        adminRoleConstants.sub_admin
      )
    );
    setContent(
      Utility.checkRoleExistInRoleString(
        props?.selectedAdmin?.user_metadata?.role || "",
        adminRoleConstants.content_admin
      )
    );
    setToken(
      Utility.checkRoleExistInRoleString(
        props?.selectedAdmin?.user_metadata?.role || "",
        adminRoleConstants.token_admin
      )
    );
  }, [props.selectedAdmin]);

  let emailVaildateNew = Utility.validateEmail(email);

  function validateInformation() {
    let nameError = !name ? "Enter the valid name" : "";
    let emailError = !emailVaildateNew ? "Enter the valid email " : "";
    let permissionError =
      !store && !subAdmin && !content && !token
        ? "Select one of the permission"
        : "";
    setNameError(nameError);
    setEmailError(emailError);
    setPermissionError(permissionError);
    return !!(nameError || emailError || permissionError);
  }

  function onClickButtonAction() {
    if (validateInformation()) return;
    let requestData = {
      name,
      email,
      role: Utility.getAdminRoleString({ store, subAdmin, content, token }),
    };
    props.onClickHandler(requestData);
  }
  const { height, width } = useWindowDimensions();

  return (
    <Dialog
      open={props.isOpen}
      aria-labelledby="form-dialog-title"
      className="sub-admin-popup sub-padding-0"
    >
      {width < 767 && (
        <div className="display-flex">
          <BackIcon onClick={() => props.closeDialog(false)}>
            <img src={Back} />
          </BackIcon>
          <Title>{props.title || ""}</Title>
        </div>
      )}
      <DialogContentNew>
        <Row className="justify-s-b w-100-per m-t-10">
          <DialogContentTextNew>
            <div className="">
              {width > 767 && (
                <div className="display-flex justify-s-b">
                  <Title>{props.title || ""}</Title>
                  <CloseIcon onClick={() => props.closeDialog(false)}>
                    <img src="/images/Close.svg" />
                  </CloseIcon>
                </div>
              )}
              <MainContainer>
                <TextInputField
                  type="text"
                  name={"name"}
                  placeholder={"Name"}
                  value={name}
                  inputProps={{
                    maxlength: CHARACTER_LIMIT,
                  }}
                  onChange={(event) => {
                    setName(event.target.value);
                    setNameError("");
                  }}
                  onInput={() => setIsDataEdited(true)}
                  helperText={`${name.length}/${CHARACTER_LIMIT}`}
                  className="input-br-bottom"
                />
                {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
                <Input
                  type="text"
                  name={"email"}
                  placeholder={"Email"}
                  value={email}
                  onInput={() => setIsDataEdited(true)}
                  onChange={(event) => {
                    // let validateEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(event.target.value);
                    // validateEmail == true ? setEmail(event.target.value):setEmail(event.target.value)
                    //  setEmailError('')
                    setEmail(event.target.value);
                  }}
                />
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
                <Text>Provide Permission to</Text>
              </MainContainer>
              <CheckboxContainer>
                <Column>
                  <Row>
                    <SubCheckbox
                      checked={store}
                      onChange={() => {
                        setStore(!store);
                        setPermissionError("");
                      }}
                      size="12px"
                      sx={{
                        color: "#9495A8",
                        "&.Mui-checked": {
                          color: "#6874E8",
                        },
                      }}
                      className="input-checkbox"
                      onInput={() => setIsDataEdited(true)}
                    />
                    <CheckBoxText>Manage Storefront</CheckBoxText>
                  </Row>
                  <Row>
                    <SubCheckbox
                      checked={subAdmin}
                      onChange={() => {
                        setSubAdmin(!subAdmin);
                        setPermissionError("");
                      }}
                      size="12px"
                      sx={{
                        color: "#9495A8",
                        "&.Mui-checked": {
                          color: "#6874E8",
                        },
                      }}
                      className="input-checkbox"
                      onInput={() => setIsDataEdited(true)}
                    />
                    <CheckBoxText>Manage Sub admins</CheckBoxText>
                  </Row>
                </Column>
                <Column>
                  <Row>
                    <SubCheckbox
                      checked={content}
                      onChange={() => {
                        setContent(!content);
                        setPermissionError("");
                      }}
                      size="12px"
                      sx={{
                        color: "#9495A8",
                        "&.Mui-checked": {
                          color: "#6874E8",
                        },
                      }}
                      className="input-checkbox"
                      onInput={() => setIsDataEdited(true)}
                    />
                    <CheckBoxText>Manage Content</CheckBoxText>
                  </Row>
                  <Row>
                    <SubCheckbox
                      checked={token}
                      onChange={() => {
                        setToken(!token);
                        setPermissionError("");
                      }}
                      size="12px"
                      sx={{
                        color: "#9495A8",
                        "&.Mui-checked": {
                          color: "#6874E8",
                        },
                      }}
                      className="input-checkbox"
                      onInput={() => setIsDataEdited(true)}
                    />
                    <CheckBoxText>Manage Token listing</CheckBoxText>
                  </Row>
                </Column>
              </CheckboxContainer>
            </div>
            {permissionError && <ErrorMessage>{permissionError}</ErrorMessage>}
          </DialogContentTextNew>
        </Row>

        <Column>
          <DialogActions className="sub-admin-btnDiv">
            {name || email || store || subAdmin || content || token ? (
              isDataEdited === false ? (
                <BtnDisabled>{props.buttonText || ""}</BtnDisabled>
              ) : (
                <Btn onClick={() => onClickButtonAction()}>
                  {props.buttonText || ""}
                </Btn>
              )
            ) : (
              <BtnDisabled>Add</BtnDisabled>
            )}
          </DialogActions>
        </Column>
      </DialogContentNew>
    </Dialog>
  );
};
export default SubAdminDialog;
