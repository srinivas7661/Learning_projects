import { v4 as uuid } from "uuid";

export const settingsTab = ["Profile", "Notifications"]

export const collectionsTab = ["Trending", "Action", "Adventure", "RPG", "CCG"];
export const detailsTab = [
    { name: "Collected", imageUrl: "/images/collectedIcon.png" },
    { name: "Activity", imageUrl: "/images/activityIcon.png" },
];
export const profileTab = ["Profile", "Activity"];

export const itemsCart = ["Single Items", "Multiple Items"];
export const receivedCart = [
    "Recently Received",
    "Recently Viewed",
    "Recently Send",
];

export const faqData = [
    {
        id: uuid(),
        view: false,
        question: "What is floor price?",
        answer:
            "The floor price is the lowest price for NFT’s in a specific collection and is adjusted in real-time.",
    },
    {
        id: uuid(),
        view: false,
        question: "What network is Hoardable on?",
        answer: "Hoardable has initially launched on Binance Smart Chain (BSC).",
    },
    {
        id: uuid(),
        view: false,
        question: "Will Hoardable have cross-chain compatibility?",
        answer: "Yes, Hoardable will support Ethereum and Solana soon.",
    },
    {
        id: uuid(),
        view: false,
        question:
            "What makes Hoardable different to the other marketplaces currently available?",
        answer:
            "At Hoardable we strive to create an environment where projects can be created, grow, and thrive. Giving developers the tools, they need to accept their token directly for NFT offerings.",
    },
    {
        id: uuid(),
        view: false,
        question: "What can we expect from Hoardable in the coming months?",
        answer:
            "We are always busy working on the next way to innovate and grow our platform. We intend to have a fully functioning launch pad for new vetted gaming project incubation. A fully functional DEX to allow for fast swaps between any of the supported tokens on Hoardable. Live trade windows! Tired of having to liquidate assets for cheap? Miss the Haggle? Not for much longer, we are working to enable an interface where you can offer not just currency for NFT’s but also other NFT’s from your own collection as part of a deal! All this and much more to come!",
    },
    {
        id: uuid(),
        view: false,
        question: "What is the “Hidden Section” on my profile?",
        answer:
            "Due to the nature of transactions on the blockchain, anyone can send and receive tokens to wallet addresses.This is a normal process for some projects who may airdrop their current holders with further tokens however it is not always used in this way and can lead to unwanted NFTs on a user’s profile. Therefore, we have implemented a filter system to profiles to allow users to hide unwanted NFT’s in the “Hidden” tab.",
    },
    {
        id: uuid(),
        view: false,
        question: "Will you be upgrading features?",
        answer:
            "Yes, we expect to roll out updates on a regular update. Please bear in mind that Hoardable is currently in Beta and a plethora of upgrades are scheduled.",
    },
    {
        id: uuid(),
        view: false,
        question: "What wallets are compatible?",
        answer:
            "At this current time, we support Wallet Connect and Metamask connectivity.",
    },
    {
        id: uuid(),
        view: false,
        question: "What does Custom token support mean?",
        answer:
            "Project owners can request to list their token as an accepted payment method on Hoardable. ",
    },
    {
        id: uuid(),
        view: false,
        question:
            "Does this mean that I might receive a different currency for my NFT I have listed?",
        answer:
            "No, the custom token must be chosen as the method of payment when listing the NFT for sale. Whatever currency the seller chooses when listing the NFT is the currency they will receive.",
    },
    {
        id: uuid(),
        view: false,
        question: "What are the benefits in Custom Token support?",
        answer:
            "First and foremost is to provide an immediate use case to projects. This grant projects the ability to list their NFT’s directly for the project’s currency giving investors the ability to use their tokens for purchases.",
    },
    {
        id: uuid(),
        view: false,
        question: "I am a project owner, how can I list my token on Hoardable?",
        answer: "Simply fill in the form here and we will get back to you!",
    },
    {
        id: uuid(),
        view: false,
        question: "How do I find the contract address and token ID of my NFT?",
        answer:
            "You can find the Contract Address and TokenID of the NFT by simply going to its block explorer page (Etherscan, Bscscan, etc.)",
    },
    {
        id: uuid(),
        view: false,
        question:
            "Where are my NFT’s kept? Are they limited to just Hoardable platform?",
        answer:
            "Hoardable is non-custodial, meaning we have no ownership over your NFT’s!Your NFT’s are stored in your own personal wallet. The only person with access to your NFT’s purchased via Hoardable is you!All NFT’s are available to be viewed and traded on other marketplaces.",
    },
    {
        id: uuid(),
        view: false,
        question: "Who pays the gas fee?",
        answer:
            "Gas fees are like transaction fees on the blockchain. When you make transactions, such as making transfers to another wallet or purchasing a digital collectible on Hoardable, you'll need enough BNB in your wallet for the initial transaction and the associated gas fees.",
    },
    {
        id: uuid(),
        view: false,
        question: "Why choose to launch first on Binance rather than Ethereum?",
        answer:
            "Our studio is developing 2 blockchain integrated games based on Binance so it was important for us to launch on Binance smart chain first.",
    },
    {
        id: uuid(),
        view: false,
        question: "What fees can I expect to pay to mint an NFT?",
        answer:
            "The only fee you pay is the gas fee for the transaction. This can vary depending on the time and day and we have no control over said fees.",
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
        GET_NFT: "get-nft",
        GET_NFTS: "get-nfts",
        GET_CATEGORY: "get-categories",
        GET_COLLECTION: "get-collection",
        GET_COLLECTIONS: "get-collections",
        GET_TRENDING_COLLECTION: "trending-collection",
        OPEN_FOR_SALE_NFT: "open-for-sale",
        GET_TOP_NFT_SALES: "top-nfts-open-for-sales",
        ADD_CONTENT: "add-content",
        ADD_TOKEN: "add-token",
        NFT_FOR_PARTICULAR_USER: "get-created-nft",
        GET_USERPROFILE: "get-user",
        ON_SALE_NFT_FOR_PARTICULAR_USER: "get-on-sale",
        FAVOURITE_NFT_FOR_PARTICULAR_USER: "get-favourite-nfts",
        OWNED_NFT_FOR_PARTICULAR_USER: "get-owner",
        NFT_FOR_PARTICULAR_COLLECTION: "nfts-of-collection",
        RECENTLY_SOLD_NFT: "recently-sold-nft",
        TRENDING_NFT: "trending-nft",
        GET_CATEGORY_ID: "get-category-id",
        HELP_CENTER_SERVICE: "notify-help-center",
        SUGGESTIONS_SERVICE: "notify-suggestions",
        GET_NFT_LIST: "get-nft-list",
        PRICE_CONVERSION: "price-conversion",
        GET_COLLECTION_BY_ID: "get-collection-id",
        VOLUME_TRADED: "volume-traded",
        FLOOR_PRICE: "floor-price",
        PRICE_GRAPH: "price-graph",
        TOP_SELLERS: "get-top-seller",
        TOP_BUYERS: "get-top-buyers",
        TOP_COLLECTIONS: "top-collection",
        GET_COUNT: "get-count",
        GET_FEATURED_NFT: "get-featured-nft",
        REPORT_NFT: "add-report-nft",
        LIKE_NFT: "like-nft",
        ADD_OFFER: "add-offer",
        GET_ACTIVITY: "get-activity",
        GET_OWNERS: "get-owners",
        GET_TRAITS: "get-traits",
        GET_NFT_FILTER: "get-nft-filter",
    },
};
export const pathConstants = {
    HEADER: {
        NFT_DETAILS: "/nft",
    },
};
export const transactionConstants = {
    MINT: "MINT",
    SELL: "SELL",
    BUY: "BUY",
    REMOVE_FROM_SALE: "REMOVE_FROM_SALE",
    OFFER: "OFFER",
    TRANSFER: "TRANSFER"
};
export const NftConstants = {
    BUY_NOW: "Buy now",
    SELL_NOW: "Sell now",
    REMOVE_FROM_SALE: "Remove From Sale",
    MAKE_OFFER: "Make Offer",
};
export const NetworkConstants = {
    TESTNET: "test",
    MAINET: "main",
    MAINET_CHAIN_ID: 56
};
export const stringConstants = {
    TYPE_ALL: "All",
    TYPE_CHARACTER: "Character",
    TYPE_SWORD: "Sword",
    TYPE_ARMORS: "Armors",
    TYPE_GUNS: "Gun",
    RECENTLY_ADDED: "Recently Added",
    RECENTLY_SOLD: "Recently Sold",
    LOW_TO_HIGH: "Low to High",
    HIGH_TO_LOW: "High to Low",
    TYPE_PRICE: "Price",
    DEFAULT_TOKEN: "BNB",
    CLICK: "click",
    TITLE_COVER: "cover",
    TITLE_PROFILE: "profile",

    SELECT_TOKEN: "Select Token",
    BUYER_KEY: "buyer",
    SELLER_KEY: "seller",
    COLLECTION_KEY: "collections",
    BUYER: "634514fb0443a3003582f7ee",
};

export const CURRENCIES = {
    BNB: "BNB",
    SACREDTALES: "SACREDTALES",
    INSTINCTGAMES: "INSTINCTGAMES",
    OTHER: "OTHER",
    SACRED_TAILES: "SACRED TAILES",
    INSTINCT: "INSTINCT",
    SACRED_TAILS: "Sacred Tails"
};
export const SYMBOL = {
    BNB: "BNB",
    SACREDTALES: "ST",
    INSTINCTGAMES: "IG",
    OTHER: "OTHER",
    SACRED_TAILES: "ST",
    INSTINCT: "INS",
    SACRED_TAILS: "ST"
};
export const cookiesConstants = {
    USER: "user",
    WALLET_CONNECT: "walletconnect",
    IS_METAMASK: "isMetamask",
    BNB_USD_CONVERSION: "BNB_TO_USD",
    SACRED_USD_CONVERSION: "SACRED_TO_USD",
    INSTINCT_USD_CONVERSION: "INSTINCT_TO_USD",
};
export const eventConstants = {
    SHOW_LOADER: "SHOW_LOADER",
    HIDE_LOADER: "HIDE_LOADER",
    SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    UPDATE_NOTIFICATION_UNREAD_COUNT: "UPDATE_NOTIFICATION_UNREAD_COUNT",
    GET_USER_DATA: "GET_USER_DATA",
    GET_NEW_USER_DATA: "GET_NEW_USER_DATA",
    WALLET_DATA: "WALLET_DATA",
    META_MASK: "META_MASK",
    BNB_USD_CONVERSION: "BNB_TO_USD",
    SACRED_USD_CONVERSION: "SACRED_TO_USD",
    INSTINCT_USD_CONVERSION: "INSTINCT_TO_USD",
    SALE_SUCCESS: "SALE_SUCCESS"
};

export const validationsMessages = {
    CONTRACT_ADDRESS_ERROR:
        "Contract Address should start with 0x and min 40 chars",
    FORM_FIELD_ERROR: "Fill all required fields",
    FILTER_RANGE_NFT: "No nft is present in this range",
    IS_TEXT_COPIED: "Link has been Copied",
    TOASTS_POSITION: "top-center",
    EMAIL_VALIDATION: "Enter valid email address",
    MAIL_SENT_SUCCESSFULLY: "Mail has been sent successfully",
    REQUEST_SUCCESFULL: "Request has been Sent Successfully",
    FIELD_TEXT_ERROR: "Please fill field with correct data",
    STATUS_REQUIRED: "REQUESTED",
    WALLET_CONNECT: "Wallet is not connected",
    TOKEN_ALREADY_EXISTS: "Tokens already Exists",
    NOT_LOGGED_IN: "You are not logged in",
    UNABLE_TO_LIKE: "Unable to like NFT",
    LIKED_NFT_SUCCESSFULLY: "NFT has been liked Successfully",
    UNLIKED_NFT_SUCCESSFULLY: "NFT has been unliked Successfully",
    METADATA_REFRESHED_SUCCESSFULLY: "NFT metadata has been refreshed Successfully",
    NOTIFICATIONS_PREFERENCES_UPDATED_SUCCESSFULLY: "Notification preferences updated Successfully",
    UNABLE_TO_HIDE: "Unable to hide NFT",
    HIDE_NFT_SUCCESSFULLY: "NFT has been hide successfully",
    UNHIDE_NFT_SUCCESSFULLY: "NFT has been unhide successfully",
    PROFILE_TO_UPDATE_USER: "User Profile is updated",
    CANNOT_TAKE_DECIMAL: "Can't recieve decimals for this token",
    LIKE_SUCCESSFULLY: "NFT liked successfully.",
    REPORT_ADDED_SUCCESS: "NFT reported successfully",
    UNABLE_TO_ADD_REPORT: "Unable to add Nft report.",
    UNABLE_FETCH_CATEGORY: "Unable to fetch category.",
    UNABLE_FETCH_COLLECTION: "Unable to fetch collection list.",
    UNABLE_TO_CONNECT_WALLET: "Unable to connect with wallet.",
    UNABLE_TO_ADD_USER: "Unable to add User in DB.",
    PLEASE_SELECT_FILE: "Please select file to upload",
    UNABLE_TO_ADD_FILE_ON_IPFS: "Unable to add file on IPFS.",
    UNABLE_TO_MINT_NFT_ON_BLOCKCHAIN: "Unable to mint NFT on blockchain.",
    UNABLE_TO_SAVE_NFT: "Unable to save NFT content.",
    UNABLE_TO_UPDATE_USER: "Unable to update user information.",
    UNABLE_TO_FETCH_USER: "Unable to fetch user information.",
    UNABLE_TO_UPLOAD_FILE: "Unable to upload file.",
    UNABLE_TO_CREATE_NFTS: "This is a blocked user, can't create Nft's",
    UNABLE_TO_SELL_NFTS: "This is a blocked user, can't Sell Nft's",
    UNABLE_TO_BUY_NFTS: "This is a blocked user, can't Buy Nft's",
    FILE_SIZE_VALIDATION: "Please upload a file smaller than 10 MB",
    PRICING_FILTER_ERROR:
        "Make sure that max value should be greater than min value",
    TAGS_LIMIT_REACHED: "Tags Limit has been Reached",
    UNABLE_TO_FETCH_CONTRACT: "Unable to fetch data from token contract",
    UNABLE_TO_APPROVE_TOKEN: "Unable to approve token on blockchain",
    ERROR_IN_BLOCKCHAIN: "Error in blockchain",
    UNABLE_TO_SELL_NFT_ON_BLOCKCHAIN: "Unable to sell NFT on blockchain",
    UNABLE_TO_BUY_NFT_ON_BLOCKCHAIN: "Unable to buy NFT on blockchain",
    UNABLE_TO_REMOVE_NFT_FROM_SALE: "Unable to remove NFT from sale",
    UNABLE_TO_UPDATE_NFT_CONTENT: "Unable to update Nft content.",
    PLEASE_ENTER_THE_NAME: "Please enter the name",
    PLEASE_ENTER_PRICE_ERROR: "Please enter the correct price",
    PRICE_ENTER_ERROR: "Price should be greater than equal to ",
    PRICE_ERROR: "Price should not be less than or equal to 0",
    SELECT_TYPE_ERROR: "Please select type of nft",
    ENTER_DESCRIPTION_ERROR: "Please enter description",
    PLEASE_ADD_EXTERNAL_LINK: "Please add external link field",
    PLEASE_ADD_TOPIC: "Please add topic",
    UPLOAD_SMALLER_SIZE_FILE: "Upload a smaller size file",
    UNABLE_TO_ACCEPT_OFFER_ON_BLOCKCHAIN: "Unable to accept offer on blockchain",
    UNABLE_TO_REJECT_OFFER_ON_BLOCKCHAIN: "Unable to reject offer on blockchain",
    UNABLE_TO_SELL_LISTED_ALREADY: "Unable list this item as its already listed in blockchain",
    UNABLE_TO_TRANSFER_NFT: "Unable to tranfer nft",
    INVALID_URL: "Invalid URL"
    // TESTING:
    //   "You can find the Contract Address and TokenID of the NFT by simply going to its block explorer page (Etherscan, Bscscan, etc.)Please add external link field Unable to accept offer on blockchain",
};
export const credsConstants = {
    DUMMY_IMAGE_ONE:
        "https://tse2.mm.bing.net/th?id=OIP.BROZU1bxnFLWgdmSeELL0AHaEK&pid=Api&P=0&w=293&h=165",
    DUMMY_IMAGE_TWO:
        "https://tse3.mm.bing.net/th?id=OIP.kDFjspaPmzm70xdC-bVlegHaNK&pid=Api&P=0&w=300&h=300",
    SENDER_EMAIL_ADDRESS: "mayurw@leewayhertz.com",
    RECIEVER_EMAIL_ADDRESS: "rajatsi@leewayhertz.com",
    HELP_CENTER_SUBJECT: "Help Center",
    SUGGESTIONS_SUBJECT: "Suggestions",
    TEXT_TYPE: "email",
    DUMMY_PLACEHOLDER_URL: "https://yourlink.com",
    BNB_TOKEN_IMAGE: "BNBToken.png",
};

export const genericConstants = {
    CURRENCIES: ["BNB", "Sacred Tails", "INSTINCT"],
    CURRENCY_SYMBOL: {
        BNB: "BNB",
        SACREDTALES: "Sacred Tails",
        INSTINCT: "INSTINCT",
    },
    PRICE_GRAPH_FILTER: {
        365: "All Time",
        30: "Monthly",
        7: "Weekly",
    },
    RECENTLY_FILTER: [
        {
            name: "All",
            value: "ALL"
        },
        {
            name: "Recently Added",
            value: "RECENTLY_ADDED"
        },
        {
            name: "Recently Listed",
            value: "RECENTLY_LISTED"
        },
        {
            name: "Price low to high",
            value: "PRICE_LOW_TO_HIGH"
        },
        {
            name: "Price high to low",
            value: "PRICE_HIGH_TO_LOW"
        }
    ],
    TypeConstants: [

        {
            name: "All",
            value: "All",
        },
        {
            name: "Action",
            value: "Action",
        },
        {
            name: "Adventure",
            value: "Adventure",
        },
        {
            name: "RPG",
            value: "RPG",
        },
        {
            name: "CCG",
            value: "CCG",
        },
    ],

    SortConstants: [

        {
            name: "All",
            value: "All",
        },
        {
            name: "Recently Added",
            value: "-addedOn",
        },
        {
            name: "Recently Updated",
            value: "-modifiedOn",
        },
    ]
};

export const notificationPreferencesConstants = {
    ITEM_SOLD: "ITEM_SOLD",
    BID_ACTIVITY: "BID_ACTIVITY",
    PRICE_CHANGE: "PRICE_CHANGE",
    OUTBID: "OUTBID",
    OWNED_ITEM_UPDATES: "OWNED_ITEM_UPDATES",
    SUCCESSFUL_PURCHASE: "SUCCESSFUL_PURCHASE",
    HOARDABLE_NEWSLETTER: "HOARDABLE_NEWSLETTER"
}

export const notificationItemDetails = {
    ITEM_SOLD: {
        title: "Item Sold",
        info: "When Someone Purchased one of your items"
    },
    BID_ACTIVITY: {
        title: "Bid Activity",
        info: "When Someone bids on one of your items"
    },
    PRICE_CHANGE: {
        title: "Price Change",
        info: "When an item you made an offer on changes in price"
    },
    OUTBID: {
        title: "Outbid",
        info: "When an offer you placed is exceded by another user"
    },
    OWNED_ITEM_UPDATES: {
        title: "Owned Item Updates",
        info: "When a significant update occurs for one of the items you have purchased on Hoardable"
    },
    SUCCESSFUL_PURCHASE: {
        title: "Successful Purchase",
        info: "When you successfully buy an item"
    },
    HOARDABLE_NEWSLETTER: {
        title: "Hoardable Newsletter",
        info: "Occasional updates from the Hoardable team"
    }
}

