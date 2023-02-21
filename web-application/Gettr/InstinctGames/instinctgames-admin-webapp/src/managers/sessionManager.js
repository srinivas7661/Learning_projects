/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const sessionManager = {
  setDataInCookies,
  getDataFromCookies,
  removeDataFromCookies,
  setDataInSessionStorage,
  getDataFromSessionStorage,
};

function setDataInSessionStorage(data, key) {
  sessionStorage.setItem(key, JSON.stringify(data), { path: "/" });
}

function setDataInCookies(data, key) {
  cookies.set(key, JSON.stringify(data), { path: "/" });
}
function getDataFromSessionStorage(key) {
  let data = sessionStorage.getItem(key);
  try {
    return data ? (typeof data === "string" ? JSON.parse(data) : data) : false;
  } catch (e) {
    console.log("error while parsing data from session");
  }
}
function getDataFromCookies(key) {
  return cookies.get(key);
}

function removeDataFromCookies(key) {
  cookies.remove(key, { path: "/" });
}
