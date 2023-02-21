import React from "react";

class ImageFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "someUniqueId", // I would use this.props.id for a real world implementation
      imageURI: null,
    };
  }

  buildImgTag() {
    let imgTag = null;
    if (this.state.imageURI !== null)
      imgTag = (
        <div style={{ height: "205px" }}>
          <img
            style={{ width: "101%", height: "101%", borderRadius: "8%" }}
            src={this.state.imageURI}
          ></img>
        </div>
      );
    return imgTag;
  }

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        this.setState({ imageURI: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChange(e) {
    this.readURI(e); // maybe call this with webworker or async library?
    if (this.props.onChange !== undefined) this.props.onChange(e); // propagate to parent component
  }

  render() {
    const imgTag = this.buildImgTag();

    return (
      <>
        <div
          className="fileUpload"
          style={{
            width: 190,
            overflow: "hidden",
            height: 209,
            background: "#afafaf00 0% 0% no-repeat padding-box",
            border: "2px dashed #ffffff",
            borderRadius: 12,
            opacity: 1,
            position: "relative",
          }}
        >
          <input
            id={this.state.id}
            type="file"
            onChange={this.handleChange.bind(this)}
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
            }}
          />{" "}
          {imgTag}
          <div
            style={{
              padding: "20px 20px 20px 0px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src= "Art.svg" alt="body" style={{opacity:'0.85', width: "40%", margin:'20px 0 5px 17px' }} />
            <span style={{display:'inline-block',width:'100%',marginLeft:'25px', opacity:'0.8',fontSize:'13px' ,color:'#D6D6D6'}}>Upload Image, Gif or Video</span>
          </div>
        </div>
      </>
    );
  }
}
//   React.render(<ImageFile />, document.getElementById('app'));
export default ImageFile;
