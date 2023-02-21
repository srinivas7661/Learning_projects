import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import UploadFile from "./upload";
import styled from "styled-components";
import NoRecordPlaceholderComponent from "../../common/components/NoRecordPlaceholderComponent";
import Back from "../../assets/SVGs/back.svg"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 51px 79px 65px 71px;
  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 22px 23px;
    height: 100vh;
  }
  @media (max-width: 767px) {
    margin: 22px 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Text = styled.span`
  color: #151e58;
  font-size: 18px;
  font-weight: 600;
  margin-right: 18px;
`;

const SearchBox = styled.div`
  width: 287px;
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 0px 13px 0px 12px;
  @media (max-width: 767px) {
    width: 100%;
    height: 40px;
    margin: 16px 0 13px 0;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
`;

const SearchImage = styled.img`
  width: 14px;
  height: 14px;
`;

const Button = styled.button`
  background-color: #6874e8;
  color: #ffffff;
  border-radius: 4px;
  font-size: 14px;
  opacity: 1;
  border: none;
  height: 34px;
  width: 82px;
  @media (max-width: 767px) {
    width: 50%;
    height: 40px;
  }
`;

const AddButton = styled.button`
  background-color: #6874e8;
  color: #ffffff;
  border-radius: 4px;
  font-size: 14px;
  opacity: 1;
  border: none;
  height: 34px;
  width: 95px;
`;

const Cross = styled.span`
  cursor: pointer;
  color: #151e58;
`;
const CrossImg = styled.img`
  cursor: pointer;
`;
const AddIconText = styled.span`
  color: #535877;
  font-size: 14px;
`;

const PngText = styled.p`
  color: #535877;
  font-size: 12px;
`;

const CategoryInput = styled.input`
  background-color: #f8f8f8;
  border-radius: 4px;
  margin-top: 16px;
  border: none;
  outline: none;
  padding-left: 10px;
  width: 310px;
  height: 34px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const MaxText = styled.p`
  color: #848cbf;
  font-size: 10px;
  text-align: right;
  margin-top: 10px;
`;

const ButtonDiv = styled.div`
  text-align: right;
`;

const BodyContainer = styled.div`
  height: 100vh;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 3px 12px #0000000d;
  border: 1px solid #f0f0f0;
  ${"" /* height: 100vh; */}
  padding: 32px 30px;
  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 32px 0 0 25px;
    height: 100vh;
  }
  @media (max-width: 767px) {
    padding: 16px;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageDiv = styled.div`
  width: 88px;
  height: 88px;
  border: 1px solid #efefef;
  border-radius: 6px;
  background-color: #f0f0f6;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Category = styled.div`
  width: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 55px 0 0;
  ${"" /* margin: 0 5px 5px 0; */}
  @media (min-width:768px) and (max-width: 1024px) {
    margin: 0 50px 0 0;
  }
  @media (max-width: 767px) {
    margin: 0 6px 0 0;
  }
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

const CategoryText = styled.p`
  color: #535877;
  font-size: 14px;
  font-weight: 500;
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Head = styled.div`
  height: 386px !important;
  width: 356px !important;
`;

const DialogContentBox = styled(DialogContent)`
  width: 356px;
`;

const ErrorMessage = styled.span`
  text-align: left;
  font: normal normal medium 18px/22px Barlow;
  letter-spacing: 0;
  color: #fa021f;
  display: flex;
`;

const MobileCategory = styled.div`
padding: 16px;
display: flex;
background-color: #F0F0F6;
width: 100%;
min-height: 100vh;
top: 75px;
left:0;
z-index: 1000;
position: fixed;
@media (min-width:768px) {
  display: none;
}
`

export default function Categories(props) {
  const { handlesearchCategory } = props;
  const [open, setOpen] = useState(false);

  const [nameNew, setNameNew] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const [nameError, setNameError] = useState("");
  const [profileImgError, setProfileImgError] = useState("");

  const isValid =
    props.state.categoryName.length && props.state.imageUrl.length;

  const createCategoryData = () => {
    // if (props.state.categoryName !== "" && props.state.imageUrl !== "")
    if (isValid <= 0) {
      // props.handleAddCategory(props.state);
      // setOpen(!open);
      return;
    } else {
      // alert("All field the mandatory");
      props.handleAddCategory(props.state);
      setOpen(!open);
    }
  };

  const handleClick = () => {
    setOpen(!open);
    props.state.imageUrl = "";
    props.state.categoryName = "";
  };

  function validateInformation() {
    let profileImgError = !props.state.imageUrl
      ? "Insert PNG, JPG, SVG Image"
      : "";
    let nameError = !props.state.categoryName ? "Enter category name" : "";

    setNameError(nameError);
    setProfileImgError(profileImgError);
  }
  return (
    <MainContainer>
      <Header>
        <Div>
          <Text>Categories</Text>
          <SearchBox>
            <Input
              placeholder="Search"
              className="search-input"
              onChange={(e) => {
                var text = e.target.value;
                var searchHash = text.replace(/\s/g, "");
                handlesearchCategory(searchHash);
              }}
            />

            <SearchImage src="/images/search.svg" alt="search" />
          </SearchBox>
        </Div>
        <Button onClick={handleClick}>Create</Button>
        <Dialog
          open={open}
          // onClose={handleClick}
          className="Dialog-Box-Container"
        >
          <DialogTitle>
            <DialogHeader>
              <Text>Create Category</Text>
              <Cross onClick={handleClick}>x</Cross>
            </DialogHeader>
          </DialogTitle>
          <DialogContentBox>
            <DialogContentText>
              <AddIconText>Add Icon</AddIconText>
              <PngText>(PNG,JPG,SVG file min 300X300 px resolution)</PngText>
              <div>
                <UploadFile
                  setImageUrl={props.setImageUrl}
                  setProfileImg={setProfileImgError}
                />
                {profileImgError && (
                  <ErrorMessage>{profileImgError}</ErrorMessage>
                )}
              </div>
              <CategoryInput
                onChange={(e) => {
                  props.setCategoryName(e.target.value);
                  setNameNew(e.target.value);
                  setNameError("");
                }}
                type="text"
                maxLength="25"
                className="search-input"
                placeholder="Category Name"
              ></CategoryInput>
              {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

              <MaxText>Maximum 25 characters</MaxText>

              <ButtonDiv>
                <Button
                  onClick={() => {
                    createCategoryData();
                    validateInformation();
                  }}
                >
                  Create
                </Button>
              </ButtonDiv>
            </DialogContentText>
          </DialogContentBox>
        </Dialog>
        {open &&
        (<MobileCategory>
          <div className="create-category-container">
            <div className="create-category-title">
              <img onClick={handleClick} src={Back} />
              <h1>Create Category</h1>
            </div>
            <DialogContentText className="mobile-category-context">
              <AddIconText>Add Icon</AddIconText>
              <PngText>(PNG,JPG,SVG file min 300X300 px resolution)</PngText>
              <div>
                <UploadFile
                  setImageUrl={props.setImageUrl}
                  setProfileImg={setProfileImgError}
                />
                {profileImgError && (
                  <ErrorMessage>{profileImgError}</ErrorMessage>
                )}
              </div>
              <h3>Name</h3>
              <CategoryInput
                onChange={(e) => {
                  props.setCategoryName(e.target.value);
                  setNameNew(e.target.value);
                  setNameError("");
                }}
                type="text"
                maxLength="25"
                className="search-input"
                placeholder="Category Name"
              ></CategoryInput>
              {nameError && <ErrorMessage>{nameError}</ErrorMessage>}

              <MaxText>Maximum 25 characters</MaxText>

              <ButtonDiv>
                <Button
                  onClick={() => {
                    createCategoryData();
                    validateInformation();
                  }}
                >
                  Create
                </Button>
              </ButtonDiv>
            </DialogContentText>
          </div>
        </MobileCategory>)}
      </Header>
      <BodyContainer>
        <ItemsContainer>
          {props.filterCategory && props.filterCategory.length >= 1 ? (
            props.filterCategory?.map((item, index) => {
              return (
                <>
                  <Category>
                    <ImageDiv>
                      <IconImage src={item.imageUrl} alt={item.categoryName} />
                    </ImageDiv>
                    <CategoryText>{item.categoryName}</CategoryText>
                  </Category>
                </>
              );
            })
          ) : (
            <NoRecordPlaceholderComponent text="No category found"/>
          )}
        </ItemsContainer>
      </BodyContainer>
    </MainContainer>
  );
}
