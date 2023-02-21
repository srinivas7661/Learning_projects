import React from "react";
import styled from "styled-components";
import { Row, Column } from "simple-flexbox";
import CustomSelect from "../../common/components/custom-select";
import { history } from "../../managers/history";
import { makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import CustomTable from "../../common/components/customTable";

const SearchBox = styled.div`
  display: flex;
  margin-right: 10px;
  box-shadow: 0px 4px 15px #00000012;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
  border-radius: 5px;
  width: 238px;
`;
const SearchInput = styled.input`
  font: normal normal normal 15px/20px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  min-width: 150px;
  outline: none;
  border: none;

  margin-left: 5px;

  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
  }
  &::placeholder {
    color: #5c4b75;
    opacity: 0.5;
  }
`;
const Icon = styled.img`
  height: 17.97px;
  width: 17.97px;
  display: flex;
  margin-right: 10px;
  flex-flow: column nowrap;
  margin-top: 2px;
`;
const Btn = styled.button`
  background: #f6cb83;
  box-shadow: 0px 4px 30px #00000012;
  border: none;
  border-radius: 5px;
  text-align: center;
  font: normal normal bold 16px/22px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  width: 140px;
  height: 35px;
  opacity: 1;
  margin-top: 20px;
  @media (min-width: 0px) and (max-width: 767px) {
    display: visible;
  }
  @media (min-width: 769px) {
    display: none;
  }
`;
const BtnRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  background: #f6cb83;
  box-shadow: 0px 4px 30px #00000012;
  border: none;
  border-radius: 5px;
  text-align: center;
  font: normal normal bold 16px/22px Nunito;
  letter-spacing: 0px;
  color: #5c4b75;
  width: 170px;
  height: 35px;
  opacity: 1;
  @media (max-width: 768px) {
    display: none;
  }
`;
const ButtonWrapper = styled.div`
  margin-left: auto;
  /* padding-right:15px; */
`;

const Heading = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font: normal normal bold 20px/27px Nunito;
  color: #5c4b75;
  opacity: 1;
`;
const ParentDiv = styled.div`
  width: 100%;
  padding: 0 25px 25px 25px;
`;

const PostHeader = styled.div`
  color: #7d84c0;
  font-size: 14px;
  display: flex;
  font-weight: bold;
`;
const PostTitle = styled.div`
  color: #3e344b;
  font-size: 14px;
  display: flex;
  margin: 0 0 0 0;
`;
const PostWebView = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 25px;
  @media (max-width: 1025px) {
    display: none;
  }
  @media (min-width: 1025px) {
    display: block;
  }
`;
const TabViewContainer = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 10px;
  width: 100%;
`;
const TabView = styled.div`
  padding: 0 15px 0 15px;
  margin-top: 25px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px #0000001c;
  @media (max-width: 1025px) {
    display: block;
  }
  @media (min-width: 1025px) {
    display: none;
  }
`;
const PostHeaderContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
`;

function FeedsComponent(props) {
  const { state } = props;

  return (
    <>
      <ParentDiv className="P-40">
        <Heading>Feeds</Heading>
        <Row>
          <Column>
            <SearchBox>
              <SearchInput
                placeholder="Search"
                onChange={(event) => props.onSearchChange(event.target.value)}
              />
              <Icon src="/images/Search.svg" />
            </SearchBox>
          </Column>
          <CustomSelect
            title="Published On"
            valueKey="addedOn"
            options={state.dateOptions}
            handleChange={props.handleDropDownChange}
          />

          <CustomSelect
            title="Published By"
            valueKey="name"
            options={state.publishedOptions}
            handleChange={props.handleDropDownChange}
          />
          <ButtonWrapper>
            <Button onClick={() => history.push("/new-post")}>New Post</Button>
          </ButtonWrapper>
        </Row>
        <PostWebView>
          <CustomTable
            className=""
            tableHeading={""}
            columns={state.tableColumns}
            rows={state.feeds}
            isCheckBoxVisible={false}
          />
        </PostWebView>
        <TabView>
          {state.feeds && state.feeds.length
            ? state.feeds.map((item, index) => {
                return (
                  <div key={index}>
                    <PostViewTab post={item} />
                    <Divider />
                  </div>
                );
              })
            : ""}
        </TabView>
      </ParentDiv>
    </>
  );
}

const ImageContainer = styled.div`
  height: 110px;
  width: 170px;
  align-items: center;
  display: flex;
  margin-right: 15px;
`;

const FeedImage = styled.img`
  width: auto;
  height: auto;
  max-height: 100%;
  max-width: 100%;
  margin: auto;
`;
const PostViewTabContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 10px 0;
`;

const PostViewTab = (props) => {
  const { post } = props;
  return (
    <PostViewTabContainer>
      <ImageContainer>
        <FeedImage src={post.picture?.props?.src} />
      </ImageContainer>
      <TabViewContainer>
        <PostHeaderContainer>
          <Column>
            <PostHeader>Post Title</PostHeader>
          </Column>
          {post.flags}
        </PostHeaderContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostTableTab rows={[post]} />
      </TabViewContainer>
    </PostViewTabContainer>
  );
};

const PostTableTab = ({ rows }) => {
  return rows && rows.length
    ? rows.map((item, index) => {
        return (
          <Column key={index} className="margin-top-10-px">
            <Row className="justify-content-between margin-bottom-10-px">
              <Column>
                <PostHeader>Date and Time</PostHeader>
                <PostTitle>{item.addedOn}</PostTitle>
              </Column>
              <Column>
                <PostHeader>Posted By</PostHeader>
                <PostTitle>{item.name}</PostTitle>
              </Column>
              <Column>
                <PostHeader>Views</PostHeader>
                <PostTitle>{item.views}</PostTitle>
              </Column>
              <Column>
                <PostHeader>Status</PostHeader>
                <PostTitle>{item.status}</PostTitle>
              </Column>
            </Row>
          </Column>
        );
      })
    : "";
};

export default FeedsComponent;
