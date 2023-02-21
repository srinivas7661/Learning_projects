import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Cropper from "react-easy-crop";
import "react-image-crop/dist/ReactCrop.css";
import { stringConstants, validationsMessages } from "../../constants";

const PopupBox = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1001;
`;
const BoxDiv = styled.div`
  position: relative;
  margin: 33px auto;
  width: 242px;
  height: 242px;
  background: #181442 0% 0% no-repeat padding-box;
  border-radius: 6px;
  opacity: 1;
  //   margin-top: calc(107vh - 85vh - 20px);
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
const Edit = styled.div`
  font: normal normal normal 22px/26px Barlow;
  color: #ffffff;
  opacity: 1;
`;
const Cross = styled.div`
  color: #ffffff;
  cursor: pointer;
  width: 24px;
  height: 24px;
  font: normal normal normal 22px/26px Barlow;
`;
const FileDiv = styled.div`
  position: relative;
  top: -20px;
  right: 19px;
  width: 242px;
  height: 242px;
  border: 1px solid #181442;
  border-radius: 5px;
`;
const SelectedFileDiv = styled.div`
  position: relative;
  top: -20px;
  right: 19px;
  width: 242px;
  height: 242px;
`;
const ImageLabel = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;
  /* bottom: 256px; */
  top: 70px;
  color: #ffffff;
  font-size: 18px;
  opacity: 1;
`;
const SelectedImageLabel = styled.label`
  display: none;
`;
const ChangeFile = styled.input`
  position: absolute;
  top: 155px;
  left: 200px;
  opacity: 0;
`;
const SelectedChangeFile = styled.input`
  display: none;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  height: 53px;
  background: transparent linear-gradient(270deg, #53c1f6 0%, #51c3f500 100%) 0%
    0% no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  margin-top: ${(props) => (props.isImageVisible === true ? "35px" : "80px")};
`;
const ReplaceDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 70px;
`;
const ReplaceLabel = styled.label`
  display: flex;
  flex-direction: row;
`;
const ReplaceImage = styled.img`
  width: 24px;
  height: 24px;
  padding: 0 5px 2px 0;
  cursor: pointer;
`;
const ReplaceText = styled.div`
  text-align: center;
  font: normal normal bold 16px/19px Barlow;
  letter-spacing: 0.32px;
  color: #53c1f5;
  opacity: 1;
  cursor: pointer;
`;
const UseButton = styled.button`
  width: 457px;
  height: 35px;
  background: transparent linear-gradient(90deg, #55bff6 0%, #24e4e8 100%) 0% 0%
    no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  border: none;
  cursor: pointer;
`;
const DisableButton = styled.button`
  width: 457px;
  height: 35px;
  background: transparent linear-gradient(90deg, #55bff6 0%, #24e4e8 100%) 0% 0%
    no-repeat padding-box;
  border-radius: 12px;
  opacity: 1;
  border: none;
  cursor: not-allowed !important; ;
`;
const UseText = styled.span`
  font: normal normal bold 16px/19px Barlow;
  letter-spacin
  color: #ffffff;
  opacity: 1;
`;
const ArtImage = styled.img`
  width: 110px;
  height: 110px;
  align-items: center;
  margin: auto;
  opacity: 1;
`;
const SelectedArtImage = styled.img`
  display: none;
`;
const UploadSpan = styled.span`
  color: #ffffff;
  margin: auto;
  opacity: 1;
`;
const SelectedUploadSpan = styled.span`
  display: none;
`;
export default function CoverCropper(props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [fileName, setFileName] = useState("");

  const onFileSelection = (value) => {
    setIsImageUpload(true);
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => setFilePreview(reader.result),
      setFileName(value)
    );
    reader.readAsDataURL(value);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        filePreview,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }

  function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  }

  async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);

    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    let encodedFile = canvas.toDataURL(`image/${fileName.name.split(".")[1]}`);
    let blobBinary = atob(encodedFile.split(",")[1]);
    let binary = [];
    for (let index = 0; index < blobBinary.length; index++) {
      binary.push(blobBinary.charCodeAt(index));
    }

    let a = new File([new Uint8Array(binary)], fileName.name);
    return a;
  }

  // const renderSwitch = () => {
  //   switch (props?.isOpenFor) {
  //     case stringConstants.TITLE_COVER:
  //       return props.getEncodedCoverData(croppedImage, props?.isOpenFor);
  //     case stringConstants.TITLE_PROFILE:
  //       return props.getEncodedProfileData(croppedImage, props?.isOpenFor);
  //     default:
  //       return;
  //   }
  // };
  const renderSwitch = () => {
    switch (props?.isOpenFor) {
      case stringConstants.TITLE_COVER:
        return props.getEncodedCoverData(croppedImage, props?.isOpenFor);
      case stringConstants.TITLE_PROFILE:
        return props.getEncodedProfileData(croppedImage, props?.isOpenFor);
      default:
        return;
    }
  };

  useEffect(() => {
    if (croppedImage) {
      renderSwitch();
      props.handleClose();
    }
  }, [croppedImage, props]);

  const ActiveBorder = isImageUpload ? SelectedFileDiv : FileDiv;
  const ActiveLabel = isImageUpload ? SelectedImageLabel : ImageLabel;
  const ActiveArtImage = isImageUpload ? SelectedArtImage : ArtImage;
  const ActiveUploadSpan = isImageUpload ? SelectedUploadSpan : UploadSpan;
  const ActiveChangeFile = isImageUpload ? SelectedChangeFile : ChangeFile;
  const ActiveButton = isImageUpload ? UseButton : DisableButton;
  return (
    // <PopupBox>
    <>
      <BoxDiv>
        <ActiveBorder>
          <Cropper
            image={filePreview}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            cropShape={
              props?.isOpenFor === stringConstants.TITLE_PROFILE
                ? "rhombus"
                : "rect"
            }
            aspect={
              props?.isOpenFor === stringConstants.TITLE_PROFILE
                ? 1 / 1
                : 16 / 5
            }
            showGrid={false}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className="flex justify-center items-center">
            <ActiveLabel for="image">
              <ActiveArtImage className="" src="/images/art.svg" alt="body" />
              <ActiveUploadSpan>Click here to upload Image</ActiveUploadSpan>
            </ActiveLabel>
            <ActiveChangeFile
              id="image"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={(event) => onFileSelection(event.target.files[0])}
            />
          </div>
        </ActiveBorder>
        {/* {isImageUpload === true && (
          <ReplaceDiv>
            <ReplaceLabel for="image">
              <ReplaceImage src="/Replace.svg" />
              <ReplaceText>Replace Image</ReplaceText>
            </ReplaceLabel>
          </ReplaceDiv>
        )} */}
        {/* <ButtonDiv isImageVisible={isImageUpload}>
          <ActiveButton
            disabled={isImageUpload ? false : true}
            onClick={showCroppedImage}
          >
            <UseText>Use Photo</UseText>
          </ActiveButton>
        </ButtonDiv> */}
      </BoxDiv>
      {isImageUpload ? (
        <>
          {" "}
          <div className="controls">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className="zoom-range"
            />
          </div>
          <div className="flex w-72 justify-between mt-7">
            <button
              className="border-solid  border-2 border-indigo-600 rounded-full  focus:shadow-outline focus:outline-none text-white font-bold py-2  border-primary-50 bg-blue-60 w-32 h-12"
              onClick={showCroppedImage}
            >
              Apply
            </button>
            <button
              className="border-solid  border-2 border-indigo-600 rounded-full  focus:shadow-outline focus:outline-none text-white font-bold py-2  border-primary-50 bg-blue-60 w-32 h-12"
              onClick={props.handleClose}
            >
              Cancel
            </button>
          </div>{" "}
        </>
      ) : (
        ""
      )}
    </>
    // </PopupBox>
  );
}
