import React from "react";
import styled from "styled-components";
import { Row, Column } from "simple-flexbox";
import { Drawer, Divider } from "@material-ui/core";
import { history } from "../../managers/history";
import { makeStyles } from '@material-ui/styles';

import CustomTable from "../../common/components/customTable";
import CustomSelect from "../../common/components/custom-select";



const SearchContainer = styled.div`
    display:flex;
    flex-flow:row nowrap;
    background-color: #ffffff;
    border-radius: 3px;
    margin-right: 10px;
    height: 35px;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 15px #00000012;
`

const Image = styled.img`
  height: 15px;
  width: 15px;
  margin-right: 10px;
    margin-top: 5px;
`;



const SearchBox = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items:center;
  flex-flow: row nowrap;
  height: 100%;
  border-radius: 3px;
`;
const SearchInput = styled.input`
 font-size: 14px;
  min-width: 150px;
  outline: none;
  border: none;
  border-radius:3px;
  margin-left:5px;
  background-color:#ffffff;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  &:focus{
    outline:none;
    border:none;

  }
  &::placeholder {
    color: #5C4B75;
    opacity:0.5;
}
`;
const Icon = styled.img`
  height: 13px;
  width: 13px;
  display: flex;
  flex-flow: column nowrap;
  margin-right: 10px;
`;


const Review = styled.button`
background: #7D84C0 0% 0% no-repeat padding-box;
 box-shadow: 0px 4px 5px #0000001C;
border-radius: 5px;
text-align: center;
font: normal normal bold 16px/22px Nunito;
letter-spacing: 0px;
color: #FFF4F3;
font-size: 1em;
height: 35px;
padding: 0.2em 3em;
font-size: small;
margin-top: 10px;
border: none;

`;
const Publishbutton = styled.button`
 background: var(--unnamed-color-7d84c0) 0% 0% no-repeat padding-box;
 background: #F6CB83 0% 0% no-repeat padding-box;
 box-shadow: 0px 4px 5px #0000001C;
border-radius: 5px;
text-align: center;
font:  normal normal 16px/22px Nunito;
letter-spacing: 0px;
color: #5C4B75;
font-size: 1em;
height: 35px;
padding: 0.2em 3em;
font-size: small;
border: none;
`;

const Heading = styled.div`
font: normal normal bold 20px/27px Nunito;
color: #5c4b75;
opacity: 1;
`;

const PostHeader = styled.div`
color: #7D84C0;
font-size: 14px;
display: flex;
font-weight: bold;
`
const PostTitle = styled.div`
color: #3E344B;
font-size: 14px;
display: flex;
margin: 10px 0 10px 0;
`

const Text = styled.div`
  font: normal normal bold 20px/27px Nunito;
  color: #5c4b75;
  font-size: 14px;
  opacity: 1;
`;

const Button = styled.button`
  background: #f6cb83;
  border-radius: 5px;
  height: 35px;
  color: #5c4b75;
  font: normal normal bold 16px/22px Nunito;
  width: 170px;
  border: none;
   @media (max-width: 1025px) {
    display: ${props => props.tab ? "block" : "none"};
   }
   @media (min-width: 1025px) {
    display: ${props => !props.tab ? "block" : "none"};
   }
`;

const PostHeaderContainer = styled.div`
display: flex;
flex-flow: row;
align-items: center;
justify-content: space-between;
margin-top: 15px;
`
const TabViewContainer = styled.div`
display: flex;
flex-flow: column;
margin-top: 10px;
`

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
`
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
`

const useStyles = makeStyles({
  headerStyle: {
    color: "#7D84C0",
    textAlign: "left",
    font: 'normal normal bold 14px/19px Nunito',
    borderBottom: 'none !important',
    padding: "0 10px 5px 0"
  },
  bodyStyle: {
    textAlign: "left",
    font: 'normal normal normal 16px/22px Nunito',
    color: "#3E344B",
    opacity: "1",
    padding: "0 10px 15px 0"
  },
});

const Container = styled.div`
  display: flex;
  // max-width: 1200px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 50px 25px 25px 25px;
`;

function PostComponent(props) {
  const { state } = props
  return (
    <Container>
      <Row justifyContent="space-between">
        <Row className="align-items-center w-100-per justify-content-between">
          <Row>
            <img height="25px" src="/images/simpleback.png" onClick={() => history.push("/community")} />
            <Heading>{state.postTitle}</Heading>
          </Row>
          <Button tab={true} onClick={() => history.push("/community")}>New Category</Button></Row>
      </Row>

      <Row className={"justify-content-between margin-top-25"}>
        <Row className="w-100-per">
          <SearchContainer>
            <SearchBox>
              <SearchInput placeholder="Search" onChange={(event) => props.onSearchChange(event.target.value)} />
              <Icon src="/images/Search.svg" />
            </SearchBox>
          </SearchContainer>
          <CustomSelect title="Publish Date" valueKey="addedOn" options={state.dateOptions} handleChange={props.handleDropDownChange} />
          <CustomSelect title="Publish By" valueKey="name" options={state.publishedOptions} handleChange={props.handleDropDownChange} />
        </Row>
        <Button tab={false} onClick={() => history.push("/community")}>New Category</Button>
      </Row>

      <PostWebView>
        <CustomTable
          tableHeading={""}
          columns={state.tableColumns}
          rows={state.posts}
          isCheckBoxVisible={false}
        />
      </PostWebView>

      <TabView>
        {state.posts && state.posts.length ? state.posts.map((item, index) => {
          return (
            <PostViewTab post={item} key={index} />
          )
        }) : ""}
      </TabView>

      {Publish(props)}
    </Container>
  );
}


const PostViewTab = (props) => {
  const { post } = props
  return (
    <TabViewContainer>
      <PostHeaderContainer>
        <Column>
          <PostHeader>
            Post Title
          </PostHeader>
        </Column>
        {post.flags}
      </PostHeaderContainer>
      <PostTitle>
        {post.title}
      </PostTitle>
      <PostTableTab
        rows={[post]}
      />
    </TabViewContainer>
  )
}


const PostTableTab = ({ rows }) => {

  return (
    rows && rows.length ? rows.map((item, index) => {
      return (
        <Column key={index}>
          <Row className="justify-content-between margin-bottom-10-px">
            <Column>
              <PostHeader>
                Date and Time
              </PostHeader>
              <PostTitle>
                {item.addedOn}
              </PostTitle>
            </Column>
            <Column>
              <PostHeader>
                Posted By
              </PostHeader>
              <PostTitle>
                {item.name}
              </PostTitle>
            </Column>
            <Column>
              <PostHeader>
                Likes
              </PostHeader>
              <PostTitle>
                {item.likes}
              </PostTitle>
            </Column>
            <Column>
              <PostHeader>
                Comments
              </PostHeader>
              <PostTitle>
                {item.comments}
              </PostTitle>
            </Column>
            <Column>
              <PostHeader>
                Status
              </PostHeader>
              <PostTitle>
                {item.status}
              </PostTitle>
            </Column>
          </Row>
          <Divider />
        </Column>
      )
    }) : ''
  );
};


const ReviewParent = styled.div`
display: flex;
flex-flow: column;
height: 100%;
min-width: 300px;
padding: 10px;
justify-content: space-between;
`

const PostContent = styled.div`
margin-top: 10px;
font-size: 14px;
`
const PreviewTitle = styled.span`
font-size: 14px;
font-weight:bold;
margin-top: 10px;
`


const Publish = (props) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor={"right"}
      open={props.state.drawer}
      onClose={() => props.handleChange("drawer", false)}
      variant={'persistent'}
      classes={{ paper: classes.drawer }}
    >
      <ReviewParent>
        <Column>
          <Row className="justify-content-between">
            <Text>Publish Post</Text>
            <Image onClick={() => props.handleChange("drawer", false)} src="/images/cancel.png" />
          </Row>
          <Column className="align-items-center margin-top-25">
            <PreviewTitle>
              {props.state.selectedPost?.title}
            </PreviewTitle>
            <div className="card ">
              <img className="h-100-per" src={props.state.selectedPost?.picture} />
              <PostContent>
                {props.state.selectedPost?.content}
              </PostContent>
            </div>
          </Column>
        </Column>

        <Column>
          <Publishbutton onClick={() => props.acceptPost(props.state.selectedPost?.id)}>Publish</Publishbutton>
          <Review
            onClick={() => props.rejectPost(props.state.selectedPost?.id)}>
            Reject
          </Review>
        </Column>
      </ReviewParent>
    </Drawer>
  );
};

export default PostComponent;