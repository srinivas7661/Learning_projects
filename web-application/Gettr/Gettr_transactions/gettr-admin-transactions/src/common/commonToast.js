import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../managers/history";

const Toast = {
  notifySuccess,
};

export default Toast;

function homePage() {
  // history.push("/wallet");
  history.push("/wallet/GTR");
  return;
}

function notifySuccess({ message, success }) {
  const options = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    className: "toast-css-failure",
    toastId : 1,
  };
  !success
    ? toast.error(message, {
        ...options,
      })
    : toast(message, {
        ...options,
        icon: () => <img alt="" src="/images/successtick.svg" />,
        onClick: () => homePage(),
        iconOut: true,
        className: "toast-css-success",
      });
}
