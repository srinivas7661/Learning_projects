import React, { useEffect, useState } from "react";
import { ContentService } from "../../services";
import Utils from "../../utility";
import { Toaster } from "react-hot-toast";
import { credsConstants, validationsMessages } from "../../constants";
import CommonToasts from "../../common/components/commonToasts";

function FaqComponent(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { displayReply, faqList } = props;
  const data = [
    { id: 0, label: "Buying", topic: "How to purchase your first NFT?" },
    { id: 1, label: "Selling", topic: "How to list your first NFT?" },
    { id: 2, label: "Creating", topic: "How to create your first NFT?" },
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  };

  const [isActive, setIsActive] = React.useState(false);
  const handleClickOpen = () => {
    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
  };

  const requestHelpCenter = async () => {
    try {
      let data = {
        name: name,
        to: credsConstants.RECIEVER_EMAIL_ADDRESS,
        from: credsConstants.SENDER_EMAIL_ADDRESS,
        subject: credsConstants.HELP_CENTER_SUBJECT,
        title: credsConstants.TEXT_TYPE,
        text: credsConstants.TEXT_TYPE,
        email: email,
        topic: selectedItem,
        comment: comments,
        sentFromEmail: credsConstants.SENDER_EMAIL_ADDRESS,
        postedBy: credsConstants.SENDER_EMAIL_ADDRESS,
        postedTo: credsConstants.RECIEVER_EMAIL_ADDRESS,
      };
      const res = await ContentService.helpCenterService(data);
      if (res === true) {
        CommonToasts.successToast(validationsMessages.MAIL_SENT_SUCCESSFULLY);
        setName("");
        setEmail("");
        setComments("");
        setSelectedItem("");
      }
    } catch (error) {
      return;
    }
  };

  const sendData = () => {
    if (
      name?.length !== 0 &&
      email?.length !== 0 &&
      selectedItem?.length !== 0 &&
      comments?.length !== 0
    ) {
      Utils.validateEmail(email) === true
        ? requestHelpCenter()
        : CommonToasts.errorToast(validationsMessages.EMAIL_VALIDATION);
    } else {
      CommonToasts.errorToast(validationsMessages.FORM_FIELD_ERROR);
    }
  };
  const [iconShow, setIconShow] = React.useState(false);

  const iconChange = () => {
    setIconShow(!iconShow);
  };

  return (
    <div className="w-full tb:py-25 px-10 pb-32 bg-main bg-no-repeat bg-cover flex justify-center pt-7.5">
      <Toaster />
      <div className="policy_clip min-w-333 lg:m-w-332.5  flex flex-col items-center bg-black-100 border-grey-50 w-332.5">
        <h1 className="text-white pt-7.5 pb-10.25 w-full text-center border-b-2 border-blue-80 sm:border-primary-50 text-ft22 md:text-ft9 xl:text-ft19  font-EurostileExtd font-black">
          FAQ
        </h1>
        {/* FAQ List */}
        <div className="flex mt-4 py-3.12 w-full h-151 overflow-y-scroll flex-col items-center gap-4">
          {faqList.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  displayReply(item.id);
                }}
                className={`group hover:bg-blue-80 ${
                  item.view ? "bg-blue-80" : "bg-blue-100"
                }  border border-blue-80 font-EurostileMedium cursor-pointer w-nex flex justify-between rounded-15  xl:rounded-lg-2 p-4 sm:p-8 xl:p-12 `}
              >
                <div className="w-4/5 text-ft0 sm:text-ft13 xl:text-ft15 text-white ">
                  <h1 className="mb-4  ">{item.question}</h1>
                  {item.view && (
                    <p className="break-words opacity-64">{item.answer}</p>
                  )}
                </div>
                <svg
                  className={` ${
                    item.view ? "fill-white" : "fill-blue"
                  } group-hover:fill-white w-4 sm:w-5 self-start xl:w-8 `}
                  id="Icon_awesome-plus"
                  data-name="Icon awesome-plus"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 31.682 31.683"
                >
                  <path
                    id="Icon_awesome-plus-2"
                    data-name="Icon awesome-plus"
                    d="M29.419,14.7H19.236V4.513A2.263,2.263,0,0,0,16.973,2.25H14.71a2.263,2.263,0,0,0-2.263,2.263V14.7H2.263A2.263,2.263,0,0,0,0,16.96v2.263a2.263,2.263,0,0,0,2.263,2.263H12.447V31.669a2.263,2.263,0,0,0,2.263,2.263h2.263a2.263,2.263,0,0,0,2.263-2.263V21.486H29.419a2.263,2.263,0,0,0,2.263-2.263V16.96A2.263,2.263,0,0,0,29.419,14.7Z"
                    transform="translate(0 -2.25)"
                    fill
                  />
                </svg>
              </div>
            );
          })}
        </div>
        {/* FORM */}
        <div className="w-full pt-5 mb-6.25 flex flex-col border-t-2 border-primary-50 items-center mobile:mb-0 mobile:border-blue-80">
          <h1 className="text-ft5 sm:text-ft17 lg:text-ft20 text-white font-EurostileBold">
            Still have questions?
          </h1>
          <h1 className="text-ft8 sm:text-ft20 lg:text-ft21 text-blue-80 font-EurostileExtd font-black">
            HELP CENTER
          </h1>
        </div>
        <div className="w-full flex sm:justify-center mb-16.5 px-4 mobile:mb-0">
          {/* Form Submission */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            autoComplete="off"
            className="text-ft23 w-full max-w-627 sm:text-ft6 xl:text-ft13 flex flex-col text-white"
          >
            <div className="flex flex-col gap-3 sm:gap-8 mb-4 sm:flex-row sm:justify-between">
              <div className="flex flex-col sm:w-75.75 font-EurostileMedium">
                <label className="text-white mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-black-300 pl-4 placeholder-opacity-30 placeholder-white h-5.5 sm:h-11 rounded focus:outline-none border border-primary-50 mobile:pl-1.25"
                />
              </div>
              <div className="flex flex-col sm:w-75.75 font-EurostileMedium">
                <label className="text-white mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Write your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black-300 pl-4 placeholder-opacity-30 placeholder-white h-5.5 sm:h-11 rounded focus:outline-none border border-primary-50 mobile:pl-1.25"
                />
              </div>
            </div>
            <div className="flex flex-col mb-4 font-EurostileMedium">
              <label className="text-white mb-2">Topic</label>
              <div
                className="h-8 sm:h-11 border rounded relative border-primary-50 bg-black-300 xl:w-299 mobile:h-5.75"
                onClick={iconChange}
              >
                <div
                  className={selectedItem?"py-1 px-3 cursor-pointer flex items-center justify-between text-white mobile:pl-1.25 mobile:pt-0":"py-1 px-3 cursor-pointer flex items-center justify-between text-grey-110 mobile:pl-1.25 mobile:pt-0"}
                  onClick={(e) => setIsActive(!isActive)}
                >
                  {selectedItem
                    ? items.find((item) => item.label == selectedItem).label
                    : "Choose Topic "}
                  {!iconShow ? (
                    <img className="w-7.5" src="/images/Dropdown.svg" />
                  ) : (
                    <img className="w-3.75" src="/images/arrow-up.svg" />
                  )}
                </div>
                {isActive && (
                  <div
                    className="xl:w-299 absolute left-0 bg-black-300 border rounded border-primary-50 text-white mt-3.5 w-159 z-250"
                    onClick={(e) => setIsActive(!isActive)}
                  >
                    {items.map((item) => (
                      <div
                        className=" cursor-pointer p-2.5 text-white  border-primary-50 border-b"
                        onClick={(e) => handleItemClick(e.target.id)}
                        id={item.label}
                      >
                        <span
                          className={`dropdown-item-dot ${
                            item.id == selectedItem && "selected"
                          }`}
                        ></span>
                        {item.label}
                        <br />
                        {item.topic}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col mb-11 font-EurostileMedium">
              <label className="text-white mb-2">Comment</label>
              <textarea
                id="text-area"
                type="text"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows="8"
                placeholder="Write your comment or question."
                className="bg-black-300 pt-4 pl-4 placeholder-opacity-30 placeholder-white rounded focus:outline-none border border-primary-50 mobile:h-22.75 mobile:pt-1 mobile:pl-1.25"
              />
            </div>
            <button
              type="submit"
              onClick={sendData}
              className="w-45 h-12 market-button z-10 overflow-hidden relative self-center mb-16 border bg-blue-100 border-blue-80 xl:py-2.5 py-1.25 px-17 rounded-full mobile:mb-10"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FaqComponent;
