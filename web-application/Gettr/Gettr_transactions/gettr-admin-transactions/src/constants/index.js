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
    GET_PROPOSAL_VOTES : '/votes',
  },
};

export const coinList = ["GTR", "ADR"];

export const reduxType = {
  CREATE_WALLET: "CREATE_WALLET",
  LOADING: "LOADING",
};

export const toastMessages = {

};
export const transactionType = {
  CRYPTO: "CRYPTO",
  FIAT: "FIAT",
};
export const DefaultPublicKey = "0xfDe76269664ae9EAa88f07C54983e83130B0fA7F";
export const StatusConstants = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};
export const stringConstants = {
  INCORRECT_PASSWORD: "Incorrect Password",
  INTRODUCING_GETTR_POPUP_SELECTED:"INTRODUCING_GETTR_POPUP_SELECTED"
};

export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
export const atLeastOneUppercase = /[A-Z]/g;
export const atLeastOneLowercase = /[a-z]/g;
export const atLeastOneNumeric = /[0-9]/g;
export const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
export const twelveCharsOrMore = /.{12,}/g;
export const transactionsList = [
  {
    _id: 1,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 10,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673003399000,
    status: 'APPROVED',
    currency: 'GTR',
  },
  {
    _id: 2,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 30,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673003199000,
    status: 'FAILED',
    currency: 'GTR',
  },
  {
    _id: 3,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 20,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673002799000,
    status: 'APPROVED',
    currency: 'GTR',
  },
  {
    _id: 4,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 23,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673001799000,
    status: 'PENDING',
    currency: 'GTR',
  },
  {
    _id: 5,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 10,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673000799000,
    status: 'APPROVED',
    currency: 'GTR',
  },
  {
    _id: 6,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Reddem',
    amount: 10,
    from:'GETTER_REDM',
    to: '@gettrId1',
    timeStamp: 1673003399000,
    status: 'APPROVED',
    currency: 'GTR',
  },
  {
    _id: 7,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 30,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673003199000,
    status: 'PENDING',
    currency: 'GTR',
  },
  {
    _id: 8,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 20,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673002799000,
    status: 'APPROVED',
    currency: 'GTR',
  },
  {
    _id: 9,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 23,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673001799000,
    status: 'FAILED',
    currency: 'GTR',
  },
  {
    _id: 10,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 10,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673000799000,
    status: 'PENDING',
    currency: 'GTR',
  },
  {
    _id: 11,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 10,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673003399000,
    status: 'APPROVED',
    currency: 'GTR',
  },
  {
    _id: 12,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 30,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673003199000,
    status: 'FAILED',
    currency: 'GTR',
  },
  {
    _id: 13,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 20,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673002799000,
    status: 'APPROVED',
    currency: 'GTR',
  },
  {
    _id: 14,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 23,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673001799000,
    status: 'APPROVED',
    currency: 'GTR',
  },
  {
    _id: 15,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 10,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1673000799000,
    status: 'FAILED',
    currency: 'GTR',
  },
  {
    _id: 16,
    transactionId: "0xb84915ce430b0e93f3d48159",
    type: 'Send',
    amount: 10,
    from:'@gettrId2',
    to: '@gettrId1',
    timeStamp: 1672999799000,
    status: 'APPROVED',
    currency: 'GTR',
  },
];
