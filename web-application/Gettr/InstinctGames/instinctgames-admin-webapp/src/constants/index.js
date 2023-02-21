/**
 * Created by Ayush Kulshrestha on 18/09/2019.
 */

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
    GET_COLLECTION: "get-collection",
    TOTAL_SALES: "getTotalNoSales",
    TOTAL_USERS: "get-total-users",
    NFT_SOLD_GRAPH: "nft-sold-graph",
    GET_APPROVE_TOKEN: "/get-approved-token",
    TOP_COLLECTION_DATA: "top-collections-for-analytics",
    TOP_NFTS_DATA: "top-nft-for-analytics",
    TRANSACTION_DETAILS: "/notify",
    GET_REQUESTED_TOKENS: "/get-requested-tokens",
    PRICE_CONVERSION: "price-conversion",
    UN_REMOVE_NFT: "nft",
    GET_REMOVED_NFT_LIST: "removed-nft-list",
    GET_BLOCKED_USER_LIST: "get-blocked-users",
    GET_NFT_DETAILS: "get-nft",
    REPORTED_NFT_DETAILS_LIST: "reported-nft-list_byid",
    REMOVED_NFT_DETAILS_LIST: "remove-nft-list_byid",
    DELETE_REPORTED_NFT: "delete-report-nft/",
    REMOVE_NFT: "nft/remove/blockuser",
    DELETE_NFT: "nft/delete",
  },
};

export const genericConstants = {
  ACTIVE_MENU: {
    DASHBOARD: "/dashboard",
    NOTIFICATIONS:"/dashboard/notifications",
    MANAGE_STORE: "/dashboard/manage-store",
    COLLECTION: "/dashboard/manage-store/collection",
    CATEGORIES: "/dashboard/manage-store/categories",
    ANALYTICS: "/dashboard/analytics",
    MANAGE_CONTENT: "/dashboard/manage-content",
    REPORTED_NFT: "/dashboard/manage-content/reported-nft",
    REMOVED_NFT: "/dashboard/manage-content/removed-nft",
    BLOCKED_USER: "/dashboard/manage-content/blocked-user",
    SUB_ADMINS: "/dashboard/sub-admins",
    TOKENS_LISTING: "/dashboard/tokens-list",
    LISTED_TOKENS: "/dashboard/tokens-list/listed-tokens",
    REQUESTED_TOKENS: "/dashboard/tokens-list/requested-tokens",
    REJECTED_TOKENS: "/dashboard/tokens-list/rejected-tokens",
    TOKEN_DETAILS: "/dashboard/tokens-list/token-details/:id",
    REQUESTED_DETAILS: "/dashboard/tokens-list/requested-details",
    // REVIEW_NFT:"/dashboard/manage-content/reported-nft/review-nft"
  },
};
export const apiFailureConstants = {
  GET_REPORTED_NFT_LIST: "Unable to fetch reported NFT List!",
  GET_BLOCKED_USER_LIST: "Unable to fetch blocked user List!",
  REMOVE_NFT: "Unable to remove NFT!",
  REMOVE_NFT_REPORT: "Unable to delete NFT Report!",
  UN_BLOCK_USER: "Unable to unblock user!",
  UN_REMOVE_NFT: "Unable to un remove NFT!",
  GET_COLLECTION_LIST: "Unable to fetch Collection List",
  SOMETHING_WENT_WRONG: "Something went wrong",
  WRONG_CONTRACT_ADDRESS: "Invalid Contract Address",
  INSTALL_METAMASK: "Please install metamask",
};
export const apiSuccessConstants = {
  REMOVE_NFT: "NFT has been removed successfully.",
  UN_BLOCK_USER: "user has been unblock successfully.",
  REMOVE_NFT_REPORT: "NFT report has been deleted successfully.",
  UN_REMOVE_NFT_AND_UN_BLOCK_USER:
    "NFT is un-removed and user also unblocked successfully..",
  REMOVE_NFT_AND_BLOCK_USER:
    "NFT is Removed and user also blocked successfully.",
  MAIL_SENT: "Mail Sent Succesfully",
  TOASTS_POSITION: "top-center",
};

export const eventConstants = {
  SHOW_LOADER: "SHOW_LOADER",
  HIDE_LOADER: "HIDE_LOADER",
  LOGIN_ERROR: "Wrong email or password",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  CONNECTED_METAMASK: " CONNECTED_METAMASK",
  METAMASK_DISCONNECTED: " METAMASK_DISCONNECTED",
  BNB_USD_CONVERSION: "BNB_TO_USD",
  SACRED_USD_CONVERSION: "SACRED_TO_USD",
  INSTINCT_USD_CONVERSION: "INSTINCT_TO_USD",
};

export const cookiesConstants = {
  DEVICE_ID: "deviceId",
  USER_META_DATA: "userMetaData",
  ACCESS_TOKEN: "accessToken",
  ID_TOKEN: "idToken",
  EXPIRES_AT: "expiresAt",
  USER: "user",
  USER_ADDRESS: "USER_ADDRESS",
  PERMISSION: "permission",
  BNB_TO_USD: "bnb",
  SACRED_TO_USD: "sacred",
  INSTINCT_TO_USD: "instinct",
};

export const adminPermissionConstants = {
  STORE_FRONT: "manage:storefront",
  ANALYTICS: "manage:analytics",
  CONTENT: "manage:content",
  SUB_ADMINS: "manage:sub_admins",
  TOKENS: "manage:token",
};
export const adminRoleConstants = {
  content_admin: "content_admin",
  storefront_admin: "storefront_admin",
  sub_admin: "sub_admin",
  superAdmin: "superAdmin",
  token_admin: "token_admin",
};

export const adminRoleIdsConstants = {
  content_admin: "rol_74aFXA8zMZsII1v2",
  storefront_admin: "rol_2k2Q1vL5BEZkWg51",
  sub_admin: "rol_UJfQNfSUPSLfHyym",
  superAdmin: "rol_YUjLjzseYgOeVGXQ",
  token_admin: "rol_25P4f5JpbjmpuITt",
};

export const credsConstants = {
  SENDER_EMAIL_ADDRESS: "mayurw@leewayhertz.com",
  RECIEVER_EMAIL_ADDRESS: "mayurw@leewayhertz.com",
  VERIFY_SUBJECT: "Verification",
  TEXT_TYPE: "email",
  KEY_PASS: "data",
  CURRENCY_TYPE_BNB: "BNB",
  NEW_TOKEN_REQUEST: "New Token has been requested",
  NFT_HAS_REPORTED: "A nft has been reported",
};

export const adminRoleIdListConstants = [
  "rol_74aFXA8zMZsII1v2",
  "rol_2k2Q1vL5BEZkWg51",
  "rol_UJfQNfSUPSLfHyym",
  "rol_YUjLjzseYgOeVGXQ",
  "rol_25P4f5JpbjmpuITt",
];
export const validationsMessages = {
  IS_TEXT_COPIED: "Link has been copied",
  TOASTS_POSITION: "top-center",
  IMAGE_NOT_VALID: "Please Insert PNG, SVG, JPG, JPEG IMAGE",
  ADDED_SUCCESSFULLY: "Added Successfully",
  REMOVED_SUCCESSFULLY: "Removed Successfully",
  UNABLE_REMOVE: "Unable to Remove",
  AUTH_ERROR: "Wrong Email or Password",
  EMAIL_ALREADY_EXIST: "Email already exist",
  MAIL_NOT_SENT: "Mail not sent",
  UNABLE_UPDATE: "Unable to update",
  UPDATED_SUCCESSFULLY: "Updated Successfully",
  PERMISSION_ACCESS: "You do not have any permission to access this portal",
  RESET_MAIL: "Reset Mail has been sent to you",
  WALLET_NOT_CONNECT: "Wallet is not connected",
  METAMASK_NOT_CONNECT: "Please connect metamask",
  COLLECTION_CREATION_FAILURE: "Collection creation failed",
  IMAGE_SIZE: "Size not greater than 5mb",
  WARN_SIZE:"Size should be less than 5MB",
  GET_REPORTED_NFT_LIST: "Unable to fetch reported NFT List!",
  GET_BLOCKED_USER_LIST: "Unable to fetch blocked user List!",
  UN_BLOCK_USER: "Unable to unblock user!",
  UN_BLOCKED_USER: "user has been unblock successfully",
  PASSWORD_ERROR: "Password not Changed",
  PASSWORD_SUCCESSFULLY: "Password changed successfully",
  UN_REMOVE_NFT: "Unable to remove NFT!",
  REMOVE_NFT_AND_BLOCK_USER:
    "NFT is removed and user also blocked successfully.",
  REMOVE_NFT: "NFT has been removed successfully.",
  UN_REMOVE_NFT_REPORT: "Unable to delete NFT report!",
  REMOVE_NFT_REPORT: "NFT report has been deleted successfully",
  UN_GET_COLLECTION_LIST: "Unable to fetch collection list",
  UN_GET_REMOVED_NFT_LIST: "Unable to fetch removed list",
  TRANSACTION_FAILED: "Transaction failed",
  INCORRECT_OLD_PASSWORD: "Old password Is incorrect",
  PASSWORD_REGEX_ERROR:
    "Password must be 8 characters long and Should have at least one special character.",
  SIMILAR_PASSWORD_ERROR: "Confirm password should be similar to new password.",
  ENTER_PASSWORD_ERROR: "Enter the password",
  ENTER_EMAIL_ERROR: "Enter the email",
  VALIDATE_PASSWORD_ERROR: "Password entered is incorrect, please check your password",
  VALIDATE_EMAIL_ERROR: "Enter the valid email",
  EMAIL_NOT_VALID: "Enter the vaild email",
  BLOCKCHAIN_ERROR: "Got error in blockchain",
  INSTALL_METAMASK: "Please install metamask",
  CANNOT_CREATE_COLLECTION_NOT_OWNER:
    "Cannot create collection as you are not owner",
  CANNOT_UPDATE_COLLECTION_NOT_OWNER:
    "Cannot update collection as you are not owner",
};
export const selectionStrings = {
  POSTED_BY: "postedBy",
  DESCRIPTION: "description",
  PAYLOAD: "payload",
  ADDED_ON: "addedOn",
  TITLE: "title",
  USER_ID: "admin",
};

export const stringConstants = {
  RECENTLY_ADDED: "Recently Added",
  RECENTLY_UPDATED: "Recently Updated",
  LOW_TO_HIGH: "Low to High",
  HIGH_TO_LOW: "High to Low",
  NO_COLLECTION_FOUND: "No collection found",
};

export const currencyTypes = {
  BNB: "BNB",
  SACREDTALES: "SACREDTALES",
  INSTINCTGAMES: "INSTINCTGAMES",
  OTHER: "OTHER",
  INSTINCT: "INSTINCT",
};
