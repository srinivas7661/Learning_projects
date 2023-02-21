import React, { useState, useEffect } from "react";
import copyIcon from "../../assets/images/copy.svg";
import Avatar from "../editProfile/uploader";
import CopyToClipboard from "react-copy-to-clipboard";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { eventConstants } from "../../constants";
import Utility from "../../utility";
import { useHistory } from "react-router";
import Utils, { dispatchAction } from "../../utility";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../services/userMicroservice";
import { validationsMessages, stringConstants } from "../../constants";
import CommonToasts from "../../common/components/commonToasts";
import commonToasts from "../../common/components/commonToasts";
import { extname } from "path";
import { connect } from "react-redux";
import TwitterIcon from "@mui/icons-material/Twitter";
import { fileUpload } from "../../services/fileUploader";
import { useForm } from "react-hook-form";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 733,
  height: 491,
  bgcolor: "#1C1C1C",
  boxShadow: 24,
  textAlign: "-webkit-center",
  p: 4,
  clipPath: "polygon(17% 0, 100% 0, 100% 83%, 86% 100%, 0 100%, 0 17%)",
};

const EditProfile = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userData = useSelector((state) => state.wallet.walletConnect);
  const dispatch = useDispatch();
  const CHARACTER_LIMIT = 500;
  const NAME_LIMIT = 30;
  React.useEffect(() => {
    //remove React
    if (userData) {
      // setDropImg(userData && userData.profileImage)
      setName(userData && userData.firstName);
      setBio(userData && userData.bio);
      setSite(userData && userData.personalSite);
      setEmail(userData && userData.email);
      setProfile(userData && userData.profileImage);
      setCover(userData && userData.coverUrl);
    }
  }, [userData]);
  const history = useHistory();
  // const [dropImg, setDropImg] = useState(userData && userData.profileImage);
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [site, setSite] = useState();
  const [email, setEmail] = useState();
  const [isEncodedImage, setIsEncodedImage] = useState("");
  const [encodeCoverImage, setEncodeCoverImage] = React.useState("");
  const [selectedInfo, setSelectedInfo] = useState("");
  const [isOpenFor, setIsOpenFor] = React.useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const [user, setUser] = useState(null);

  const getEncodedProfileData = (data, text) => {
    // setIsEncodedImage(data.encodedFile);

    setIsEncodedImage(data);
    setSelectedInfo(text);
    // setIsPopupOpen(!isPopupOpen);
  };
  const getEncodedCoverData = (data, text) => {
    // setIsEncodedImage(data.encodedFile);
    setIsEncodedImage(data);
    setSelectedInfo(text);
    setIsPopupOpen(!isPopupOpen);
  };
  const updateUserHandle = async () => {
    let requestData = {
      findQuery: { userId: props?.user?.walletConnect?.userId },
      updateQuery: {
        firstName: name,
        bio: bio,
        personalSite: site,
        email: email,
        profileImage: profile,
        coverUrl: cover,
      },
    };

    dispatch({ type: eventConstants.SHOW_LOADER });
    let [error, result] = await Utility.parseResponse(updateUser(requestData));
    dispatch({ type: eventConstants.HIDE_LOADER }); //use mapdispatch to props
    if (error) {
      CommonToasts.errorToast(
        error?.message || validationsMessages.UNABLE_TO_UPDATE_USER
      );
      return;
    }
    dispatch({ type: eventConstants.SIGN_IN_SUCCESS, data: result });
    history.push("/profile");
  };

  const editData = () => {
    Utils.validateEmail(email) === true
      ? updateUserHandle()
      : CommonToasts.errorToast(validationsMessages.EMAIL_VALIDATION);

    // if (updateUserHandle) {
    //   history.push("/profile");
    // }
  };

  useEffect(() => {
    if (isEncodedImage?.size >= Math.pow(10, 7)) {
      return commonToasts.errorToast(
        validationsMessages.UPLOAD_SMALLER_SIZE_FILE
      );
    } else {
      uploadFileOnAws();
    }
  }, [isEncodedImage]);

  const uploadFileOnAws = async (e) => {
    if (isEncodedImage?.length < 1) return;
    let file = isEncodedImage;
    // let extName = extname(file?.name);
    // let fileName = "user-profile/" + Utils.generateCompanyLogoKey() + extName;
    // let mimeType = file.type;

    let extName = extname(file.name);
    let fileName = Utils.generateCompanyLogoKey() + extName;
    try {
      const data = new FormData();
      data.append("fileName", file.name);
      data.append("files", file);
      props.dispatchAction(eventConstants.SHOW_LOADER);
      let [err, responseObj] = await Utils.parseResponse(
        fileUpload(data)
      ).catch((err) => {
        console.log(err, "file data err");
      });
      props.dispatchAction(eventConstants.HIDE_LOADER);

      // props.dispatchAction(eventConstants.SHOW_LOADER);
      // const [error, s3Response] = await Utils.parseResponse(
      //   Utils.uploadFile(data)
      // );
      // console.log(err,"files daTA err")
      // console.log(responseObj[0].unSignedUrl,"files daTA upload")
      props.dispatchAction(eventConstants.HIDE_LOADER);
      // if (err) {
      //   commonToasts.errorToast(
      //     error?.message || validationsMessages.UNABLE_TO_UPLOAD_FILE
      //   );
      //   return;
      // }
      setEncodeCoverImage(responseObj[0].unSignedUrl);
      if (selectedInfo === stringConstants.TITLE_COVER) {
        setCover(responseObj[0].unSignedUrl);
      } else if (selectedInfo === stringConstants.TITLE_PROFILE)
        setProfile(responseObj[0].unSignedUrl);
    } catch (err) {
      Utils.apiFailureToast("Unable to upload image");
    }
  };

  const handleCopyToClipboard = () => {
    CommonToasts.successToast("Link Copied");
  };
  const CHARACTER_NAME = 30;
  const CHARACTER_ABOUT = 500;
//   const { register, handleSubmit, reset } = useForm();
//   useEffect(() => {
//     // simulate async api call with set timeout
//     setTimeout(() => setUser({ name: '', email: '', bio: '' }), 1000);
// }, []);
//   useEffect(() => {
//     // reset form with user data
//     reset(user);
// }, [user]);
const reset = () => {
  setName("")
  setEmail("")
  setBio("")
};
  return (
    <div className="text-white w-full h-full">
      <div className="polygon-token bg-black-60 pb-7.75 mb-10">
        <div className="font-black font-EurostileExtended text-white pt-fff  tb:text-ft20 text-ft8 text-center ">
          USER PROFILE
        </div>
        <hr className="border-t-2  text-primary-50 mt-tex w-full" />
        <div className=" block xl:flex xl:pl-24 xl:pr-24 pl-6 pr-6 pt-7">
          {/* input fields */}
          <div className=" w-full lg:mr-5">
            <div className="w-4/5 pt-7">
              <label
                className="block  tracking-wide text-gray-700 font-bold text-ft16  mb-2 mobile:text-ft3 mobile:font-semibold"
                for="grid-password"
              >
                User name
              </label>
              <div className="flex w-full flex-col ">
                <div className=" flex ">
                  <div className="flex w-full flex-col">
                    <input
                      className="w-full bg-black-300 border-solid border-1 border-primary-50 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-tex px-thp mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                      placeholder="Enter your User name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      maxLength={30}
                    />
                    <p className="font-OpenSansRegular self-end text-ft2 text-grey-5">
                      {`${name?.length}/${CHARACTER_NAME}`}
                    </p>
                  </div>
                  <img
                    className="w-7 h-6.25 mt-2.5 ml-2.5"
                    src="/images/Icon feather-check-circle.svg"
                  />
                </div>
              </div>
            </div>
            <div className="w-full pt-2 lg:pr-16">
              <label
                className="block  tracking-wide text-gray-700 font-bold text-ft16  mb-2 mobile:text-ft3 mobile:font-semibold"
                for="grid-password"
              >
                Email address
              </label>
              <input
                className="w-full  bg-black-300 border-solid border-1 border-primary-50 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-tex px-thp mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                maxLength={30}
              />
            </div>
            <div className="w-full  pt-2 lg:pr-8">
              <label
                className="block  tracking-wide text-gray-700 font-bold text-ft16  mb-2 mobile:text-ft3 mobile:font-semibold"
                for="grid-password"
              >
                Wallet address
              </label>
              <div className="flex">
                <input
                  className="w-full  bg-black-300 border-solid border-1 border-primary-50 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-tex px-thp mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                  placeholder="Enter User Name"
                  readOnly
                  value={userData?.userId}
                />
                &nbsp;
                <CopyToClipboard text={userData?.userId}>
                  <img
                    src={copyIcon}
                    onClick={handleCopyToClipboard}
                    alt="icon"
                    className="icon"
                  />
                </CopyToClipboard>
              </div>
            </div>
            <div className="w-full  pt-2 lg:pr-16">
              <label
                className="block  tracking-wide text-gray-700 font-bold text-ft16  mb-2  mobile:font-semibold mobile:text-ft25"
                for="grid-password"
              >
                About me
              </label>
              <textarea
                className="w-full h-tew  bg-black-300 border-solid border-1 border-primary-50 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-tex px-thp mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                placeholder="Write something about yourself"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                maxLength={500}
              />
              <p className="font-OpenSansRegular text-ft2  justify-end flex text-grey-5">
                {`${bio?.length}/${CHARACTER_ABOUT}`}
              </p>
            </div>
          </div>
          {/* uploader */}
          <div className="w-full pt-7">
            <div className=" block md:flex h-auto">
              <div className="mr-tix flex flex-col  medium:mb-5">
                {/* <div className="flex justify-between medium:w-2/5 md:justify-between mobile:h-25 medium:h-15 ">
                  <div
                    className="tracking-wide text-gray-700 font-bold text-ft16 mobile:text-ft3 mobile:font-semibold mob:h-15  mobile:mr-tex  md:mr-0 "
                    for="grid-password"
                  >
                    Avatar
                  </div>
                  <img
                  className="w-50 h-43.75 -ml-tif -mt-17.5 mobile:h-40"
                    src="/images/edit.svg"
                    // className="-ml-tif -mt-15"
                  />
                </div> */}
                <div className="flex medium:h-15 mobile:mb-10 ">
                  <label
                    className="block mr-3.5  tracking-wide text-gray-700 font-bold text-ft30 mb-5 mobile:text-ft3 mobile:font-semibold"
                    for="grid-password"
                  >
                    Avatar
                  </label>
                  <img
                    className="w-50 h-43.75 -ml-17.5 -mt-17.5 mobile:h-40 cursor-pointer"
                    src="/images/edit.svg"
                    onClick={() => {
                      setIsOpenFor(stringConstants.TITLE_PROFILE);
                      handleOpen();
                    }}
                  />
                </div>
                {/* <div
                  className="avatar-hexagon -mt-12.5 medium:-mt-2.5 h-45.25 w-45.25 bg-blue-80 text-center mobile:-mt-15 mobile:mb-8"
                  onClick={() => {
                    setIsOpenFor(stringConstants.TITLE_PROFILE);
                    handleOpen();
                  }}
                > */}
                {/* <div class="hexagon hexagon2  5xl:-mt-30 5xl:-mb-25  mobile:-mt-40 mobile:-mb-24" onClick={() => {
                    setIsOpenFor(stringConstants.TITLE_PROFILE);
                    handleOpen();
                  }}><div class="hexagon-in1"><div class="hexagon-in2"> <img
                    className=" h-full"
                    src={profile ? profile : "/images/default-image.svg"}
                  ></img></div></div></div> */}
                <div
                  class="hex-pic m-top border-2 bg-primary-50 border-primary-50"
                  onClick={() => {
                    setIsOpenFor(stringConstants.TITLE_PROFILE);
                    handleOpen();
                  }}
                >
                  <div class="hex-pic relative ">
                    <img
                      className="dp-hex object-cover"
                      src={profile ? profile : "/images/default-image.svg"}
                    />
                  </div>
                </div>

                {/* </div> */}

                <Modal
                  open={open}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="text-right">
                      {" "}
                      <CloseIcon
                        className="cursor-pointer text-white"
                        onClick={handleClose}
                      />
                    </div>

                    <Avatar
                      handleClose={handleClose}
                      getEncodedProfileData={getEncodedProfileData}
                      getEncodedCoverData={getEncodedCoverData}
                      isOpenFor={isOpenFor}
                    />
                    <br />
                    {/* <span className="text-white font-bold ft14">Upload Image</span> */}
                  </Box>
                </Modal>
              </div>
              <div
                className="w-full  medium:mb-4"
                onClick={() => {
                  setIsOpenFor(stringConstants.TITLE_COVER);
                  handleOpen();
                }}
              >
                {" "}
                <div className="flex medium:h-15">
                  <label
                    className="block  tracking-wide text-gray-700 font-bold  text-ft30 mb-5 mobile:text-ft3 mobile:font-semibold"
                    for="grid-password"
                  >
                    Banner
                  </label>
                  <img
                    className="w-50 h-43.75 -ml-17.5 -mt-17.5 mobile:h-40 cursor-pointer"
                    src="/images/edit.svg"
                  />
                </div>
                <div className=" h-45.25 -mt-12.5 medium:-mt-2.5">
                  <img
                    className="h-45.25 border-2 border-solid border-box-border"
                    src={cover ? cover : "/images/default-banner.svg"}
                  ></img>
                </div>
              </div>
            </div>
            <div className="w-full  pt-7 ">
              <label
                className="block  tracking-wide text-gray-700 font-bold text-ft16  mb-2 mobile:text-ft25"
                for="grid-password"
              >
                Links
              </label>
              <input
                className="w-full  bg-black-300 border-solid border-1 border-primary-50 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-tex px-thp mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                placeholder="https://www.instagram.com/"
              />
              <input
                className="w-full  bg-black-300 border-solid border-1 border-primary-50 appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mt-5 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
                placeholder="https://www.youtube.com/"
              />
            </div>

            <div className="w-full  pt-7">
              <label
                className="block  tracking-wide text-gray-700 font-bold text-ft16  mb-3 mobile:text-ft25"
                for="grid-password"
              >
                Social connections
              </label>
              <div className="flex justify-between">
                <div className="flex">
                  {" "}
                  <div className="w-8.75 h-8.75 bg-white pt-0.75 pl-1">
                    <TwitterIcon className="text-black-50" />
                  </div>
                  <label
                    className="block  tracking-wide text-gray-700 font-bold text-ft30 mb-2 pl-2 mobile:text-ft25 mobile:font-normal"
                    for="grid-password"
                  >
                    Twitter
                  </label>
                </div>
                <button
                  class="market-button xl:w-32 w-23 xl:h-12 h-8 rounded-3xl text-white bg-blue-60 z-10 relative overflow-hidden border border-blue-80 text-ft2"
                  type="button"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-8  items-center">
          <div class="w-full mt-tex mb-10.75 flex justify-center">
            <button
              class="market-button xl:w-45 xl:h-12 w-25 h-8 rounded-3xl text-white bg-blue-60 relative z-10 overflow-hidden border mr-7.5 border-blue-80 text-ft2"
              type="button"
              onClick={editData}
            >
              Save changes
            </button>

            <button
              class="market-button xl:w-32 w-20 xl:h-12 h-8 rounded-3xl text-white bg-blue-60 relative z-10 overflow-hidden border border-blue-80 text-ft2"
              type="button"
              onClick={() => reset()} 
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  //use mapstate to props everywhere, action needs to be in separete file
  return { user: state.wallet };
};
export default connect(mapStateToProps, { dispatchAction })(EditProfile);
