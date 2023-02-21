import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Modal from "../components/modal";
import { ChromePicker } from "react-color";

const Container = styled.section`
  border-radius: 19px;
  background-color: #ffffff;
`;

const TitleSection = styled.div`
  display: flex;
  padding: 30px;
  border-bottom: 1px solid #eaeaea;
  > h3 {
    font: 700 16px/22px var(--root-font);
    color: #1e1e1e;
  }
  > img {
    width: 20px;
    height: 20px;
    margin-left: auto;
    cursor: pointer;
  }
`;

const InputSection = styled.form`
  padding: 30px;
  h4,
  label {
    font: 600 14px/22px var(--root-font);
  }
  > div {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: space-between;
    margin-bottom: 30px;
    &:first-of-type {
      position: relative;
    }
    &:last-of-type {
      align-items: flex-start;
    }
  }
  input {
    width: 370px;
    height: 48px;
    border: 1px solid #e7e7e7;
    border-radius: 10px;
    font: 400 14px/22px var(--root-font);
    padding-left: 16px;
    color: #000000;
    &:focus {
      outline: none;
    }
    &:-ms-input-placeholder {
      color: #979797;
      font: 400 14px/22px var(--root-font);
    }
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }
  }
`;

const SelectContainer = styled.div`
  width: 370px;
  height: 48px;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  > p {
    margin-bottom: 0;
    font: 400 14px/22px var(--root-font);
    color: ${(props) => (props.textColor ? "#50555C" : "#979797")};
  }
  > img {
    width: 11px;
    height: 11px;
    margin-left: auto;
  }
`;

const TypeModalContainer = styled.ul`
  width: 353px;
  height: 395px;
  background-color: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  list-style-type: none;
  position: absolute;
  z-index: 3;
  top: 17px;
  right: 35px;
  padding: 0;
  > li {
    height: 66px;
    padding-left: 38px;
    padding-top: 22px;
    font: 400 14px/22px var(--root-font);
    cursor: pointer;
    &:not(:last-child) {
      border-bottom: 1px solid #eaeaea;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 43px;
  background-color: ${(props) => (props.disabled ? "#000000" : "#FC223B")};
  border: none;
  color: #fff;
  border-radius: 50px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

const UploaderImage = styled.div`
  display: flex;
  align-items: center;
  width: 370px;
  > div {
    width: 48px;
    padding: 8px;
    height: 48px;
    display: inline-block;
    border: 1px solid #e7e7e7;
    border-radius: 10px;
    margin-right: 25px;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  > input[type="file"] {
    display: none;
  }
  > img {
    margin-right: 16px;
  }
  > span {
    color: #fc223b;
    font: 400 14px/22px var(--root-font);
    cursor: pointer;
  }
`;

const FillColor = styled.div`
  width: 370px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ColorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColorFields = styled.section`
  display: flex;
  gap: 12px;
  > div {
    width: 83px;
    height: 34px;
    text-align: center;
    font: 400 14px/22px var(--root-font);
    padding: 4px;
    border: 1px solid #e7e7e7;
    border-radius: 10px;
  }
`;

const ModalColor = styled.div`
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const ToggleType = styled.section`
  width: 140px;
  height: 34px;
  display: flex;
  align-items: center;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  gap: 4px;
  > div {
    text-align: center;
    cursor: pointer;
    width: calc(100% - 64px);
    height: 100%;
    padding-top: 4px;
    border-radius: 10px;
    color: ${(props) => (props.active === "solid" ? "#000000" : "#fff")};
    background-color: ${(props) =>
      props.active !== "solid" ? "#000000" : "transparent"};
    &:first-of-type {
      width: 64px;
      background-color: ${(props) =>
        props.active === "solid" ? "#000000" : "transparent"};
      color: ${(props) => (props.active !== "solid" ? "#000000" : "#fff")};
    }
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  > label {
    color: #50555c;
    font: 400 14px/22px var(--root-font);
    margin-bottom: 0;
  }
  > div {
    width: 63px;
    height: 12px;
    border-radius: 10px;
    border: 1px solid #e7e7e7;
    background: ${(props) =>
      props.type
        ? props.hexOne
        : `linear-gradient(to right,${props.hexOne},${props.hexTwo})`};
  }
`;

const RecentColorsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  > label {
    color: #50555c;
    font: 400 14px/22px var(--root-font);
    margin-bottom: 0;
  }
`;

const ColorItem = styled.p`
  width: 23px;
  height: 23px;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  margin-bottom: 0;
  cursor: pointer;
  background: ${(props) =>
    props.type
      ? props.hexOne
      : `linear-gradient(to right,${props.hexOne},${props.hexTwo})`};
`;

function FieldComponent({
  fieldName,
  value,
  placeholder,
  name,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label htmlFor={name}>{fieldName} :</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target)}
      />
    </div>
  );
}

const typeList = [
  "New Post Activity",
  "New Vision Activity",
  "New Likes Activity",
  "New LiveStreams",
  "New Views Activity",
  "New Share Activity",
];

function ActivityModal({ setViewModal, viewModal }) {
  const [activityType, setActivityType] = useState("Select activity type");

  const [viewType, setViewType] = useState(false);

  const [activityStates, setActivityStates] = useState({
    name: "",
    description: "",
    count: "",
    ticket: "",
    isBtnDisable: true,
  });

  const [icon, setIcon] = useState("");

  const [colorStates, setColorStates] = useState({
    type: "solid",
    hexColor: Array.from({ length: 2 }).fill(""),
    recentColors: {
      solid: [],
      gradient: [],
    },
  });

  const [showPicker, setShowPicker] = useState("");

  const imgUploader = useRef();

  useEffect(() => {
    if (
      !typeList.includes(activityType) ||
      activityStates.count === "" ||
      activityStates.name === "" ||
      activityStates.description === "" ||
      activityStates.ticket === ""
    ) {
      setActivityStates((pre) => ({
        ...pre,
        isBtnDisable: true,
      }));
    } else {
      setActivityStates((pre) => ({
        ...pre,
        isBtnDisable: false,
      }));
    }
  }, [
    activityStates.count,
    activityStates.name,
    activityStates.ticket,
    activityStates.description,
    activityType,
  ]);

  const onSubmission = (e) => {
    e.preventDefault();
    setViewModal(false);
  };

  const onChange = ({ name, value }) => {
    setActivityStates((prev) => ({ ...prev, [name]: value }));
  };

  const uploadIcon = () => {
    imgUploader.current.click();
  };

  const fileModify = (e) => {
    setIcon(e.target.files[0]);
  };

  return (
    <Modal open={viewModal} handleClose={setViewModal}>
      <Container
        onClick={() => {
          setViewType(false);
          setShowPicker("");
        }}
      >
        <TitleSection>
          <h3>Create Activity</h3>
          <img
            onClick={() => {
              setViewModal(false);
            }}
            src="/images/close.svg"
            alt="/close"
          />
        </TitleSection>
        <InputSection onSubmit={onSubmission}>
          <div>
            <h4>Activity Type :</h4>
            <SelectContainer
              onClick={(e) => {
                e.stopPropagation();
                setViewType(true);
              }}
              textColor={typeList.includes(activityType)}
            >
              <p>{activityType}</p>
              <img src="/images/downTriangle.svg" alt="/arrow" />
            </SelectContainer>
            {viewType && (
              <TypeModalContainer>
                {typeList.map((type, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setActivityType(type);
                      setViewType(false);
                    }}
                  >
                    {type}
                  </li>
                ))}
              </TypeModalContainer>
            )}
          </div>
          <FieldComponent
            fieldName="Activity Name"
            value={activityStates.name}
            placeholder="Will be displayed to the app user"
            name="name"
            onChange={onChange}
          />
          <FieldComponent
            fieldName="Short Description"
            value={activityStates.description}
            placeholder="Give activity description briefly"
            name="description"
            onChange={onChange}
          />
          <FieldComponent
            fieldName="Count"
            value={activityStates.count}
            placeholder="Number of activities required"
            name="count"
            type="number"
            onChange={onChange}
          />
          <FieldComponent
            fieldName="Ticket"
            value={activityStates.ticket}
            placeholder="Entry ticket user will get"
            name="ticket"
            type="number"
            onChange={onChange}
          />
          <div>
            <label>Icon :</label>
            <UploaderImage>
              <div>
                {icon && <img src={URL.createObjectURL(icon)} alt="/name" />}
              </div>
              <input ref={imgUploader} onChange={fileModify} type="file" />
              <img src="/images/uploader.svg" alt="upload" />
              <span onClick={uploadIcon}>Upload Icon</span>
            </UploaderImage>
          </div>
          <div>
            <label>Background :</label>
            <FillColor>
              <ColorContainer>
                <ColorFields>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPicker("one");
                    }}
                  >
                    {colorStates.hexColor[0]}
                  </div>
                  {colorStates.type !== "solid" && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPicker("two");
                      }}
                    >
                      {colorStates.hexColor[1]}
                    </div>
                  )}
                </ColorFields>
                {showPicker === "one" && (
                  <ModalColor>
                    <ChromePicker
                      color={colorStates.hexColor[0]}
                      onChange={(color) => {
                        setColorStates((pre) => {
                          const { hexColor } = pre;
                          hexColor[0] = color.hex;
                          return {
                            ...pre,
                            hexColor,
                          };
                        });
                      }}
                    />
                  </ModalColor>
                )}
                {showPicker === "two" && (
                  <ModalColor>
                    <ChromePicker
                      color={colorStates.hexColor[1]}
                      onChange={(color) => {
                        setColorStates((pre) => {
                          const { hexColor } = pre;
                          hexColor[1] = color.hex;
                          return {
                            ...pre,
                            hexColor,
                          };
                        });
                      }}
                    />
                  </ModalColor>
                )}
                <ToggleType active={colorStates.type}>
                  <div
                    onClick={() => {
                      setColorStates((pre) => ({
                        ...pre,
                        type: "solid",
                      }));
                    }}
                  >
                    Solid
                  </div>
                  <div
                    onClick={() => {
                      setColorStates((pre) => ({
                        ...pre,
                        type: "gradient",
                      }));
                    }}
                  >
                    Gradient
                  </div>
                </ToggleType>
              </ColorContainer>
              <PreviewContainer
                type={colorStates.type === "solid"}
                hexOne={colorStates.hexColor[0]}
                hexTwo={colorStates.hexColor[1]}
              >
                <label>Preview :</label>
                <div></div>
              </PreviewContainer>
              <RecentColorsContainer>
                <label>Recently Used :</label>
                {(colorStates.type === "solid"
                  ? colorStates.recentColors.solid
                  : colorStates.recentColors.gradient
                ).map((item, index) => (
                  <ColorItem type={colorStates.type === "solid"} key={index}>
                    {item}
                  </ColorItem>
                ))}
              </RecentColorsContainer>
            </FillColor>
          </div>
          <Button disabled={activityStates.isBtnDisable} type="submit">
            Create
          </Button>
        </InputSection>
      </Container>
    </Modal>
  );
}

export default ActivityModal;
