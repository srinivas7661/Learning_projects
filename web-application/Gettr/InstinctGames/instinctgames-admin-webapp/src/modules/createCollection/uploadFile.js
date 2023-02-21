import React from "react";
import ArtCo from "../../assets/SVGs/artco.svg";
import Utils from "../../utility";
import { extname } from "path";
import {
  apiFailureConstants,
  apiSuccessConstants,
  eventConstants,
  validationsMessages,
} from "../../constants";
import { connect } from "react-redux";
import Utility, { dispatchAction } from "../../utility";
import CommonToasts from "../../common/components/commonToasts";
class ImageFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "someUniqueId",
      imageURI: this.props.imageUrl || null,
    };
  }
  buildImgTag() {
    let imgTag = null;
    if (this.state.imageURI !== null)
      imgTag = (
        <div style={{ height: "205px" }}>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "4px" }}
            src={this.state.imageURI}
          ></img>
        </div>
      );
    return imgTag;
  }
  //TODO: update the method of upload file.
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
      // let mimeType = 10877 ? file.size : "error";
      this.props.dispatchAction(eventConstants.SHOW_LOADER);
      const s3Response = await Utils.uploadFileToS3(
        file,
        fileName,
        mimeType
      ).catch((err) => console.log(err));
      // const test = file.size
      console.log("S3", file.size);
      if (file.size <= 5242880) {
        reader.readAsDataURL(file);
        this.props.dispatchAction(eventConstants.HIDE_LOADER);
        // this.props.setLogo('');
        return s3Response?.Location;
      } else {
        // alert("the image may not be smaller than 50 kb");
        CommonToasts.failureMessageSent(validationsMessages.IMAGE_SIZE);
        // this.props.setLogo('')
      }
      this.props.dispatchAction(eventConstants.HIDE_LOADER);
    }
  };
  handleChange = async (e) => {
    const keyName = await this.readURI(e);
    if (keyName) this.props.setLogoImage(keyName);
  };
  render() {
    const imgTag = this.buildImgTag();
    // console.log("aamirImg", this.props.imageUrl.size);
    return (
      <>
        <div
          className="fileUpload"
          style={{
            maxWidth: this.props.width ? this.props.width : 182,
            overflow: "hidden",
            height: this.props.height ? this.props.height : 182,
            background: "#afafaf00 0% 0% no-repeat padding-box",
            border: this.state.imageURI == null ? "2px dashed #F0F0F6" : 0,
            borderRadius: 8,
            opacity: 1,
            position: "relative",
          }}
        >
          <input
            type="file"
            accept=".jpeg, .png, .jpg"
            id={this.state.id}
            onChange={this.handleChange}
            title=""
            style={{
              padding: 0,
              margin: 0,
              cursor: "pointer",
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              opacity: 0,
              width: "100%",
              zIndex: 1,
            }}
          />{" "}
          {imgTag}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={ArtCo}
              alt="body"
              style={{ opacity: "0.85", width: "54px", height: "46px" }}
            />
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps, { dispatchAction })(ImageFile);
