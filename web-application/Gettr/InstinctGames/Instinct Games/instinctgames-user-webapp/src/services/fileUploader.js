import {httpService, httpServiceForFileUpload} from "../utility/httpService";
import {httpConstants} from "../constants";
import axios from "axios";

export async function fileUpload(requestData) {
  let url = "https://js0yxvv538.execute-api.us-east-2.amazonaws.com/prod/fileuploader/upload-file";
  const config = {
      headers: {
          "content-type": "multipart/form-data",
          "x-api-key": process.env.REACT_APP_X_API_KEY,
      },
  };
 return axios
      .post(url, requestData, config)
      .then((data) => {
          if (!data || !data.data || !data.data.responseData || !data.data.success) {
              return
          }
          // this.returnResponseToParentComponent(data.data)
          return data.data.responseData;
      })
      .catch((err) => {
          // Utils.apiFailureToast(err && err.message || "Unable to upload selected file")
          console.log(err);
      });
};

