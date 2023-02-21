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
    PROPOSALS: "/proposals",
    GET_PROPOSAL_VOTES: "/votes",
    ADMINS: "/admins",
    ADMIN_INFO: "/admin-info",
    ADD_ADMIN: "/admin-user",
    BALANCE: "/balance",
  },
};

export const coinList = ["GTR", "ADR"];

export const reduxType = {
  CREATE_WALLET: "CREATE_WALLET",
  LOADING: "LOADING",
};

export const toastMessages = {};

export const userConstants = {
  USER_DETAILS: "details",
  USER_ROLE: "user_role",
  USER_EMAIL: "user_email",
  SUPER_ADMIN: {
    name: "-SUPERADMINS-",
    value: "SUPER_ADMIN"
  },
  ADMIN: {
    name: "-ADMINS-",
    value: "ADMIN"
  },
};

export const userRoles= {
  SUPER_ADMIN: {
    name: "Super Admin",
    value: "SUPER_ADMIN"
  },
  ADMIN: {
    name: "Admin",
    value: "ADMIN"
  },
};

export const proposalTypes= {
  REMOVE_SUPER_ADMIN:{
    name: "",
    value: "REMOVE_SUPER_ADMIN"
  },
  REMOVE_SUB_ADMIN:{
    name: "",
    value: "REMOVE_SUB_ADMIN"
  },
  ADD_SUPER_ADMIN:{
    name: "Super Admin",
    value: "ADD_SUPER_ADMIN"
  },
  ADD_SUB_ADMIN:{
    name: "Sub Admin",
    value: "ADD_SUB_ADMIN"
  },
  AIRDROP:{
    name: "",
    value: "AIRDROP"
  },
  MINT:{
    name: "",
    value: "MINT"
  },
  UNFREEZE:{
    name: "",
    value: "UNFREEZE"
  },
};

export const status = {
  PASSED: {
    name: 'PASSED',
    value: 'Passed'
  },
  FAILED: {
    name: 'FAILED',
    value: 'Failed'
  },
  PENDING: {
    name: 'PENDING',
    value: 'Pending'
  },
};

export const proposalListStatus = {
  PASSED: {
    name: 'PASSED',
    value: 'Executed'
  },
  FAILED: {
    name: 'FAILED',
    value: 'Canceled'
  },
  PENDING: {
    name: 'PENDING',
    value: 'Pending for vote'
  },
};

export const votesStatus = {
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
}

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
  INTRODUCING_GETTR_POPUP_SELECTED: "INTRODUCING_GETTR_POPUP_SELECTED",
};

export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
export const atLeastOneUppercase = /[A-Z]/g;
export const atLeastOneLowercase = /[a-z]/g;
export const atLeastOneNumeric = /[0-9]/g;
export const atLeastOneSpecialChar = /[#?!@$%^&*-]/g;
export const twelveCharsOrMore = /.{12,}/g;
