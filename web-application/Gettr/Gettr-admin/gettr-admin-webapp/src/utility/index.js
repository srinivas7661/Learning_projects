import { history } from "../managers/history";
import swal from "sweetalert";
import ToastService from "react-material-toast";
import { useEffect, useState } from "react";

const moment = require("moment");

const toast = ToastService.new({
  place: "topRight",
  duration: 1,
  maxCount: 2,
});

const utility = {
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
  isEmpty,
  isMenuActive,
  showUnderDevelopment,
  epochToDate,
  dateCompare,
  getTimeFromNow,
  epocToPrettyTime,
  getTimeDifference,
  filterTimeStamp,
  getCurrentSlot,
  parseResponse,
  shortenString,
  DataFormater,
  getTimeStamp
};
export default utility;

export const dispatchAction = (type, data) => {
  return (dispatch) => dispatch({ type, data });
};

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

function parseResponse(promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
}

//TODO: update apiConstant.API_FAILURE
function apiFailureToast(message) {
  toast.error(message ? message : "apiConstant.API_FAILURE");
}

function apiSuccessToast(msg) {
  toast.success(msg ? msg : "apiConstant.API_SUCCESS");
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
function filterTimeStamp(data) {
  let startTime;
  if (data["1D"]) startTime = moment().startOf("d").valueOf();
  else if (data["7D"])
    startTime = moment().subtract(7, "d").startOf("d").valueOf();
  else if (data["1M"])
    startTime = moment().subtract(1, "M").startOf("d").valueOf();
    else if (data["3M"])
    startTime = moment().subtract(3, "M").startOf("d").valueOf();
  else if (data["1Y"] ||data["All"])
    startTime = moment().subtract(1, "Y").startOf("d").valueOf();
    else if (data["YTD"])
    startTime = moment().startOf("year").valueOf();
  return startTime;
}
function getCurrentSlot() {
  const currentTime = moment().startOf("hour");
  const hour = Number(currentTime.format("h"));
  const startSlot =
    hour % 2 ? moment(currentTime.valueOf()).subtract(1, "hour") : currentTime;
  return {
    slot: `${startSlot.format("h A")} - ${moment(startSlot)
      .add(2, "hour")
      .format("h A")}`,
    starTime: startSlot.valueOf(),
    endTime: moment(startSlot).add(2, "hour").valueOf(),
  };
}

function shortenString(string, maxLength) {
  const charsToKeep = Math.floor((maxLength - 3) / 2);
  return string.length > maxLength
    ? string.substring(0, charsToKeep) +
        "..." +
        string.substring(string.length - charsToKeep)
    : string;
}

export const useDebounce = (value, delay) => {
  const [debounceVal, setDebounce] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceVal;
};
function DataFormater(number) {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + "B";
  } else if (number > 1000000) {
    return (number / 1000000).toString() + "M";
  } else if (number >= 1000) {
    return (number / 1000).toString() + "K";
  } else {
    return number.toString();
  }
}

function getTimeStamp(timeRange) {
  const timeStamps = { startTime: "", endTime: moment().endOf("d").valueOf() };

  switch (timeRange) {
    case "D1":
      timeStamps.startTime = moment().startOf("d").valueOf();
      break;
    case "D7":
      timeStamps.startTime = moment().subtract(1, "w").startOf("d").valueOf();
      break;
    case "M1":
      timeStamps.startTime = moment().subtract(1, "M").startOf("d").valueOf();
      break;
    case "M3":
      timeStamps.startTime = moment().subtract(3, "M").startOf("d").valueOf();
      break;
    case "Y1":
      timeStamps.startTime = moment().subtract(1, "y").startOf("d").valueOf();
      break;
    case "YTD":
      timeStamps.startTime = moment().startOf("y").valueOf();
      break;
    case "All":
      timeStamps.startTime = moment().startOf("y").valueOf();
      timeStamps.type = "ALL";
      break;
    default:
      timeStamps.startTime = moment().startOf("d").valueOf();
      break;
  }

  return timeStamps;
}
