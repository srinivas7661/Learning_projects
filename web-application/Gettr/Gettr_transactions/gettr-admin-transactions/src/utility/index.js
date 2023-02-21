import moment from "moment";
import cryptoJS from "crypto-js";

const utility = {
  generateGUID,
  epochToDate,
  dateCompare,
  epocToPrettyTime,
  getTimeDifference,
  copyToClipBoard,
  encryptData,
  decryptData,
  getGettrId,
  parseResponse,
  filterTimeStamp,
  checkNumberInput,
  shortenAddress,
  isMenuActive
};
export default utility;

export const dispatchAction = (type, data) => {
  return (dispatch) => dispatch({ type, data });
};

function getGettrId() {
  const localId = localStorage.getItem("id")
    ? localStorage.getItem("id")
    : "gettrId2";
  const id =
    window.location.search.split("?").length > 1 &&
    window.location.search.split("?")[1].split("=").length > 1 &&
    window.location.search.split("?")[1].split("=")[0] === "userId"
      ? window.location.search.split("?")[1].split("=")[1].trim()
      : localId
      ? localId
      : "gettrId2";
  localStorage.setItem("id", id);
  return id;
}
function parseResponse(promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
}

function isMenuActive(path) {
  // console.log(window.location.pathname, path);
  return window.location.pathname.includes(path);
}

function copyToClipBoard(elementId, select = false, type = "input") {
  const copyText = document.getElementById(elementId);
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(
      type === "input" ? copyText.value : copyText.innerHTML
    );
  } else {
    unsecuredCopyToClipboard(
      type === "input" ? copyText.value : copyText.innerHTML
    );
  }
}

function unsecuredCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
}

function generateGUID() {
  const nav = window.navigator;
  const screen = window.screen;
  let guid = nav.mimeTypes.length;
  guid += nav.userAgent.replace(/\D+/g, "");
  guid += nav.plugins.length;
  guid += screen.height || "";
  guid += screen.width || "";
  guid += screen.pixelDepth || "";
  return guid;
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

function dateCompare(timeStampFrom, timeStampTo) {
  let diffTime = timeStampFrom * 1000 - timeStampTo;
  let diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays;
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

function encryptData(data, secretKey) {
  return cryptoJS.AES.encrypt(JSON.stringify(data), secretKey);
}

function decryptData(cipher, secretKey) {
  const decryptByte = cryptoJS.AES.decrypt(cipher.toString(), secretKey);
  return decryptByte.toString(cryptoJS.enc.Utf8);
}

function filterTimeStamp(data) {
  let startTime;
  const { today, week, days30, months3 } = data;
  if (today) startTime = moment().startOf("d").valueOf();
  else if (week) startTime = moment().subtract(7, "d").startOf("d").valueOf();
  else if (days30) startTime = moment().subtract(1, "M").startOf("d").valueOf();
  else if (months3)
    startTime = moment().subtract(3, "M").startOf("d").valueOf();
  return startTime;
}

function checkNumberInput(e) {
  let invalidChars = ["-", "+", "e", "E"];
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
}

function shortenAddress(b, amountL, amountR, stars) {
  return `${b?.slice(0, amountL)}${".".repeat(stars)}${b?.slice(
    b?.length - amountR,

    b?.length
  )}`;
}
