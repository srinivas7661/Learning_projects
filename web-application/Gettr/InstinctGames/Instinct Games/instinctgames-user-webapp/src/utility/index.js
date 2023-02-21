import { httpService, httpServiceForFileUpload } from "../utility/httpService";
import { httpConstants } from "../constants";
import { history } from "../managers/history";
import swal from "sweetalert";
import React from "react";
import ToastService from "react-material-toast";
import aws from "aws-sdk";
import { CURRENCIES } from "../constants";
import { SYMBOL } from "../constants";
const moment = require("moment");

const toast = ToastService.new({
  place: "topRight",
  duration: 1,
  maxCount: 2,
});

const utility = {
  getFormattedAddress,
  parseResponse,
  getHeader,
  apiFailureToast,
  apiSuccessToast,
  generateGUID,
  basicAlert,
  validationAlert,
  isNumber,
  navigateToPath,
  toggleDropDown,
  validateName,
  validateEmail,
  isEmpty,
  isMenuActive,
  isPasswordValid,
  showUnderDevelopment,
  epochToDate,
  dateCompare,
  getTimeFromNow,
  epocToPrettyTime,
  getTimeDifference,
  getYearsList,
  sentenceCase,
  generateRandomNumber,
  generateCompanyLogoKey,
  generateRandomAlphaNumericString,
  uploadFileToS3,
  getTokenChoice,
  getTokenIcon,
  getTokenIconBySymbol,
  shortenAddress,
  getNftUrl
  
};
export default utility;

function getNftUrl(metaData) {
  let nftImage = "";
  if(metaData.image)
    nftImage = metaData.image
  else if(metaData.animation_url) {
    nftImage = metaData.animation_url;
  }else{
    return false;
  }
  if (nftImage.includes("ipfs://"))
    nftImage = nftImage.replace("ipfs://", process.env.REACT_APP_HOARDABLE_INFURA_URI);
  return nftImage;
}

function getTokenChoice(tokenName) {
  let tokenChoice = 4;
  if (tokenName === CURRENCIES.BNB) tokenChoice = 1;
  if (tokenName === CURRENCIES.SACREDTALES) tokenChoice = 2;
  else if (tokenName === CURRENCIES.INSTINCTGAMES) tokenChoice = 3;
  return tokenChoice;
}
export const dispatchAction = (type, data) => {
  return (dispatch) => dispatch({ type, data });
};

function parseResponse(promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
}

function getHeader() {
  // return {
  //     'session-token': sessionManager.getDataFromCookies(genericConstants.COOKIES_KEY.SESSION_TOKEN),
  //     'device-id': sessionManager.getDataFromCookies(genericConstants.COOKIES_KEY.DEVICE_ID),
  //     'Content-Type': httpConstants.CONTENT_TYPE.APPLICATION_JSON
  // };
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//TODO: update apiConstant.API_FAILURE
function apiFailureToast(message) {
  toast.error(message ? message : "apiConstant.API_FAILURE");
}

function apiSuccessToast(msg) {
  toast.success(msg ? msg : "apiConstant.API_SUCCESS");
}

function getTokenIcon(currency) {
  if(!currency) return "";
  switch (currency) {
    case CURRENCIES.BNB:
      return "/images/NewBnb.png";
    case CURRENCIES.INSTINCT: 
    case CURRENCIES.INSTINCTGAMES:
      return "/images/instincttglogo.png"
    case CURRENCIES.SACREDTALES:
    case CURRENCIES.SACRED_TAILES:
    case CURRENCIES.SACRED_TAILS:  
      return "/images/sacred-tails.png"
     default:
      return "";

  }
 

}
function getTokenIconBySymbol(symbol) {
  if(!symbol) return "";
  switch (symbol) {
    case SYMBOL.BNB:
      return "/images/binance-icon.svg";
    case SYMBOL.INSTINCT: 
    case SYMBOL.INSTINCTGAMES:
      return "/images/token-instinct.svg"
    case SYMBOL.SACREDTALES:
    case SYMBOL.SACRED_TAILES:
    case SYMBOL.SACRED_TAILS:  
      return "/images/sacred-tails.png"
     default:
      return "";

  }
 

}

function shortenAddress(b, amountL, amountR, stars) {
  return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(b?.length - amountR, b?.length)}`;
}

function generateGUID() {
  const nav = window.navigator;
  const screen = window.screen;
  const guid = nav.mimeTypes.length;
  guid += nav.userAgent.replace(/\D+/g, "");
  guid += nav.plugins.length;
  guid += screen.height || "";
  guid += screen.width || "";
  guid += screen.pixelDepth || "";
  return guid;
}
function generateRandomNumber() {
  return parseInt(10000000 * (Math.random() + parseInt(10 * Math.random())));
}
function basicAlert(message) {
  swal({
    title: message,
    icon: "/images/alert-icon.png",
  });
}

function validationAlert(message, type = "info") {
  swal({
    title: message,
    icon: type,
  });
}

function getTimeDifference(timeStampTo) {
  let minFive = 300000;
  let oneDay = 86400000;
  let difference = "";
  let am = " AM";
  let pm = " PM";
  let hh = epochToDate(timeStampTo, "hh");
  let mm = epochToDate(timeStampTo, "mm");
  let dateFormat = epochToDate(timeStampTo, "DD MMM YYYY");
  let hours = new Date(timeStampTo).getHours();
  let timeDifference = new Date().getTime() - timeStampTo;
  if (timeDifference < oneDay) {
    if (timeDifference < minFive) {
      difference = "Just Now";
    } else {
      if (hours < 12) difference = "Today at " + hh + ":" + mm + am;
      else difference = "Today at " + hh + ":" + mm + pm;
    }
  } else {
    if (hours < 12) difference = dateFormat + ", " + hh + ":" + mm + am;
    else difference = dateFormat + ", " + hh + ":" + mm + pm;
  }
  return difference;
}

function epochToDate(timeStamp, timeFormat) {
  timeStamp = Math.floor(timeStamp); //to convert to integer if seconds is String.
  let dateObject = new Date(timeStamp);
  return moment(dateObject).format(timeFormat); //DD MMM YYYY
}

function getTimeFromNow(timeStamp) {
  return moment(timeStamp, "YYYYMMDD").fromNow();
}

function dateCompare(timeStampFrom, timeStampTo) {
  let diffTime = timeStampFrom * 1000 - timeStampTo;
  let diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays;
}

function navigateToPath(path) {
  history.push(path);
}

function toggleDropDown(dropdownID) {
  // $("#" + dropdownID).toggle("show");
}

function validateName(name) {
  let reg = /[A-Z][a-zA-Z]*/;
  return reg.test(name);
}

function validateEmail(email) {
  let reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

function isPasswordValid(password) {
  let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return reg.test(password);
}

function isEmpty(string) {
  return !string || string.trim().length === 0;
}

function isMenuActive(path) {
  return window.location.pathname.includes(path);
}

function showUnderDevelopment() {
  basicAlert("Under Development");
}

function epocToPrettyTime(seconds) {
  seconds = Math.floor(seconds); //to convert to integer if seconds is String.
  const nowTimeMilliseconds = new Date().getTime();
  const date = new Date(seconds);
  const dateObject = moment(date).format("DD MMMM YYYY");
  //const dateObject = moment(date).format('ddd, MMM DD hh:mm A');
  seconds = Math.floor(nowTimeMilliseconds / 1000 - seconds / 1000);
  let interval = Math.floor(seconds / 172800);
  if (interval >= 1) return dateObject;
  //if (interval >= 1) return dateObject+" "+moment.tz(moment.tz.guess()).format('z');
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return "yesterday";

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    if (interval === 1) return interval + " hr ago";
    return interval + " hrs ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    if (interval === 1) return interval + " minute ago";
    return interval + " minutes ago";
  } else return "Just now";
}

function epocToPrettyTimeForFuture(seconds) {
  seconds = Math.floor(seconds); //to convert to integer if seconds is String.
  var nowTimeMilliseconds = new Date().getTime();
  var date = new Date(seconds);
  var dateObject = moment(date).format("DD MMMM YYYY");
  //var dateObject = moment(date).format('ddd, MMM DD hh:mm A');
  seconds = Math.floor(seconds / 1000 - nowTimeMilliseconds / 1000);
  var interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + " days";

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    if (interval == 1) return interval + " hr";
    return interval + " hrs";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    if (interval == 1) return interval + " minute";
    return interval + " minutes";
  } else return "0 minute";
}
function getYearsList(addedOn = new Date().getTime()) {
  let durationList = [];
  for (
    let i = new Date(addedOn).getFullYear();
    i <= new Date().getFullYear();
    i++
  ) {
    durationList.push(i);
  }
  return durationList;
}

function sentenceCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}
function generateRandomAlphaNumericString(length) {
  var randomAlphaNumericString = "";
  var charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var i = 0; i < length; i++)
    randomAlphaNumericString += charset.charAt(
      Math.floor(Math.random() * charset.length)
    );
  return randomAlphaNumericString;
}
function generateCompanyLogoKey() {
  var currentTimeStamp = new Date().getTime().toString();
  return currentTimeStamp + "_" + generateRandomAlphaNumericString(13);
}

function getFormattedAddress (address){
  if(!address)
    return ""
  return address.substring(0,5) + "..." + address.substring(36,42)
}
function uploadFileToS3(fileObject, fileName, mimeType, isPublic = false) {
  let config = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  };
  aws.config.update(config);

  const S3 = new aws.S3();
  const params = {
    Body: fileObject,
    Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
    ContentType: mimeType,
    Key: fileName,
  };
  if (isPublic) params.ACL = "public-read";

  return new Promise(function (resolve, reject) {
    S3.upload(params, function (err, uploadData) {
      if (err) reject(err);
      resolve(uploadData);
    });
  });
}


