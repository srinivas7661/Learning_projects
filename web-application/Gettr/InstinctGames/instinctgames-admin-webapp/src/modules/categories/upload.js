import React from "react";
import ArtCo from "../../assets/SVGs/artco.svg";
import Utils from "../../utility";
import { extname } from "path";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import CommonToasts from "../../common/components/commonToasts";
import {
  credsConstants,
  pathConstants,
  validationsMessages,
} from "../../constants";

const ImageDiv = styled.div`
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const UploadDiv = styled.div`
  overflow: hidden;
  background: #afafaf00 0% 0% no-repeat padding-box;
  border-radius: 8px;
  opacity: 1;
  position: relative;
`;

const Input = styled.input`
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
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const IconImg = styled.img`
  opacity: 0.85;
  width: 24px;
  padding-top: 10px;
`;
class ImageFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "someUniqueId",
      imageURI: null,
    };
  }

  buildImgTag() {
    let imgTag = null;
    if (this.state.imageURI !== null)
      imgTag = (
        <ImageDiv>
          <Image src={this.state.imageURI} alt="img"></Image>
        </ImageDiv>
      );
    return imgTag;
  }

  readURI = async (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        this.setState({ imageURI: ev.target.result });
      }.bind(this);
      let file = e.target.files[0];
      let extName = extname(file.name);
      let fileName =
        "collection-images/" + Utils.generateCompanyLogoKey() + extName;
      let mimeType = file.type;
      const s3Response = await Utils.uploadFileToS3(
        file,
        fileName,
        mimeType
      ).catch((err) => console.log(err));
      if (
        mimeType === "image/png" ||
        mimeType === "image/jpeg" ||
        mimeType === "image/jpg" ||
        mimeType === "image/svg" ||
        mimeType === "image/webp"
      ) {
        reader.readAsDataURL(file);
        this.props.setProfileImg("");
        return s3Response?.Location;
      } else {
        CommonToasts.failureMessageSent(validationsMessages.IMAGE_NOT_VALID);
        this.props.setProfileImg("");
      }
    }
  };

  handleChange = async (e) => {
    const keyName = await this.readURI(e);
    if (keyName) this.props.setImageUrl(keyName);
  };

  render() {
    const imgTag = this.buildImgTag();
    return (
      <>
        <div>
          <Toaster />
        </div>
        <UploadDiv
          className="fileUpload"
          style={{
            width: this.props.width ? this.props.width : 89,
            height: this.props.height ? this.props.height : 89,
            border: this.state.imageURI == null ? "2px dashed #CED0DC" : 0,
          }}
        >
          <Input id={this.state.id} type="file" onChange={this.handleChange} />{" "}
          {imgTag}
          <IconDiv
            style={{ margin: this.props.margin ? this.props.margin : "24%" }}
          >
            <IconImg src={ArtCo} alt="body" />
          </IconDiv>
        </UploadDiv>
      </>
    );
  }
}

export default ImageFile;
