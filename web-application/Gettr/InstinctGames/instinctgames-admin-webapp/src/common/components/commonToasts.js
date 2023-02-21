import React from "react";
import "react-s-alert/dist/s-alert-default.css";
import toast, { Toaster } from "react-hot-toast";
import { validationsMessages } from "../../constants";

const commonToasts = {
  successfullySent,
  failureMessageSent,
};
export default commonToasts;

function successfullySent(data) {
  toast.success(data, {
    duration: 2000,
    position: validationsMessages.TOASTS_POSITION,
    className: "toast-div-address",
  });
}

function failureMessageSent(data) {
  toast.error(data, {
    id: "unique",
    duration: 3000,
    position: validationsMessages.TOASTS_POSITION,
    className: "toast-div-address",
  });
}
