import React from "react";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import ReactQuill from "react-quill";
import { Column, Row } from "simple-flexbox";
import EditorToolbar, { modules, formats } from "./editorToolbar";
import "react-quill/dist/quill.snow.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import { history } from "../../managers/history";

const Heading = styled.div`
  font: normal normal bold 20px/27px Nunito;
  color: #5c4b75;
  margin-top: 50px;
  padding-left: 15px;
`;
const Title = styled.div`
  text-align: left;
  font: normal normal normal 16px/22px Nunito;
  letter-spacing: 0px;
  color: #686868;
  margin: 25px 0px 10px 0px;
  padding-left: 15px;
`;
const TitleInput = styled.input`
  margin-top: 5px;
  border: 1px solid #ccc;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 7px;
  opacity: 1;
  max-width: 758px;
  width: 100%;
  height: 60px;
  margin-left: 15px;
`;
const Input = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`;
const InputButton = styled.label`
  width: 20%;
  margin: 0;
  height: 40px;
  background: #7d84c0 0% 0% no-repeat padding-box;
  border-radius: 5px;
  color: #fff4f3;
  opacity: 1;
  align-items: center;
  display: flex;
  justify-content: center;
`;
const InputDiv = styled.div`
  display: flex;
  flex-flow: row;
  border: 1px solid #ccc;
  max-width: 758px;
  width: 100%;
  height: 60px;
  border-radius: 5px;
  padding: 10px;
  margin-left: 15px;
`;

const PPButton = styled.button`
  width: 140px;
  height: 45px;
  margin-left: 15px;
  background: var(--unnamed-color-7d84c0) 0% 0% no-repeat padding-box;
  background: #7d84c0 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 30px #00000012;
  text-align: center;
  letter-spacing: 0px;
  color: #fff4f3;
  border-radius: 5px;
  opacity: 1;
  border: 0.30000001192092896px solid white;
  font: normal normal bold 16px/22px Nunito;
`;
const PButton = styled.button`
  width: 150px;
  float: right;
  height: ${(props) => (props.isTab ? "35px" : "45px")};
  background: #f6cb83 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 30px #00000012;
  border-radius: 5px;
  color: #5c4b75;
  opacity: 1;
  border: none;
  outline: none;
  font: normal normal bold 16px/22px Nunito;
`;
const SButton = styled.button`
  width: 140px;
  height: 45px;
  float: right;
  margin-right: 10px;
  background: #acacac 0% 0% no-repeat padding-box;
  box-shadow: 0px 4px 30px #00000012;
  border-radius: 5px;
  color: #686868;
  opacity: 0.58;
  box-shadow: none;
  border: none;
  font: normal normal bold 16px/22px Nunito;
`;
const BtnDiv = styled.div`
  width: 100%;
  max-width: 758px;
  height: 45px;
  margin: 20px 0 20px 0;
`;

const Icon = styled.img`
  height: 20px;
`;
const DButton = styled.button`
  height: 35px;
  width: 150px;
  margin-left: 10px;
  background: #00134d;
  box-shadow: 0px 4px 30px #00000012;
  border-radius: 5px;
  color: white;
  border: none;
  outline: none;
  opacity: 0.58;
  text-align: center;
  font: normal normal bold 16px/22px Nunito;
  letter-spacing: 0px;
`;

const PHeading = styled.label`
  text-align: left;
  font: normal normal bold 20px/27px Nunito;
  letter-spacing: 0px;
  color: #686868;
  opacity: 1;
`;

const PostPreviewHeading = styled.div`
  text-align: left;
  font: normal normal bold 20px/27px Nunito;
  letter-spacing: 0px;
  color: #686868;
  opacity: 1;
`;
const Image = styled.img`
  margin-top: 10px;
  height: 100%;
`;

const Parent = styled.div`
  display: flex;
  flex-flow: column;
  padding: 0 30px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 400px;
`;
const BackPost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const BackIcon = styled.div`
  margin: 50px 0px 0px 15px ;
`

function NewPostComponent(props) {
  const { state, handleChange, addFeeds } = props;

  return (
    <Parent>
      <div className="w-99-pr">
        <BackPost>
          <BackIcon>
        <ArrowBackIcon />
        </BackIcon>
        <Heading className="margin-bottom-25">New Post</Heading>
        </BackPost>
        <div className="margin-top-80-px">
        <Title>Post Title</Title>
        <TitleInput
          value={state.title}
          onChange={(event) => handleChange("title", event.target.value)}
        />
        <Title>Post Thumbnail Image</Title>
        <InputDiv>
          <Input>{state.fileName ? state.fileName : state.file?.name}</Input>
          <InputButton for={"post-image"}>Select File</InputButton>
        </InputDiv>
        <input
          id="post-image"
          type="file"
          className="display-none"
          onChange={(event) => handleChange("file", event.target.files[0])}
        />
        <Title>Post Content</Title>
        {RQeditor(props)}
        <BtnDiv>
          <PPButton onClick={() => props.handleChange("drawer", true)}>
            Post Preview
          </PPButton>
          <PButton isTab={false} onClick={() => addFeeds(false)}>
            Publish
          </PButton>
          <SButton onClick={() => addFeeds(true)}>Save as draft</SButton>
        </BtnDiv>
        {/*---post preview drawer---*/}
        <Drawer
          anchor={"right"}
          open={props.state.drawer}
          onClose={() => props.handleChange("drawer", false)}
          variant={"persistent"}
          className="drawer-width-tab"
        >
          <Column className="w-400-px  h-100-per w-100-per-tab padding-10px">
            <Row className="display-block display-none-web justify-content-between align-items-center margin-top-25">
              <PostPreviewHeading>Post Preview</PostPreviewHeading>
              <Icon
                onClick={() => props.handleChange("drawer", false)}
                src="/images/cross.svg"
              />
            </Row>
            <div className="display-flex-tab display-none margin-top-25">
              <Row className="w-100-per align-items-center">
                <Icon
                  onClick={() => props.handleChange("drawer", false)}
                  src="/images/back.svg"
                />
                <div className="margin-left-10 fw-bold">Post Preview</div>
              </Row>
              <Row className="w-100-per align-items-center justify-content-end">
                <PButton isTab={true} onClick={() => addFeeds(false)}>
                  Publish
                </PButton>
                <DButton onClick={() => history.push("/feeds")}>
                  Discard
                </DButton>
              </Row>
            </div>
            {state.picture ? (
              <ImageContainer>
                <Image src={state.picture}></Image>
              </ImageContainer>
            ) : (
              ""
            )}
            <PHeading style={{ marginTop: "25px" }}>{state.title}</PHeading>
            <br></br>
            <Column className={"margin-top-25"} id={"content"}>
              {state.content}
            </Column>
          </Column>
        </Drawer>
        </div>
      </div>
    </Parent>
  );
}

function RQeditor(props) {
  const { state } = props;
  // const handleChange = value => {

  // };
  return (
    <>
      <div className="text-editor">
        <EditorToolbar />
        <ReactQuill
          className="scrollbar "
          theme="snow"
          value={state.content}
          onChange={(content) => props.handleChange("content", content)}
          placeholder=""
          modules={modules}
          formats={formats}
        />
      </div>
    </>
  );
}

export default NewPostComponent;
