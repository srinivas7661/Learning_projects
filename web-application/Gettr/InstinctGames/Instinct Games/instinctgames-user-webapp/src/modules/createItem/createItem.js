import React, { useState, useEffect, useRef } from "react";
import CollectionSelect from "./collectionSelect";
import TypeSelect from "./typeSelect";
import UploadFile from "./uploadFile";
import PriceSelect from "./priceSelect";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import useOnClickOutside from "../../common/useOnClickOutside";
import { credsConstants, validationsMessages } from "../../constants";
import "../../assets/styles/custom.css";
import { ConfigurationOptions } from "aws-sdk";
import NftCreatedPopup from "./nftCreatedPopUp";
import isURL from 'validator/lib/isURL';
const CreateItem = (props) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [initialTag, setInitialTag] = useState([]);
  const [tags, setTag] = useState([]);
  const [externalLinks, setExternalLinks] = useState("");
  const [nftCount, setNftCount] = useState(1);

  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState("");
  const [type, setType] = useState("");
  const [currency, setCurrency] = useState("");
  const [status, setStatus] = React.useState(false);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [externalLinksError, setExternalLinksError] = useState("");

  const [descriptionError, setDescriptionError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [priceData, setPriceData] = useState("");
  const [decimal, setDecimal] = useState(18);
  const [iconShow, setIconShow] = React.useState(false);
  const [typeiconShow, setTypeIconShow] = React.useState(false);
  const [collectionError, setCollectionError] = React.useState("");
  const [tagError, setTagError] = React.useState("");
  const [propertyError, setPropertyError] = React.useState("");
  const [fileError, setFileError] = React.useState("");
  const [typecheck, setTypeCheck] = React.useState("");
  const [properties, setProperties] = React.useState([
    {
      id: 1,
      trait_type: "",
      value: "",
    },
  ]);
  const [isActive, setIsActive] = React.useState({ status: false, id: "" });
  useEffect(() => {
    if (initialTag?.length > 0) {
      let arr = [];
      arr.push(initialTag);
      setTag(arr[0]);
    }
  }, [initialTag]);

  function validateInformation() {
    let nameError = !name ? validationsMessages.PLEASE_ENTER_THE_NAME : "";
    let priceError = "";
    if (!price) {
      priceError = validationsMessages.PLEASE_ENTER_PRICE_ERROR;
    } else {
      const minValue = 1 / 10 ** Number(decimal);
      if (Number(price) < minValue) {
        priceError = validationsMessages.PRICE_ENTER_ERROR + minValue;
      }
    }
    let linkError ;
    if(!externalLinks){
      linkError= validationsMessages.PLEASE_ADD_EXTERNAL_LINK
    }else{
      linkError = !isURL(externalLinks) ? validationsMessages.INVALID_URL : "";
    }

    let descriptionError = !description
      ? validationsMessages.ENTER_DESCRIPTION_ERROR
      : "";
    let typeError = !type ? validationsMessages.SELECT_TYPE_ERROR : "";
    let collectionError =
      !collection && collection !== 0 ? "Please select collection" : "";
    // let propertyError =   properties.map(e => e.name === "" && e.value === "" ? 'Please enter properties' : "")
    let fileError = !file ? "Please upload file" : "";
    setNameError(nameError);
    setPriceError(priceError);
    setExternalLinksError(linkError);

    setDescriptionError(descriptionError);
    setCollectionError(collectionError);
    setTypeError(typeError);
    // setPropertyError(propertyError)
    setFileError(fileError);
    return !!(
      nameError ||
      priceError ||
      descriptionError ||
      typeError ||
      collectionError ||
      fileError ||
      linkError
    );
  }

  const addIPFS = async () => {
    if (validateInformation()) return;

    props.createNftHandler({
      file,
      name,
      price,
      externalLinks,
      description,
      selectedCollectionIndex: collection,
      type,
      tags,
      currency,
      properties,
      nftCount
    });
  };
  const getCollection = async (data) => {
    setCollection(data);
  };
  const getPrice = async (data) => {
    setCurrency(data);
  };
  const getType = async (data) => {
    setType(data);
  };
  const handleTagChange = (value) => {
    setInitialTag(value);
  };

  const addItem = async () => {
    await setProperties([
      ...properties,
      {
        id: properties.length + 1,
        trait_type: "",
        value: "",
      },
    ]);
  };
  const removeItem = (index) => {
    const list = [...properties];
    list.splice(index, 1);
    setProperties(list);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...properties];
    list[index][name] = value;
    setProperties(list);
  };

  const handleActive = (param) => {
    setIsActive({ status: !isActive.status, id: param });
  };

  const onOptionClicked = (value, decimal) => () => {
    setCurrency(value);
    setDecimal(decimal);
    setIsShow(false);
  };
  const ref = useRef();
  useOnClickOutside(ref, () => setIsShow(false));
  const CHARACTER_LIMIT = 1000;
  const NAME_LIMIT = 40;
  const TYPE_LIMIT = 30;
  const VALUE_LIMIT = 30;
  const PRICE_LIMIT = 20;

  const iconChange = () => {
    setIconShow(!iconShow);
  };
  const typeIconChange = () => {
    setTypeIconShow(!typeiconShow);
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className="bg-main bg-cover text-white pb-13 pt-tix">
        <div className="polygon-token bg-black-60 ml-auto mr-auto mb-0 w-pex relative pb-5">
          <div className="flex justify-center font-black font-EurostileExtended text-right mr-2 mb-e:text-center text-white text-ft26 xr:text-ft-2.7 py-thp">
            CREATE NFT
          </div>
          <div className="border-b-2 border-primary-50 sm:text-primary-50"></div>
          <div className="xr:flex justify-evenly mt-6 w-nex mx-auto">
            <div className="mb-20 mb-e:w-fit tablet:mb-10">
              <div className="mb-1.5">Upload file <span className="text-red-50">*</span></div>
              <UploadFile
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setTypeCheck(e.target.files[0].type);
                  setFileError("");
                }}
              />
              <div className="mt-2.25 text-grey-110 font-EurostileMedium text-ft-10 xr:text-ft12">
                Upload PNG, JPG, JPEG, GIF, MP3, MP4, MOV file. Max size: 10 MB
              </div>
              <span className="text-red-50">{fileError}</span>
              <div className="hidden xr:block md:flex md:items-center mt-10">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3 mt-19.25">
                  <button
                    className="hidden xr:block border-solid border-2 border-indigo-600 rounded-full  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 border-primary-50 bg-blue-60 w-45 h-12 market-button relative overflow-hidden border-blue-80 z-10"
                    type="button"
                    onClick={() => {
                      addIPFS();
                    }}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
            <form className="max-w-lg mb-20 xr:ml-8.75">
              <div className="flex flex-wrap -mx-3">
                <div className="w-full mb-2 px-3">
                  <label
                    className="block  tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1"
                    for="grid-password"
                  >
                    Name<span className="text-red-50 ml-1.25">*</span>
                  </label>
                  <input
                    className="bg-black-300 mt-tex text-ft-10 xr:text-ft12 border-solid tablet:h-6.75 border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-0.5 px-4 mb-1 leading-tight focus:outline-none  focus:border-gray-500 xr:h-2.3vw h-5.5"
                    placeholder="Name"
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError("");
                    }}
                  />

                  <span className="text-red-50">{nameError}</span>
                </div>
                <div className="w-full mb-2 px-3">
                  <label
                    className="block  tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1"
                    for="grid-password"
                  >
                    Price<span className="text-red-50 ml-1.25">*</span>
                  </label>
                  <div className="flex w-full">
                    <div className="w-3/4">
                      <input
                        className="bg-black-300 mt-tex text-ft-10 xr:text-ft12 tablet:h-6.75 border-solid border-1 border-primary-50 appearance-none block w-full xr:h-2.3vw h-5.5 bg-gray-200 text-gray-700 border border-gray-200 rounded-l py-0.5 px-4 mb-1 leading-tight focus:outline-none focus:border-gray-500"
                        type="number"
                        placeholder="Enter Price"
                        onChange={(e) => {
                          setPrice(e.target.value);
                          setPriceError("");
                        }}
                      />
                      <span className="text-red-50">{priceError}</span>
                    </div>
                    <PriceSelect tokens={props?.token} getPrice={getPrice} />
                  </div>
                </div>
                <div className="w-full mb-2 px-3">
                  <label
                    className="block  tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1"
                    for="grid-password"
                  >
                    External Link<span className="text-red-50 ml-1.25">*</span>
                  </label>
                  <input
                    className="bg-black-300 mt-tex text-ft-10 xr:text-ft12 tablet:h-6.75 xr:h-2.3vw h-5.5 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-0.5 px-4 mb-1 leading-tight focus:outline-none  focus:border-gray-500"
                    placeholder="External Link"
                    onChange={(e) => {
                      setExternalLinks(e.target.value);
                      setExternalLinksError("");
                    }}
                  />
                  <span className="text-red-50">{externalLinksError}</span>
                </div>

                <div className="w-full mb-2 px-3">
                  <label
                    className="block  tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1"
                    for="grid-password"
                  >
                    Description<span className="text-red-50 ml-1.25">*</span>
                  </label>
                  <textarea
                    className="bg-black-300 text-ft-10 mt-tex xr:text-ft12 xr:h-6vw h-22.75 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-0.5 px-4 mb-2 leading-tight focus:outline-none focus:border-gray-500"
                    type="text"
                    placeholder="Details about this item"
                    maxLength={450}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setDescriptionError("");
                    }}
                  />
                  <span className="text-red-50">{descriptionError}</span>
                </div>
                <div className="w-full xr:flex justify-between px-3 mb-3">
                  <div className="mb-2 xr:mb-0 xr:w-fgx">
                    <label
                      className="block  tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1"
                      for="grid-password"
                    >
                      Collection<span className="text-red-50 ml-1.25">*</span>
                    </label>
                    <CollectionSelect
                      collection={props?.collection}
                      getCollection={getCollection}
                      setCollectionError={setCollectionError}
                    />
                    <span className="text-red-50">{collectionError}</span>
                  </div>
                  <div className="xr:w-fgx">
                    <label
                      className="block  tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1"
                      for="grid-password"
                    >
                      Type<span className="text-red-50 ml-1.25">*</span>
                    </label>
                    <TypeSelect getType={getType} setTypeError={setTypeError} />
                    <span className="text-red-50">{typeError}</span>
                  </div>
                </div>

                <div className={`w-full my-4 px-3 ${props.collection[collection]?.tokenType !== 'ERC1155' ? "hidden": ""}`}>
                  <label
                      className="block  tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1"
                      htmlFor="grid-password"
                  >
                    NFT Count (ERC1155 Collection)<span className="text-red-50 ml-1.25">*</span>
                  </label>
                  <input
                      className="bg-black-300 mt-tex text-ft-10 xr:text-ft12 tablet:h-6.75 xr:h-2.3vw h-5.5 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-0.5 px-4 mb-1 leading-tight focus:outline-none  focus:border-gray-500"
                      type="number"
                      placeholder="NFT Count"
                      value={nftCount}
                      onChange={(e) => {
                        setNftCount(parseInt(e.target.value));
                      }}
                  />
                </div>

                <div className="w-full px-3 ">
                  <label
                    className="tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1"
                    for="grid-password"
                  >
                    Add Tag
                  </label>
                  <TagsInput
                    inputProps={{
                      placeholder: "Tag",
                    }}
                    className={initialTag.length?"h-full bg-black-300 mt-tex mb-tex  pt-tex text-ft-10 xr:text-ft12 border-solid border-1 border-primary-50  tablet:pt-0.75 appearance-none flex items-center w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 2.5xl:pt-2 px-4 leading-tight focus:outline-none  focus:border-gray-500":"bg-black-300 mt-tex mb-tex  pt-tex text-ft-10 xr:text-ft12 border-solid border-1 border-primary-50  tablet:pt-0.75 appearance-none flex items-center w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 2.5xl:pt-2 px-4 leading-tight focus:outline-none  focus:border-gray-500 xr:h-2.3vw tablet:h-6.75 mobile:h-5.5 "}
                    maxTags={10}
                    value={initialTag}

                    onChange={handleTagChange}
                    addOnBlur={(e) => console.log(e)}
                  />
                  <span className="text-ft-10 xr:text-ft12 ">{`${
                    initialTag?.length
                  }/${10}`}</span>
                </div>
                <div className={initialTag.length?"w-full  mt-16":"w-full"}>
                  <label
                    className=" tracking-wide mb-tex text-gray-700 text-ft-10 xr:text-ft12 px-3 w-full"
                    for="grid-password"
                  >
                    Properties
                  </label>

                  {/* <div className="block mb-2 mb-e:flex justify-between w-full"> */}
                  {/* <div className="w-full px-3">
                    <label
                      className=" tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1 block mb-e:hidden"
                      for="grid-password"
                    >
                      Type
                    </label>
                    <input
                      className="bg-black-300 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-0.5 px-4 mb-2 leading-tight focus:outline-none  focus:border-gray-500"
                      placeholder="Type"
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    />
                  </div>
                  <div className="w-full px-3">
                    <label
                      className=" tracking-wide text-gray-700 text-ft-10 xr:text-ft12 mb-1 block mb-e:hidden"
                      for="grid-password"
                    >
                      Topic
                    </label>
                    <input
                      className="bg-black-300 border-solid border-1 border-primary-50 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-0.5 px-4 mb-2 leading-tight focus:outline-none  focus:border-gray-500"
                      placeholder="Topic"
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError("");
                      }}
                    />
                  </div> */}

                  <div className="mt-tex">
                    {properties?.map((data, index) => {
                      return (
                        <>
                          <div
                            className="justify-between w-full xr:flex tablet:flex mobile:flex flex"
                            key={data.id}
                          >
                            <div className="w-full px-3 mobile:pr-0">
                              <input
                                className="bg-black-300 mt-tex xr:h-2.3vw h-5.5 text-ft-10 xr:text-ft12 tablet:h-6.75 border-solid border-1 border-primary-50 appearance-none block xr:w-full w-eiy bg-gray-200 text-gray-700 border border-gray-200 rounded py-0.5 px-4 mb-2 leading-tight focus:outline-none  focus:border-gray-500"
                                placeholder="Type"
                                autoComplete="off"
                                name="trait_type"
                                value={data.trait_type}
                                maxLength="30"
                                onChange={(e) => {
                                  handleInputChange(e, index);
                                }}
                              ></input>
                            </div>
                            <div className="w-full px-3 flex justify-between mobile:pl-0 mobile:pr-0">
                              <input
                                className="bg-black-300 mt-tex border-solid text-ft-10 xr:text-ft12 tablet:h-6.75 border-1 border-primary-50 appearance-none xr:h-2.3vw h-5.5 xr:w-full w-eiy bg-gray-200 text-gray-700 border border-gray-200 rounded py-0.5 px-4 mb-2 leading-tight focus:outline-none  focus:border-gray-500"
                                placeholder="Name"
                                autoComplete="off"
                                name="value"
                                value={data.value}
                                maxLength="30"
                                onChange={(e) => {
                                  handleInputChange(e, index);
                                }}
                              ></input>
                            </div>

                            {index === properties.length - 1 ? (
                              <img
                                className="tablet:pl-2.5 mobile:pl-0 mobile:pr-1.25"
                                src="/images/Add1.svg"
                                onClick={addItem}
                              ></img>
                            ) : (
                              <img
                                className="tablet:pl-2.5"
                                src="/images/Minus.svg"
                                onClick={() => removeItem(index)}
                              ></img>
                            )}
                          </div>
                          {/* <span className="text-red-50">{propertyError}</span> */}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center mt-5.5">
                <button
                  className="block xr:hidden border-solid border-2 border-indigo-600 rounded-full text-ft0 focus:shadow-outline focus:outline-none text-white font-bold border-blue-80 sm:border-primary-50 bg-blue-60 w-25 h-6.5"
                  type="button"
                  onClick={() => {
                    addIPFS();
                  }}
                >
                  Create
                </button>
              </div>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
      {props.isOpen && (
        <NftCreatedPopup
          content={props.content}
          isOpen={props.isOpen}
          steps={props.steps}
          handleClose={props.showPopup}
        />
      )}
    </>
  );
};

export default CreateItem;
