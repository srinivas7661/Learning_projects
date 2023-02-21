import LikesModule from "../app/modules/likes";
import * as ValidationManager from "../middleware/validation";
import { stringConstants, apiEndpoints } from "../app/common/constants";
import ContentModule from "../app/modules/content";
import reportedModule from "../app/modules/reportedNft";
import Views from "../app/modules/views";
import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("./uploads/")) {
      fs.mkdirSync("./uploads/");
    }
    cb(null, "./uploads/");
  },
  filename: async function (req, file, cb) {
    await cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = (app) => {
  app.get("/", (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));
  app.post(
    apiEndpoints.ADD_CONTENT,
    // upload.array("files"),
    ValidationManager.validateAddContent,
    new ContentModule().addContent
  );
  app.post(apiEndpoints.GET_NFTS, new ContentModule().getContent);
  app.put(apiEndpoints.OPEN_FOR_SALE, new ContentModule().OpenForSale);
  app.post(apiEndpoints.LIKE_NFT, new LikesModule().addLike);
  app.post(apiEndpoints.ADD_VIEW, new Views().addView);
  app.put(apiEndpoints.UPDATE_CONTENT, new ContentModule().updateContent);
  app.post(
    apiEndpoints.BUY_NFT,
    ValidationManager.validateBuyNFT,
    new ContentModule().buyNFT
  );
  app.get(apiEndpoints.TRENDING_NFT, new ContentModule().trendingNft);
  app.get(apiEndpoints.GET_ON_SALE, new ContentModule().getOnSale);
  app.get(apiEndpoints.GET_OWNER, new ContentModule().getOwner);
  app.get(apiEndpoints.GET_NFT, new ContentModule().getNft);
  app.get(apiEndpoints.REPORTED_NFT_LIST, new reportedModule().getReportedNfts);
  app.get(
    apiEndpoints.REPORTED_NFT_LIST_BYID,
    new reportedModule().getReportByNftsId
  );
  app.post(
    apiEndpoints.REMOVED_NFT_LIST,
    new reportedModule().getDeletedNftList
  );
  app.get(
    apiEndpoints.REMOVE_NFT_LIST_BYID,
    new reportedModule().getRemoveByNftsId
  );
  app.post(
    apiEndpoints.BLOCKED_USER_LIST,
    new reportedModule().getBlockedUserList
  );
  app.post(apiEndpoints.REMOVE_BLOCK_USER, new ContentModule().removeNft);
  app.put(apiEndpoints.UNREMOVE_NFT, new ContentModule().unRemoveNft);
  app.post(
    apiEndpoints.DELETE_REPORTED_NFT_BY_ID,
    new reportedModule().deleteReportedNft
  );
  app.post(apiEndpoints.ADD_REPORT_NFT, new reportedModule().reportNft);
  app.get(apiEndpoints.GET_CREATED_NFT, new ContentModule().getCreatedNft);
  app.get(apiEndpoints.GET_REMOVED_NFT, new ContentModule().getRemovedNft);
  // app.get("/get-favourite-nfts", new LikesModule().getFavouriteNfts);
  app.get(apiEndpoints.GET_FAVOURITE_NFT, new ContentModule().getFavouriteNfts);
  app.get(
    apiEndpoints.TOP_NFT_OPEN_FOR_SALE,
    new ContentModule().topNftOpenForSale
  );
  app.post(apiEndpoints.RECENTLY_SOLD_NFT, new ContentModule().recentlySoldNft);
  app.get(
    apiEndpoints.NFTS_OF_COLLECTION,
    new ContentModule().getNftOfCollection
  );
  app.put(apiEndpoints.REMOVE_FROM_SALE, new ContentModule().RemoveFromSale);
  app.post(
    apiEndpoints.ADD_FILE_IPFS,
    upload.array("files"),
    new ContentModule().addFileIpfs
  );
  app.post(apiEndpoints.TOP_NFT, new ContentModule().topNft);
  app.post(apiEndpoints.NOTIFY, new ContentModule().notifyService);
  app.post(
    apiEndpoints.NOTIFY_HELP_CENTER,
    new ContentModule().notifyHelpCenterService
  );
  app.post(
    apiEndpoints.NOTIFY_SUGGESTIONS,
    new ContentModule().notifySuggestionService
  );
  app.post(
    apiEndpoints.ADD_TOKEN_REQUEST,
    new ContentModule().addTokenRequestContent
  );
  app.get(apiEndpoints.GET_NFT_LIST, new ContentModule().getNftList);
  app.put(apiEndpoints.DELETE_NFT, new ContentModule().deleteNft);
  app.get(apiEndpoints.FLOOR_PRICE, new ContentModule().getFloorPrice);
  app.get(apiEndpoints.GET_COUNT, new ContentModule().getCount);
  app.put(apiEndpoints.HIDE_NFT, new ContentModule().hideNft);
  app.get(apiEndpoints.GET_HIDDEN_NFT, new ContentModule().getHiddenNft);
};
