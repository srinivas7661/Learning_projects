/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */

export const CardList = [
  {
    name: "amazon",
    type: "Gift Card",
    picture: "/images/amazon.svg",
    isActive: false,
    backgroundColor: "#FFE4BD",
    textColor: "#000000",
  },
  {
    name: "addidas",
    type: "Gift Card",
    picture: "/images/addidas.svg",
    isActive: false,
    backgroundColor: " #000000",
    textColor: "#FFFFFF",
  },
  {
    name: "puma",
    type: "Gift Card",
    picture: "/images/puma.svg",
    isActive: true,
    backgroundColor: "#03BD64",
    textColor: "#000000",
  },
  {
    name: "adidas",
    type: "Gift Card",
    picture: "/images/adidas.svg",
    isActive: true,
    backgroundColor: "#E8E8E8",
    textColor: "#BABABA",
  },
  {
    name: "unicef",
    type: "Donate",
    picture: "/images/unicef.svg",
    isActive: true,
    backgroundColor: "#E8E8E8",
    textColor: "#BABABA",
  },
];

export const TopEarnerList = [
  {
    name: "From Chicago",
    entries: "225",
    picture: "/images/dummyUser.svg",
    amount: "400",
  },
  {
    name: "Sam Doe",
    entries: "258",
    picture: "/images/dummyUser-2.svg",
    amount: "380",
  },
  {
    name: "Ben Joseph",
    entries: "225",
    picture: "/images/dummyUser.svg",
    amount: "400",
  },
  {
    name: "Lisa Rose",
    entries: "115",
    picture: "/images/dummyUser-2.svg",
    amount: "330",
  },
  {
    name: "Alex Hales",
    entries: "225",
    picture: "/images/dummyUser.svg",
    amount: "400",
  },
];

export const httpConstants = {
  METHOD_TYPE: {
    POST: "POST",
    PUT: "PUT",
    GET: "GET",
    DELETE: "DELETE",
  },
  CONTENT_TYPE: {
    APPLICATION_JSON: "application/json",
    MULTIPART_FORM_DATA: "multipart/form-data",
    APPLICATION_FORM_URLENCODED: "application/x-www-form-urlencoded",
    IMAGE_PNG: "image/png",
  },
  DEVICE_TYPE: {
    WEB: "web",
  },
  API_END_POINT: {
    GET_DAILY_REWARDS: "/daily-rewards",
    WINNERS: "/winners",
    REDEEMABLE: "/redeemable",
    GET_HIGHEST_REWARD_WINNER: "/highest-reward-winner",
    GET_TOP_PERFORMERS: "/top-performers",
    GET_SLOT_ANALYTICS: "/slot-analytics",
    USER_REWARDS: "/user-rewards",
    TOTAL_ENTRIES: "/total-entries",
    TOTAL_PARTICIPANTS: "/task-participations",
  },
};
