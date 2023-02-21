import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/images/img-format.png";
import styled from "styled-components";
import { connect } from "react-redux";
import { BASE_URL2, WHITE_LABEL_TOKEN } from "../../reducers/Constants";
import { httpConstants } from "../../constants";
import { updateUserProfile } from "../../services";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { userPublicProfile } from "../../services/UserMicroService";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/editProfile.css";
import profileImage from "../../assets/images/ProfileReplace.svg";
import { AuthToken } from "../../services/UserAuthToken";
// import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import $ from 'jquery';
import noProfile from '../../assets/images/NoProfile.svg'
import { format } from "util";
import { borderRadius } from "@mui/system";
import { fetchPalletsColor, getParamTenantId } from "../../utility/global";
import Skeleton from "react-loading-skeleton";

const Button = styled.button``;

function EditProfile(props) {
  let { user } = useSelector((state) => state);
  const appearance = useSelector(state => state.customize.appearance)

  let { loggedInUser } = user;

  if (loggedInUser) { localStorage.setItem('userId', loggedInUser._id); }
  let userId = (loggedInUser) ? loggedInUser._id : localStorage.userId;

  if (user) { localStorage.setItem('loggedInDetails', user.loggedInUser); }
  if (loggedInUser == null) {
    loggedInUser = localStorage.getItem('loggedInDetails')
  }

  const navigate = useNavigate();
  const hiddenFileInput = useRef(null);
  const [desLength, setDesLength] = useState(0);
  const [checkClick, setcheckClick] = useState(false);

  // const { user } = useSelector((state) => state);
  const [formData, setFormData] = useState({
    photo: loggedInUser?.photo,
    userName: loggedInUser?.userName,
    bio: loggedInUser?.bio,
    portfolio: loggedInUser?.portfolio,
  });
  // const tempUrl =
  //   "https://earncashto.com/wp-content/uploads/2021/06/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png";
  const [imageUrl, setImageUrl] = useState(profileImage);
  const [useruserName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [portfilo, setPortfilo] = useState("");

  const [nameError, SetNameError] = useState('');
  const [descriptionError, SetDesError] = useState('');
  const [userData, setUserData] = useState('');


  const [portfiloError, SetPortfiloError] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);

  // const photo = useRef(user?.loggedInUser?.photo);
  // const bio = useRef(user?.loggedInUser?.bio);
  // const userName = useRef(user?.loggedInUser?.userName);
  // const portfolio = useRef(user?.loggedInUser?.portfolio);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
    // ("hidden file input",hiddenFileInput)
  };

  const handleChange = async (event) => {
    try {
      var filesize = event.target.files[0].size;
      const filename = event.target.files[0].name.replace(/[^a-zA-Z0-9.]/g, '');
      const fileextenstion = filename.split('.').pop().toLowerCase();
      const originalfileSize = Math.round(filesize / 1024);
      const extensionArray = ['jpeg', 'png', 'jpg', 'gif'];
      let flag = false;
      if (event.target.value.length == 0) {
        toast.error("No File is Selected Please Select a File.");
      }
      else {
        for (let i = 0; i < extensionArray.length; i++) {
          if (fileextenstion.localeCompare(extensionArray[i]) == 0) {
            flag = true;
          }
        }
        if (flag == false)
          toast.error("File type not acceptable. Please use JPEG PNG JPG GIF file");
        else if (originalfileSize > 10000) {
          toast.error("Image file size should be less than 10 mb")
        }

        if (flag) {
          extensionArray.map(async (data) => {
            if ((originalfileSize < 10000) && (fileextenstion == data
            )) {
              const fileUploaded = event.target.files[0];
              let formData = new FormData();
              formData.append("folderName", "collections");

              formData.append("createdBy", `${user?.loggedInUser?._id}`);
              formData.append("attachment", fileUploaded);

              const res = await fetch(`${BASE_URL2}/api/v2/upload-documents`, {
                method: httpConstants.METHOD_TYPE.POST,
                body: formData,
                // headers: AuthToken,
              });

              const result = await res.json();
              if (result.success) {
                setFormData({ ...formData, photo: result.responseData.cdnUrl, compressedURL: result.responseData.compressedURL });
              } else {
                toast.error("Unable to change image", {
                  position: toast.POSITION.TOP_RIGHT
                });
              }

              // else toast.error("")

              setImageUrl(result.responseData);


              flag = false;
            }
          }

          )
        }
      }
    } catch (e) {
      ;
    }


    // Edit.handleFile(fileUploaded);
  };
  //------------------------------------------------------------------------
  useEffect((async) => {
    // checkapi();
    // setTimeout(6000);

    // setIsloading(true);
    // getNfts(defaultReq).then((response) => {
    // if(nfts.length==0){
    // const myTimeout = setTimeout(100000);
    if (loggedInUser._id) {
      setUserName(loggedInUser.userName)
      setBio(loggedInUser.bio)
      setPortfilo(loggedInUser.portfolio)
      setImageUrl(loggedInUser.photo)

      // userPublicProfile((res) => {
      // ("jjjjjjjjjjjjjj")
      // (res, "filterResponse");
      // setIsloading(true);
      // if (res.success) {
      //   ("fkfsffksfsw", res.responseData)

      //   // prevArray => [...prevArray, newValue]
      //   setUserData(res.responseData);


      // setNfts([nfts,res.responseData.nftContent]);
      // setIsloading(false);
      // } else {
      //   toast.error(res.message);
      //   // setIsloading(false);
      // }

      // }, loggedInUser._id);
    }
    // }
    // else{
    //   ("its else statement")
    // }
  }, [loggedInUser._id]);

  //-----------------------------------------------------------------------
  // useEffect(() => {
  //   (localStorage.getItem(WHITE_LABEL_TOKEN), "<<<this is token");
  //   if (user.loggedInUser?.photo != "") {
  //     setImageUrl(user?.loggedInUser?.photo);
  //   }
  //   if (user.loggedInUser?.userName != "") {
  //     setUserName(user?.loggedInUser?.userName);
  //   }
  //   if (user.loggedInUser?.bio != "") {
  //     setBio(user?.loggedInUser?.bio);
  //   }
  //   if (user.loggedInUser?.portfilo != "") {
  //     setPortfilo(user?.loggedInUser?.portfolio);
  //   }


  //   // setImageUrl()
  //   // photo.current = user?.loggedInUser?.photo;
  //   // bio.current = user?.loggedInUser?.bio;
  //   // userName.current = user?.loggedInUser?.userName;
  //   // portfolio.current = user?.loggedInUser?.portfolio;
  // }, []);

  const handleSubmit = async (e) => {
    formData.userName = useruserName;
    formData.bio = bio;
    formData.portfolio = portfilo;
    formData.photo = imageUrl;
    var format = /[!@$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]+/;
    e.preventDefault();

    const userName = formData.userName;

    if (format.test(userName)) {
      toast.error("UserName should be not contain special character");
      return null;
    }


    const result = await updateUserProfile(formData, user?.loggedInUser?._id);

    if (result.success) {
      // toast.success("Profile Updated");
      toast.success(result.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      // window.location.reload(true);
      // ("jsgg")
      setTimeout(() => {
        window.location.href = '/my-profile'+getParamTenantId();
      }, 2000)
      // setTimeout(window.location.href = '/my-profile',9000)
      // window.location.href = '/my-profile';
      // navigate(-1);
    } else {
      // toast.error("invalid request");
      if (imageUrl != "") {
        toast.error(result.message, {
          position: toast.POSITION.TOP_RIGHT
        });

      }
      else {
        toast.error("image is required", {
          position: toast.POSITION.TOP_RIGHT
        });
      }


    }
  };

  const handleForm = (e) => {

    const { name, value } = e.target;
    if (name == "bio") {
      setDesLength(value.length);
    }
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    $(document).ready(function () {
      var lines = 20;
      var linesUsed = $('#linesUsed');
      $('#test').keydown(function (e) {
        let newLines = $(this).val().split("\n").length;
        linesUsed.text(newLines);
        if (e.keyCode == 13 && newLines >= lines) {
          return false;
        }
      });
    });
  }, [])


  const enabled = useruserName?.length > 0 && bio?.length > 0 && portfilo?.length > 0 && nameError == "" && descriptionError == "" && portfiloError == "";
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="editProfileContainer container">
        <div className="editProfileTopHeading top-heading">
          <div className="editProfileHeadingTitle">
            <p className="title">
              {props.loader ? <Skeleton width="200px" height="40px" /> : 'Edit Profile'}
            </p>
          </div>

          {/* <h3 className=" input-heading generalsettingl">
            General Setting
          </h3> */}
        </div>
        <div className="chooseProfilePicContainer">
          <div className="chooseProfilePicInnerContainer ">
            <div className="editprofile-image">
              {
                props.loader ? <Skeleton width="150px" height="150px" circle={true} /> :
                  <img src={typeof (imageUrl) !== "object" && imageUrl != "" ? imageUrl : (typeof (imageUrl) !== "string" ? imageUrl.compressedURL : profileImage)}
                  />
              }
            </div>
            <div className="editprofile-button-outer">
              {
                props.loader ? <Skeleton width="95px" height="30px" /> :
                  <Button
                    onClick={handleClick}
                    className=" btn-choose-file"
                    style={{ border: `1px solid ${fetchPalletsColor(appearance.colorPalette)}` }}
                  >
                    <span className="choosefile"
                      style={{ color: `${fetchPalletsColor(appearance.colorPalette)}` }}
                    >Choose File</span>
                  </Button>
              }
              {
                props.loader ? <Skeleton width="95px" height="30px" /> :
                  <Button style={{ display: "block", marginTop: "10px", border: "1px solid red" }} className=" btn-choose-file" onClick={() => setImageUrl("")}>
                    <span className="choosefile" style={{ color: "red" }}> Remove File</span>
                  </Button>
              }
            </div>

            <input
              type="file"
              className="edit-input-box"
              placeholder="Write your name"
              // name=""
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleChange}
            />
          </div>
        </div>
        {
          props.loader ? 
          <>
            <Skeleton height="50px" style={{marginTop: '20px'}} />
            <Skeleton height="150px" style={{marginTop: '20px'}} />
            <Skeleton height="50px" style={{marginTop: '20px'}} />
            <Skeleton height="50px" style={{marginTop: '20px'}} />
          </> :
            <div className="editProfileFormContainer singlenft-form-box">

              <div className="">
                <label
                  htmlFor="username"
                  className=" label-heading userheading"
                >
                  Username<span style={{ color: "red", fontSize: "13px" }}>{nameError}</span>
                </label>
                <input
                  type="text"
                  className="editProfileFormContainerEachInput "
                  name="userName"
                  id="userName"
                  value={useruserName}
                  // value={userName.current}
                  onChange={(e) => {
                    setUserName(e.target.value);

                    var format = /[!@$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]+/;
                    if (format.test(e.target.value)) {
                      SetNameError("(No Special Character Allowed)");

                    } else if (e.target.value.length == 0) {
                      SetNameError("(Name is required)");
                    }
                    else {
                      SetNameError("");

                    }
                    handleForm(e);

                  }}
                />
              </div>
              <div className="" style={{ marginBottom: "28px" }}>
                <label htmlFor="comment" className="label-heading">
                  Bio<span style={{ color: "red", fontSize: "13px" }}>{descriptionError}</span>
                </label>
                <textarea
                  className="editProfileFormContainerEachInput mb-0"
                  rows="4"
                  id="test"

                  // name="text"
                  name="bio"
                  value={bio}
                  // value={userName.current}
                  onChange={(e) => {
                    setBio(e.target.value);
                    let bioval = (e.target.value.length == 0) ? (SetDesError("(Description is required)")) : (SetDesError(""));
                    if (desLength < 1000) {
                      handleForm(e);
                    }
                  }}
                  placeholder="Write description"
                // onChange={(e) => (bio.current = e.target.value)}
                ></textarea>
                <div className="clearfix"></div>
                <span className="input-down-text">
                  {desLength} of 1000 characters and
                  <span> <span id="linesUsed">0</span> of 20 Lines.</span>
                </span>
              </div>
              <div className="portfilodiv">
                <label htmlFor="email" className="label-heading">
                  Personal site or Portfolio<span style={{ color: "red", fontSize: "13px" }}>{portfiloError}</span>
                </label>
                <input
                  type="name"
                  id="portfilo"
                  className="editProfileFormContainerEachInput form-control"
                  placeholder="www.example.com"
                  name="portfolio"
                  value={portfilo}
                  // value={userName.current}
                  onChange={(e) => {
                    setPortfilo(e.target.value);
                    (e.target.value.length == 0) ? SetPortfiloError("(Portifilo is required)") : SetPortfiloError("");
                    handleForm(e);
                  }}
                />
              </div>
              <div className="buttonGroup">
                <button className="editprofileCancelButton" onClick={() => navigate(-1)}>
                  <span className="cancelbutton" >Cancel</span>
                </button>
                <button type="submit" className="editprofileSubmitButton"
                  disabled={!enabled}
                  style={{ opacity: !enabled ? 0.6 : 1, background: `${fetchPalletsColor(appearance.colorPalette)}` }}
                  onClick={(e) => handleSubmit(e)}>
                  <span className="updateProfile">Update Profile</span>
                </button>

              </div>


            </div>
        }
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.loggedInUser,
  };
};

export default connect(mapStateToProps)(EditProfile);
