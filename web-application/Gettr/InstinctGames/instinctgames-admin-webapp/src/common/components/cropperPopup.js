import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Cropper from "react-easy-crop";
import ArtCo from "../../assets/SVGs/artco.svg";
import CommonToasts from "./commonToasts";
import { validationsMessages } from "../../constants";

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
  margin: 0 auto;
  width: 519px;
  height: 640px;
  background: #ffffff;
  border-radius: 6px;
  opacity: 1;
  margin-top: calc(107vh - 85vh - 20px);
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
  color: #151e58;
  opacity: 1;
`;
const Cross = styled.div`
  color: #151e58;
  cursor: pointer;
  width: 24px;
  height: 24px;
  font: normal normal normal 22px/26px Barlow;
`;
const FileDiv = styled.div`
  position: relative;
  top: 22px;
  right: 19px;
  width: 517px;
  height: 390px;
  border: 1px dashed #151e58;
  border-radius: 5px;
`;
const SelectedFileDiv = styled.div`
  position: relative;
  top: 22px;
  right: 19px;
  width: 517px;
  height: 390px;
`;
const ImageLabel = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;
  /* bottom: 256px; */
  top: 160px;
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
  width: 470px;
  height: 53px;
  background: none;
  opacity: 1;
  margin-top: 80px;
`;
const UseButton = styled.button`
  width: 457px;
  height: 35px;
  background: #6874e8 0% 0% no-repeat padding-box !important;
  border-radius: 4px;
  opacity: 1;
  border: none;
  cursor: pointer;
`;
const DisableButton = styled.button`
  width: 457px;
  height: 35px;
  background: #9495A8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  border: none;
  cursor: not-allowed !important; ;
`;
const UseText = styled.span`
  font: normal normal bold 16px/19px Barlow;
  letter-spacing: 0.32px;
  color: #ffffff;
  opacity: 1;
`;
const ArtImage = styled.img`
  width: 54px;
  height: 47px;
  align-items: center;
  margin: auto;
  opacity: 1;
`;
const SelectedArtImage = styled.img`
  display: none;
`;
const UploadSpan = styled.span`
  color: #151e58;
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
  const [isImageValid, setIsImageValid] = useState(false);

  const onFileSelection = (value) => {
    console.log(value, "veda");
    const maxByte = 5242880;
    console.log(value.size,"veda ken");
    if(value.name.match(/\.(jpg|jpeg|png|svg)$/) && (value.size < maxByte)){
      setIsImageUpload(true);
      const reader = new FileReader();
  
      reader.addEventListener(
        "load",
        () => setFilePreview(reader.result),
        setFileName(value)
      );
      reader.readAsDataURL(value);
    }
    else if(value.size > maxByte){
      CommonToasts.failureMessageSent(validationsMessages.WARN_SIZE);
    } else {
      CommonToasts.failureMessageSent(validationsMessages.IMAGE_NOT_VALID);
    }

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
    return new File([new Uint8Array(binary)], fileName.name);
  }

  const renderSwitch = () => {
    switch (props?.isOpenFor) {
      case "cover":
        return props.getEncodedCoverData(croppedImage, "cover");
      case "logo":
        return props.getEncodedLogoData(croppedImage, "logo");
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
    <PopupBox>
      <BoxDiv>
        <Header>
          <Edit>{props.imageType}</Edit>
          <Cross onClick={props.handleClose}>x</Cross>
        </Header>
        <ActiveBorder>
          <Cropper
            image={filePreview}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            cropShape={props?.isOpenFor === "logo" ? "round" : "rect"}
            aspect={props?.isOpenFor === "logo" ? 1 / 1 : 16 / 5}
            showGrid={false}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div>
            <ActiveLabel for="image">
              <ActiveArtImage src={ArtCo} alt="body" />
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
        <ButtonDiv>
          <ActiveButton
            disabled={isImageUpload ? false : true}
            onClick={showCroppedImage}
          >
            <UseText>Use Photo</UseText>
          </ActiveButton>
        </ButtonDiv>
      </BoxDiv>
    </PopupBox>
  );
}
