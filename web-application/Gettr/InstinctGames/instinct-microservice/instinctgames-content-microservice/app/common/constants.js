export const httpConstants = {
  METHOD_TYPE: {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
  },
  HEADER_TYPE: {
    URL_ENCODED: "application/x-www-form-urlencoded",
    APPLICATION_JSON: "application/json",
  },
  HEADER_KEYS: {
    DEVICE_TYPE: "device-type",
    DEVICE_ID: "device-id",
    SESSION_TOKEN: "session-token",
    PUSH_TOKEN: "push-token",
  },
  DEVICE_TYPE: {
    ANDROID: "android",
    IOS: "ios",
    WEB: "web",
  },
  CONTENT_TYPE: {
    URL_ENCODE: "application/x-www-form-urlencoded",
  },
  WEBSERVICE_PATH: {
    SYNC_ATTENDANCE: "sync-attendance/",
  },

  RESPONSE_STATUS: {
    SUCCESS: true,
    FAILURE: false,
  },
  RESPONSE_CODES: {
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    OK: 200,
    NO_CONTENT_FOUND: 204,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    TOO_MANY_REQUEST: 429,
  },
  LOG_LEVEL_TYPE: {
    INFO: "info",
    ERROR: "error",
    WARN: "warn",
    VERBOSE: "verbose",
    DEBUG: "debug",
    SILLY: "silly",
    FUNCTIONAL: "functional",
    HTTP_REQUEST: "http request",
  },
};

export const stringConstants = {
  SERVICE_STATUS_HTML: "Content Microservice is Working",
};

export const genericConstants = {
  DEVICE_TYPE: {},
};

export const apiSuccessMessage = {
  FETCH_NFT: "Nft fetched successfully",
  FETCH_SUCCESS: "Information fetched successfully",
  ADD_CONTENT_SUCCESS: "Content added successfully",
  ADD_REPORTED_SUCCESS: "NFT reported successfully",
  PURCHASED_SUCCESSFULLY: "nft purchased successfully",
  GET_OPEN_FOR_SALE_SUCCESSFULLY: "Your NFT is on sale",
  UPDATED_CONTENT_SUCCESS: "Content updated successfully",
  GET_ON_SALE_SUCCESSFULLY: "OnSale NFT get successfully",
  GET_OWNER_SUCCESSFULLY: "Get owner successfully",
  FETCH_REPORTED_NFT: "Reported Nft fetched successfully",
  FETCH_REMOVED_NFT_LIST: "Removed Nft list fetched successfully",
  FETCH_BLOCKED_USER_LIST: "blocked user list fetched successfully",
  DELETE_REPORTED_NFT: "Reported Nft deleted successfully",
  DELETE_NFT: "Nft deleted successfully",
  LIKE_ADDED: "Like added successfully",
  GET_FAVOURITE_NFT_LIST: "Favourite list fetched successfully",
  UN_DELETE_NFT: "Nft unRemoved successfully",
  RECENTLY_SOLD_NFT_DATA_SUCCESS: "Sold nft fetch successfully",
  CREATED_NFT: "created nft fetch successfully",
  NFT_REMOVE_FROM_SALE: "nft removed from sale successfully",
  NOTIFY_SUCCESS: "Message sent Succesfully",
  ADD_TOKEN_REQUEST_SUCCESS: "Succesfully sent request",
  NFT_HIDE: "nft hide suuccessfully",
};

export const apiEndpoints = {
  GET_METERS: "/get-meters",
  ADD_TRANSACTION: "/add-transaction",
  GET_NFTS: "/get-nfts",
  GET_NFT: "/get-nft",
  GET_TRANSACTION: "/transaction-list/for-recentlySoldNft",
  ADD_CONTENT: "/add-content",
  OPEN_FOR_SALE: "/open-for-sale",
  LIKE_NFT: "/like-nft",
  ADD_VIEW: "/add-view",
  BUY_NFT: "/buy-nft",
  TRENDING_NFT: "/trending-nft",
  GET_ON_SALE: "/get-on-sale",
  GET_OWNER: "/get-owner",
  REPORTED_NFT_LIST: "/reported-nft-list",
  REPORTED_NFT_LIST_BYID: "/reported-nft-list_byid",
  REMOVE_NFT_LIST_BYID: "/remove-nft-list_byid",
  BLOCKED_USER_LIST: "/blocked-user-list",
  REMOVED_NFT_LIST: "/removed-nft-list",
  REMOVE_FROM_SALE: "/remove-from-sale",
  ADD_FILE_IPFS: "/add-file-ipfs",
  ADD_TOKEN: "/add-token",
  REMOVE_BLOCK_USER: "/nft/remove/blockuser",
  UNREMOVE_NFT: "/nft",
  DELETE_REPORTED_NFT_BY_ID: "/delete-report-nft/:id",
  ADD_REPORT_NFT: "/add-report-nft",
  GET_CREATED_NFT: "/get-created-nft",
  GET_REMOVED_NFT: "/get-removed-nft",
  GET_FAVOURITE_NFT: "/get-favourite-nfts",
  TOP_NFT_OPEN_FOR_SALE: "/top-nfts-open-for-sales",
  RECENTLY_SOLD_NFT: "/recently-sold-nft",
  NFTS_OF_COLLECTION: "/nfts-of-collection",
  TOP_NFT: "/top-nft",
  NOTIFY: "/notify",
  NOTIFY_HELP_CENTER: "/notify-help-center",
  NOTIFY_SUGGESTIONS: "/notify-suggestions",
  ADD_TOKEN_REQUEST: "/add-token-request",
  GET_NFT_LIST: "/get-nft-list",
  DELETE_NFT: "/nft/delete",
  FLOOR_PRICE: "/floor-price",
  GET_COUNT: "/get-count",
  UPDATE_CONTENT: "/update-content",
  HIDE_NFT: "/hide-nft",
  GET_HIDDEN_NFT: "/get-hidden-nft",
};

export const apiFailureMessage = {
  INVALID_PARAMS: "Invalid Parameters",
  INVALID_PARAMS_LOOK_UP: "Invalid Parameters for lookup query",
  INVALID_PARAMS_UNWIND: "Invalid Parameters for unwind query",
  CONTENT_ALREADY_EXISTS: "content already exists",
  INVALID_REQUEST: "Invalid Request",
  INVALID_SESSION_TOKEN: "Invalid session token",
  INTERNAL_SERVER_ERROR: "Internal server Error",
  BAD_REQUEST: "Bad Request!",
  DEVICE_ID_OR_SESSION_TOKEN_EMPTY:
    "Device id or session token can't be empty or null",
  SESSION_GENERATION: "Unable to generate session!",
  SESSION_EXPIRED: "Session Expired!",
  DATA_EXIST: "Data already exist",
  NO_SUCH_CONTENT_EXISTS: "No such content exists",
  CONTENT_IS_NOT_FOR_SALE: "Content is not for sale",
  CONTENT_IS_ALREADY_SOLD: "Content is already sold",
  UNABLE_TO_UPDATE: "Unable to update",
  UNABLE_TO_UPDATE_USER: "Unable to update User",
  UNABLE_TO_FIND_CONTENT: "Unable to get content information",
  CONTENT_NOT_AVAILBLE: "Content with provided not available",
  USER_NOT_FOUND: "User not found",
  RECORD_NOT_FOUND: "No Record found",
  ALREADY_LIKED: "You already liked this nft",
  ALREADY_VIEWED: "You already Viewed this nft",
  UNABLE_ADD_LIKE: "Unable to add like",
  UNABLE_ADD_CONTENT_HISTORY: "Unable to add history Record",
  TOKEN_EXISTS: "Tokens already Exists",
  NFT_ALREADY_REPORTED: "NFT already reported",
  HIDDEN_NFT: "Cannot update as nft is hidden",
};

export const urlConstants = {
  TRANSACTION_DETAILS:
    "http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com/transaction-details/",
};

export const events = {
  POSTED_BY: "instinct-games",
  SEND_NOTIFICATION: "Send Notification",
  TEST_EVENT: "Test Event",
  REPORT_NFT: "report nft",
  TOKEN_REQUEST: "add-token-request",
  CONTENT_TITLE: "Content Report",
  TOKEN_REQUEST_TITLE: "Token Request",
  CONTENT_DESCRIPTION: "A nft has been reported",
  TOKEN_REQUEST_DESCRIPTION: "New Token has been requested",
};

export const notificationType = {
  BELL: "bell-icon",
  REPORT_TITLE: "report-nft",
  REQUEST_TOKEN: "add-token-request",
  USER_ID: "admin",
};

export const amqpConstants = {
  queueType: {
    PUBLISHER_SUBSCRIBER_QUEUE: "publisher_subscriber_queue",
  },
  exchangeType: {
    FANOUT: "fanout",
    TOPIC: "topic",
  },
};
