import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row } from "simple-flexbox";
import Back from "../../assets/SVGs/back.svg";
import UploadFile from "./uploadFile";
import Remove from "../../assets/SVGs/remove.svg";
import Add from "../../assets/SVGs/add.svg";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useHistory } from "react-router";
import Dialog from "@material-ui/core/Dialog";
import Cropper from "../../common/components/cropperPopup";
import ArtCo from "../../assets/SVGs/artco.svg";
import Utils from "../../utility";
import { useSelector, useDispatch } from "react-redux";
import {
  apiFailureConstants,
  apiSuccessConstants,
  eventConstants,
  validationsMessages,
} from "../../constants";
import CommonToasts from "../../common/components/commonToasts";
import Utility, { dispatchAction } from "../../utility";
import { connect } from "react-redux";
import { extname } from "path";
const ownerAddress = process.env.REACT_APP_OWNER_ADDRESS;

const MainComponent = styled.div``;

const Upload_file = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
`;
const EditImageText = styled.div`
  text-align: left;
  // font-family: "Barlow" !important;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
  margin: 22px 0px 0px 0px;
  opacity: 1;
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-14) /
    var(--unnamed-line-spacing-17) Inter;
  @media (min-width: 786px) and (max-width: 1024px) {
    margin: 16px 0px 0px 0px;
  }
`;
const EditImageCover = styled.div`
  text-align: left;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
  margin: 32px 0px 0px 0px;
  text-align: left;
  // font-family: normal normal medium Inter !important;
  letter-spacing: 0px;
  font-size: 14px;
  opacity: 1;
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-14) /
    var(--unnamed-line-spacing-17) Inter;
`;
const NameText = styled.input`
  width: 30%;
  border-radius: 4px;
  background-color: #f8f8f8;
  outline: none;
  padding: 10px 50px 10px 10px;
  border: none;
  :focus {
    border: none;
  }
  ::placeholder {
    text-align: left;
    font: normal normal medium 16px Barlow;
    letter-spacing: 0px;
    color: #848cbf;
    opacity: 1;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 474px;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const Disc_text = styled.div`
  width: 100%;
  margin: 16px 0px 20px 0px;
  display: flex;
  text-align: left;
  // font-family: normal normal medium Inter !important;
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-14) /
    var(--unnamed-line-spacing-17) Inter;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
`;
const Cat_choose = styled.div`
  margin-bottom: 5px;
`;
const Description = styled.textarea`
  resize:none;
  width: 65%;
  height: 166px;
  border:none;
  type: text;
  background: #F8F8F8 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1; 
  color:#4D5380;
  padding: 8px 15px !important;
::placeholder{
  text-align: left;
  font: normal normal medium 16px Barlow;
  letter-spacing: 0px;
  color: #848CBF;
opacity: 1;
}
  outline: none;
  margin-top:-10px;
  padding: 10px;
  &:focus {
    border: none;
  }
  display: block !important;
  @media (min-width:768px) and (max-width: 1024px) {
    width:100%;
  }
  @media (max-width:767px) {
    width: 100%;
}
`;
const Category = styled.div`
  width: 100%;
  margin: 10px 0px 10px 0px;
  display: flex;
  text-align: left;
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-14) /
    var(--unnamed-line-spacing-17) Inter;
  // font-family: normal normal medium Inter !important;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
`;
const EditImageText1 = styled.div`
  text-align: left;
  font: normal normal 600 18px Barlow;
  letter-spacing: 0px;
  color: #151e58;
  opacity: 1;
  margin-left: 20px;
  margin-bottom: 28px;
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-bottom: 25px;
  }
`;
const MainDiv = styled.div`
  background-color: #f0f0f6;
  padding: 57px 91px 78px 59px;
  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 22px 23px 0;
  }
  @media (max-width: 767px) {
    padding: 22px 23px 137px 23px;
  }
`;
const ErrorMessage = styled.span`
  text-align: left;
  font: normal normal medium 18px/22px Barlow;
  letter-spacing: 0;
  color: #fa021f;
  display: flex;
`;
const CreateBtn = styled.button`
  width: 82px;
  height: 34px;
  background: #6874e8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  text-align: center;
  font: normal normal 14px/17px Barlow;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  border: none;
  margin: 20px 0 40px 0px;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 99px;
    height: 40px;
  }
`;
const LoaderText = styled.div`
  font-size: 14px;
  color: #151e58;
  padding: 22px 23px 0;
`;
const LoaderCreatingText = styled.div`
  font-size: 18px;
  color: #151e58;
  padding: 28px 23px 0 23px;
`;
const UploadNftCollection = styled.p`
  margin: 10px 0px 10px 0px;
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-14) /
    var(--unnamed-line-spacing-17) Inter;
  // font-family: normal normal medium Inter !important;
`;
const MenuItemText = styled(MenuItem)`
  font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-medium) var(--unnamed-font-size-14) /
    var(--unnamed-line-spacing-17) Inter;
  // font-family: normal normal medium Inter !important;
  color: #151e58 !important;
`;

const CropLogoImage = styled.img`
  width: 182px;
  height: 182px;
  border-radius: 4px;
`;
const CropCoverImage = styled.img`
  width: 590px;
  height: 237px;
  border-radius: 4px;
`;
function CreateCollection(props) {
  const history = useHistory();
  const [logo, setLogo] = useState("");
  const [cover, setCover] = useState("");
  const [nameNew, setNameNew] = useState("");
  const [symbolNew, setSymbolNew] = useState("");
  const [descrip, setDescrip] = useState("");
  const [categ, setCateg] = useState("");
  const [type, setType] = useState("");
  const [logoError, setLogoError] = useState("");
  const [coverError, setCoverError] = useState("");
  const [nameError, setNameError] = useState("");
  const [symbolNewError, setSymbolNewError] = useState("");
  const [descripError, setDescripError] = useState("");
  const [categError, setCategError] = useState("");
  const [typeError, setTypeError] = useState("");
  const userData = useSelector((state) => state.wallet.userAddress);

  const [isImageValid,setIsimageValid] = useState(false)
  const isValid =
    props.state.imageUrl.length &&
    props.state.coverUrl.length &&
    props.state.name.length &&
    props.state.symbol.length &&
    props.state.categoryId.length;
  const handleClickOpen = () => {
    
    const data = userData?.userAddress;
    if (data !== ownerAddress) {
      return;
    } else if (isValid && props.metaLoader) {
      props.handleModal("inProgress");
    } else {
    }
  };
  const handleClose = () => {
    props.handleModal(null);
  };
  const getInitialState = () => {
    const value = "EveryOne";
    return value;
  };
  const [dataList, setData] = useState([""]);
  const [value, setValue] = useState(getInitialState);
  const addItemToArray = () => {
    setData([...dataList, ""]);
  };
  const removeItemFromArray = (index) => {
    let data = dataList;
    data.splice(index, 1);
    setData([...data]);
    props.state.whiteListedAddresses.splice(index, 1);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const changeValueWhiteList = (e, index) => {
    let data = dataList;
    data[index] = e.target.value;
    setData([...data]);
    props.setWhiteList([...data]);
  };
  const handleCategory = (event) => {
    props.setCategory(event.target.value);
    setCateg(event.target.value);
    setCategError("");
  };
  const handleType = (event) => {
    props.setType(event.target.value);
    setType(event.target.value);
    setTypeError("");
  };

  const createCollectionData = () => {
    if (isValid <= 0) {
      return;
    } else {
      props.createCollection(props.state);
    }
  };
  const updateCollectionData = () => {
    if (!isValid) {
      return;
    } else {
      // props.updateCollections()
      props.addWhitelistAddress(dataList);
    }
  };
  const CHARACTER_LIMIT = 1000;
  function validateInformation() {
    let logoError = !props.state.imageUrl
      ? "Insert PNG,JPG,JPEG, or SVG image. Max size: 5 MB"
      : "";
    let coverError = !props.state.coverUrl
      ? "Insert PNG,JPG,JPEG, or SVG image. Max size: 5 MB"
      : "";
    let nameError = !props.state.name ? "Enter the name" : "";
    let symbolNewError = !props.state.symbol ? "Enter the symbol" : "";
    // let descripError = !props.state.description ? "Please enter the description" : "";
    let categError = !categ ? "Select the category" : "";
    let typeError = !type ? "Select the type" : "";
    setLogoError(logoError);
    setCoverError(coverError);
    setNameError(nameError);
    setSymbolNewError(symbolNewError);
    setCategError(categError);
    setTypeError(typeError);
  }
  function checkInformation() {
    return;
  }

  const [isOpenFor, setIsOpenFor] = React.useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEncodedImage, setIsEncodedImage] = useState("");
  const [selectedInfo, setSelectedInfo] = useState("");
  const [croppedLogoImage, setCroppedLogoImage] = useState("");
  const [croppedCoverImage, setCroppedCoverImage] = useState("");

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const getEncodedCoverData = (data, text) => {
    setIsEncodedImage(data);
    setSelectedInfo(text);
    setIsPopupOpen(!isPopupOpen);
  };

  const getEncodedLogoData = (data, text) => {
    setIsEncodedImage(data);
    setSelectedInfo(text);
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    uploadFileOnAws();
  }, [isEncodedImage]);

  const [filePreview, setFilePreview] = useState("");
  const [fileCoverPreview, setFileCoverPreview] = useState("");

  const uploadFileOnAws = async () => {
    if (isEncodedImage?.length < 1) return;
    if(isEncodedImage?.size >= 5242880) {
      CommonToasts.failureMessageSent(validationsMessages.IMAGE_SIZE);
      return
    }
    let reader = new FileReader();
    reader.onload = function (ev) {
      if (selectedInfo === "logo") {
        setFilePreview(ev.target.result);
      } else if (selectedInfo === "cover") {
        setFileCoverPreview(ev.target.result);
      }
    };
    let file = isEncodedImage;
    let extName = extname(file.name);
    let fileName =
      "collection-images/" + Utils.generateCompanyLogoKey() + extName;
    let mimeType = file.type;
    props.dispatchAction(eventConstants.SHOW_LOADER);
    const s3Response = await Utils.uploadFileToS3(
      file,
      fileName,
      mimeType
    ).catch((err) => console.log(err));

    // console.log("S3", file);
      reader.readAsDataURL(file);
      props.dispatchAction(eventConstants.HIDE_LOADER);
      if (selectedInfo === "logo" && s3Response) {
        props.setLogoImage(s3Response?.Location);
      } else if (selectedInfo === "cover" && s3Response) {
        props.setCoverImage(s3Response?.Location);
      }
      // return s3Response?.Location;
 
    props.dispatchAction(eventConstants.HIDE_LOADER);
  };

  return (
    <MainComponent>
      <MainDiv>
        <Row>
          <button
            type="button"
            className="border-none p-0"
            onClick={() =>
              props.navigateToTab(
                props.activeTab.comp === "editCollection"
                  ? { comp: "collectionDetails", id: props.state._id }
                  : "collectionList"
              )
            }
          >
            <img src={Back} className="w-24 m-b-20" />
          </button>
          <EditImageText1>
            {props.activeTab.comp === "editCollection" ? "Edit" : "Create"}
            Collection
          </EditImageText1>
        </Row>
        <div className=" bg-white p-l-32 br-6 p-r-26 p-l-25-mob p-r-94">
          <EditImageText>Logo Image</EditImageText>
          <div className="coverPhoto fc-white fs-16"></div>
          {filePreview?.length > 0 ? (
            <CropLogoImage src={filePreview} />
          ) : (
            <div className="parentImage">
              <div className="dotted-div"></div>
              {props.activeTab.comp === "editCollection" ? (
                <img
                  src={props.state.imageUrl}
                  alt="body"
                  className="edit-img-inside-div"
                  onClick={() => {
                    togglePopup();
                    setIsOpenFor("logo");
                  }}
                />
              ) : (
                <img
                  src={ArtCo}
                  alt="body"
                  className="img-inside-div"
                  onClick={() => {
                    togglePopup();
                    setIsOpenFor("logo");
                  }}
                />
              )}
            </div>
          )}
          <div>
            Upload PNG,JPG or JPEG file. Max size: 5 MB
            {logoError && <ErrorMessage>{logoError}</ErrorMessage>}
          </div>
          <EditImageCover>Cover Photo</EditImageCover>
          <div className="coverPhoto fc-white fs-16"></div>

          {fileCoverPreview?.length > 0 ? (
            <CropCoverImage src={fileCoverPreview} />
          ) : (
            <div className="parentImage">
              <div className="dotted-div-cover"></div>
              {props.activeTab.comp === "editCollection" ? (
                <img
                  src={props.state.coverUrl}
                  alt="body"
                  className="edit-cover-img-inside-div"
                  onClick={() => {
                    togglePopup();
                    setIsOpenFor("cover");
                  }}
                />
              ) : (
                <img
                  src={ArtCo}
                  alt="body"
                  className="cover-img-inside-div"
                  onClick={() => {
                    togglePopup();
                    setIsOpenFor("cover");
                  }}
                />
              )}
            </div>
          )}

          <div>
            Upload PNG,JPG or JPEG file. Max size: 5 MB
            {coverError && <ErrorMessage>{coverError}</ErrorMessage>}
          </div>
          <Disc_text>Name</Disc_text>
          <NameText
            maxLength={30}
            type="text"
            placeholder="Name of your collection"
            value={props.state.name}
            onChange={(e) => {
              let vall = e.target.value;
              vall = vall.replace("^[a-zA-Z0-9_]*$", "");
              props.setName(vall);
              setNameNew(e.target.value);
              setNameError("");
            }}
            disabled={props.state._id}
          />
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          <Disc_text>Symbol</Disc_text>
          <NameText
            maxLength={30}
            pattern="[A-Za-z]"
            type="text"
            placeholder="Input Symbol"
            value={props.state.symbol}
            onChange={(e) => {
              let vall = e.target.value;
              vall = vall.replace(/[^A-Za-z]/gi, "");
              props.setSymbol(vall);
              setSymbolNew(e.target.value);
              setSymbolNewError("");
            }}
            disabled={props.state._id}
          />
          {symbolNewError && <ErrorMessage>{symbolNewError}</ErrorMessage>}
          <Disc_text>Description</Disc_text>
          <Description
            value={props.state.description}
            placeholder="Detail about this collection"
            onChange={(e) => {
              props.setDescription(e.target.value);
            }}
            maxLength={1000}
          />
          <p>{`${props.state.description.length}/${CHARACTER_LIMIT}`}</p>
          <Category>Category</Category>
          <div>
            <FormControl
              sx={{ m: 1 }}
              elevation={0}
              className="m-0 w-100-per-Mob"
            >
              <Select
                // elevation={0}
                IconComponent={KeyboardArrowDownIcon}
                value={props.state.categoryId}
                displayEmpty
                onChange={handleCategory}
                inputProps={{ "aria-label": "Without label" }}
                className="w-100-per-Mob w-252 color-848CBF bg-light-red b-n out-n br-4 display-flex j-c a-i"
              >
                <MenuItem disabled value="border-none">
                  Select Category
                </MenuItem>
                {props.state.categoryList &&
                  props.state.categoryList.length > 0 &&
                  props.state.categoryList.map((item) => {
                    return (
                      <MenuItemText value={item._id}>
                        {item.categoryName}
                      </MenuItemText>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          {categError && <ErrorMessage>{categError}</ErrorMessage>}
          <Category>Type</Category>
          <div>
            <FormControl
              sx={{ m: 1 }}
              elevation={0}
              className="m-0 w-100-per-Mob border-none"
            >
              <Select
                // elevation={0}
                IconComponent={KeyboardArrowDownIcon}
                value={props.state.typeId}
                displayEmpty
                onChange={handleType}
                inputProps={{ "aria-label": "Without label" }}
                className="w-100-per-Mob w-252 color-848CBF bg-light-red b-n out-n br-4 display-flex j-c a-i border-none"
              >
                <MenuItem disabled value="">
                  Select Type
                </MenuItem>
                <MenuItemText value="Action">Action</MenuItemText>
                <MenuItemText value="Adventure">Adventure</MenuItemText>
                <MenuItemText value="RPG">RPG</MenuItemText>
                <MenuItemText value="CCG">CCG</MenuItemText>
              </Select>
            </FormControl>
          </div>
          {typeError && <ErrorMessage>{typeError}</ErrorMessage>}

          {props.state._id ? (
            <div>
              <UploadNftCollection>
                Can upload Nfts in this collection
              </UploadNftCollection>
              <div>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  className="m-0 m-b-13-mob w-100-per-Mob border-none"
                >
                  {props.state.whiteListedAddresses.length > 0 ? (
                    <Select
                      IconComponent={KeyboardArrowDownIcon}
                      value={value}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className="w-100-per-Mob w-252 color-848CBF bg-light-red b-n out-n br-4 display-flex j-c a-i border-none"
                    >
                      <MenuItemText value={"Only Whitelisted addresses"}>
                        Only Whitelisted address
                      </MenuItemText>
                    </Select>
                  ) : (
                    <Select
                      IconComponent={KeyboardArrowDownIcon}
                      value={value}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className="w-100-per-Mob w-252 color-848CBF bg-light-red b-n out-n br-4 display-flex j-c a-i"
                    >
                      <MenuItemText value={"Everyone"}>Everyone</MenuItemText>
                      <MenuItemText value={"Only Whitelisted addresses"}>
                        Edit Only Whitelisted address
                      </MenuItemText>
                    </Select>
                  )}
                </FormControl>
              </div>
              {value == "Only Whitelisted addresses" ? (
                <>
                  {dataList.map((id, index) => (
                    <div className="m-t-30 m-t-16-mob">
                      <NameText
                        type="text"
                        className="br-4 b-n m-r-24 w-25 p-b-10 p-t-10 w-474"
                        value={props.state.whiteListedAddresses[index]}
                        onChange={(e) => changeValueWhiteList(e, index)}
                        placeholder="Add white label address"
                      />
                      {index < dataList.length - 1 ? (
                        <img
                          src={Remove}
                          onClick={() => removeItemFromArray(index)}
                        />
                      ) : (
                        <img src={Add} onClick={() => addItemToArray()} />
                      )}
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          ) : (
            <div>
              <UploadNftCollection>
                Can upload Nfts in this collection
              </UploadNftCollection>
              <div>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  className="m-0 m-b-13-mob w-100-per-Mob"
                >
                  <Select
                    IconComponent={KeyboardArrowDownIcon}
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="w-100-per-Mob w-252 color-848CBF bg-light-red b-n out-n br-4 display-flex j-c a-i"
                  >
                    <MenuItemText value={"Everyone"}>Everyone</MenuItemText>
                    <MenuItemText value={"Only Whitelisted addresses"}>
                      Only Whitelisted address
                    </MenuItemText>
                  </Select>
                </FormControl>
              </div>
              {value == "Only Whitelisted addresses" ? (
                <>
                  {dataList.map((id, index) => (
                    <div className="m-t-30 m-t-16-mob">
                      <NameText
                        type="text"
                        className="br-4 b-n m-r-24 w-25 p-b-10 p-t-10 w-474"
                        value={props.state.whiteListedAddresses[index]}
                        onChange={(e) => changeValueWhiteList(e, index)}
                        placeholder="Add white label address"
                      />
                      {index < dataList.length - 1 ? (
                        <img
                          src={Remove}
                          onClick={() => removeItemFromArray(index)}
                        />
                      ) : (
                        <img src={Add} onClick={() => addItemToArray()} />
                      )}
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          )}
          <div className="m-t-28">
            <input type="radio" value="1" name="contract" onChange={()=>props.setContractValue(1)}/> ERC 721
            <input
              type="radio"
              value="2"
              name="contract"
              className="m-l-49"
              onChange={()=>props.setContractValue(2)}
            />{" "}
            ERC 1155
          </div>
          <CreateBtn
            onClick={() => {
              props.state._id ? updateCollectionData() : createCollectionData();
              handleClickOpen();

              props.state._id ? checkInformation() : validateInformation();
            }}
            // disabled={!isValid}
          >
            {props.activeTab.comp === "editCollection" ? "Update" : "Create"}
          </CreateBtn>

          <Dialog
            onClose={handleClose}
            open={props.confirmationModal === "inProgress"}
          >
            <LoaderCreatingText>
              {props.activeTab.comp === "editCollection"
                ? "Updating Collection"
                : "Creating your collection"}
              <img
                src="/images/Close.svg"
                style={{ float: "right" }}
                onClick={handleClose}
              ></img>
            </LoaderCreatingText>
            <LoaderText>
              Your collection is being created do not close the screen
            </LoaderText>
            <img
              src="/images/ProcessingLoader.svg"
              onClick={handleClose}
              style={{
                width: "110px",
                marginLeft: "145px",
                padding: "23px 0 26px",
              }}
            ></img>
          </Dialog>
          <Dialog
            onClose={handleClose}
            open={props.confirmationModal === "confirm"}
          >
            <img
              src="/images/Close.svg"
              style={{ marginLeft: "85%", width: "25px", marginTop: "26px" }}
              onClick={handleClose}
            ></img>
            <img
              src="/images/Done.svg"
              style={{ width: "47px", marginLeft: "40%" }}
            ></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ padding: "20px 23px 15px" }}>
                {props.activeTab.comp === "editCollection"
                  ? "Collection updated successfully"
                  : "Collection created successfully"}
              </div>
              <div
                onClick={() => {
                  props.navigateToTab("collectionList");
                  window.location.reload(false);
                }}
                style={{ color: "#6874E8", marginBottom: "31px" }}
              >
                Go to Collection
              </div>
            </div>
          </Dialog>
        </div>
      </MainDiv>
      {isPopupOpen && (
        <Cropper
          handleClose={togglePopup}
          isOpenFor={isOpenFor}
          getEncodedCoverData={getEncodedCoverData}
          getEncodedLogoData={getEncodedLogoData}
          imageType={isOpenFor === "cover" ? "Cover Image" : "Logo Image"}
        />
      )}
    </MainComponent>
  );
}
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(CreateCollection);
