import React from "react";
import styled from "styled-components";
import CommonToasts from "../../common/components/commonToasts";
import { validationsMessages } from "../../constants";

const UploadFileDiv = styled.div`
  width: 467px;
  height: 470px;
  overflow: hidden;
  border: 2px dashed #ffffff;
  border-radius: 30px;
  border-top-left-radius: 33px;
  opacity: 1;
  position: relative;
  @media (max-width: 767px) {
    width: 100%;
    height: 290px;
  }
`;

const MainImageDiv = styled.div`
height:100%;
width:100%;
  // height: 400px;
  // width: 397px;
  @media (max-width: 767px) {
    width: 100%;
    height: 290px;
  }
`;

const ImageDiv = styled.img`
  width: 100%;
  /* height: 101%; */
  height: auto;
  border-radius: 8%;
  object-fit: fill;
`;
const VideoDiv = styled.video`
  width: 101%;
  height: 101%;
  /* height: auto; */
  border-radius: 8%;
  object-fit: fill;
`;
const AudioDiv = styled.video`
  width: 101%;
  height: 101%;
  /* height: auto; */
  border-radius: 8%;
  object-fit: fill;
`;
const MainInput = styled.input`
  padding: 0;
  margin: 0;
  cursor: pointer;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
`;

class ImageFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "someUniqueId",
      imageURI: null,
      fileType: "",
      mediaType: "",
    };
  }

  // checkFileType(){
  //   console.log(this.state.fileType,"fileeee");
  //   if(this.state.fileType=="video/mp4"|| this.state.fileType=="audio/mp3"|| this.state.fileType=="video/mov")
  //   {
  //      this.setState({mediaType:"video"});

  //   }
  //      else if(this.state.fileType=="image/jpg"|| this.state.fileType=="image/jpeg"|| this.state.fileType=="image/png")
  //      {
  //      this.setState({mediaType:"image"});
  //      }
  // }

  buildImgTag() {
    let imgTag = null;
    if (this.state.imageURI !== null)
      imgTag = (
        <MainImageDiv>
          {this.state.mediaType === "video" ? (
            <VideoDiv controls src={this.state.imageURI} />
          ) : this.state.mediaType === "audio" ? (
            <AudioDiv controls src={this.state.imageURI} />
          ) : (
            <ImageDiv src={this.state.imageURI} />
          )}
        </MainImageDiv>
      );
    return imgTag;
  }

  readURI(e) {
    // this.setState({fileType:e.target.files[0].type})
    // console.log(e.target.files[0].type,"set")
    // console.log(this.state.fileType,"setType")
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        this.setState({ imageURI: e.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);

      if (e.target.files[0].size > 10e6) {
        CommonToasts.errorToast(validationsMessages.IMAGE_SIZE_VALIDATION);

        return false;
      }
    }
    // this.checkFileType();
  }

  handleChange(e) {
    // console.log(e.target.files[0].type,"set")
    // console.log(e.target.files[0],"setType")
    if (e.target.files[0].size > 10 * 1024 * 1024) {
      CommonToasts.errorToast(validationsMessages.FILE_SIZE_VALIDATION);
      return false;
    } else {
      if (
        e.target.files[0].type == "video/mp4" ||
        e.target.files[0].type == "video/quicktime"
      ) {
        this.setState({ mediaType: "video" });
      } else if (e.target.files[0].type == "audio/mpeg") {
        this.setState({ mediaType: "audio" });
      } else if (
        e.target.files[0].type == "image/jpg" ||
        e.target.files[0].type == "image/jpeg" ||
        e.target.files[0].type == "image/png" ||
        e.target.files[0].type == "image/gif"
      ) {
        this.setState({ mediaType: "image" });
      }
    }

    //  else if (e.target.files[0].size > 1*1024*1024) {
    //     CommonToasts.errorToast(validationsMessages.IMAGE_SIZE_VALIDATION);
    //     return false;
    //   }
    // console.log(e.target.files[0],"file type");
    this.readURI(e);
    if (this.props.onChange !== undefined) {
      this.props.onChange(e);
    }
  }

  render() {
    const imgTag = this.buildImgTag();

    return (
      <>
        <UploadFileDiv>
          <MainInput
            id={this.state.id}
            type="file"
            accept=".jpeg, .png, .jpg, .mp4, .mov, .mp3, .gif"
            onChange={this.handleChange.bind(this)}
          />{" "}
          {imgTag}
          <div className="flex flex-col justify-center items-center mt-43.75">
            <img src="/images/uploadImage.svg" alt="body" className="w-20"/>
            {/* <span className="text-upload-img">Upload Image</span> */}
          </div>
        </UploadFileDiv>
      </>
    );
  }
}
export default ImageFile;
