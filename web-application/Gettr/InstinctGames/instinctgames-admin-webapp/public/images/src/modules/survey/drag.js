import React, { useMemo, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";
import DialogContent from "@material-ui/core/DialogContent";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  borderRadius: 5,

  height: "104px",
  width: "400px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  color: "#ACACAC",
  border: "0.3px dashed var(--unnamed-color-acacac)",
  border: "0.30000001192092896px dashed #ACACAC",
  // marginTop: 5,
};
const Image = styled.img`
  width: 100%;
  height: 145px;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;
// const UploadBox = styled.div`
// const baseStyle = {
//   borderRadius: 5,
//   height: '104px',
//   width: '400px',
//   background: "#FFFFFF 0% 0% no-repeat padding-box",
//   color: "#ACACAC",
//   border:"0.30000001192092896px dashed #ACACAC",
//   marginTop:5

//  /* }; */
// `;
const UploadBtn = styled.input`
  width: 16px;
  height: 16px;
  margin-top: -18px;
  display: contents;
`;
const Img = styled.img`
  margin-top: 10px;
  height: 47px;
  width: 50px;
margin-left: auto;
  margin-right:auto;
  display:flex;
  text-align: center;
`;

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const useStyles = makeStyles(() => ({
  paper: {
    width: "33%",
    alignSelf: "flex-start",
    marginTop: "60px",
  },
  "@media (max-width: 1024px)": {
    paper: {
      width: "50%",
      alignSelf: "baseline",
      marginTop: "60px",
    },
  },
  container: {
    padding: "0px 46px 0px 46px",
  },
  stylebtn: {
    padding: "0px 46px 0px 46px",
  },
  styleTab: {
    minHeight: "1px",
    padding: "0px 0px 0px 4px",
  },
  formControl: {
    minWidth: "100%",
    minHeight: "10px",
  },
  selected: {
    backgroundColor: "transparent",
  },
  styleUploadBtn: {
    margin: "0 auto",
    display: "block",
    textAlign: "center",
    marginTop: "24px",
    zIndex: "1",
    position: "relative",
    background: "#ffffff",
    width: "min-content",
    cursor: "pointer",
  },
  styleUploadImg: {
    height: "70px",
    width: "70px",
  },
  selectBox: {
    height: "45px",
    fontSize: "16px",
  },
  styleBrowse: {
    color: "#009fe0",
    textAlign: "center",
    width: "100%",
  },
}));

export default function StyledDropzone(props) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const [file, setFile] = React.useState("");

  const handleUpload = (event) => {
    setFile(event.target.files[0]);
  };
  const ImageThumb = ({ image }) => {
    return <Image src={URL.createObjectURL(image)} alt={image.name} />;
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>

    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const filepath = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="">

      {filepath.length === 0 ? (
        <div className="upload-box">
          <input {...getInputProps()} />

          {/* <span
            style={{
              color: "#7D84C0",
              cursor: "pointer",
            }}
            onClick={open}
          >
            <Img src="images/drag.svg" /></span> */}
          <div className="dragcont">
            {/* <div> */}
            Drag and drop CSV or XLS Files or{" "}
            <span
              style={{
                color: "#7D84C0",
                cursor: "pointer",
              }}
              onClick={open}
            >
              browse
            </span>
          </div>

          {/* <DialogContent className={classes.stylebtn}>
          {file ? <UploadBox><ImageThumb image={file} /></UploadBox> : <UploadBox>
            <label className={classes.styleUploadBtn} for='upload-file'>
              <img alt="" className={classes.styleUploadImg} src="/images/Upload.svg" />
              <UploadBtn type="file" onChange={handleUpload} id='upload-file'></UploadBtn>
            </label>
            <span className={classes.styleBrowse}>Upload</span>
          </UploadBox>}
          </DialogContent> */}
        </div>
      ) : (
        <div {...getRootProps({ style })}>
          <Img src="images/doc.svg" />

          <p className="dragcont" style={{ textAlign: "center" }}>{filepath}</p>
        </div>
      )}
    </div>
  );
}
