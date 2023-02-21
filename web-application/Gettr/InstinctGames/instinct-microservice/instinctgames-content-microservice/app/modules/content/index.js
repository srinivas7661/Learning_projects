import Utils from "../../utils";
import {
  apiSuccessMessage,
  httpConstants,
  apiFailureMessage,
} from "../../common/constants";
import BLManager from "./manager";
import SellAndPurchaseManager from "../sellAndPurchase/manager";

export default class Content {
  async addContent(request, response) {
    const [error, addContentResponse] = await Utils.parseResponse(
      new BLManager().addContent(request.body)
    );
    if (error) {
      return Utils.handleError(error, request, response);
    }
    await SellAndPurchaseManager.addTransaction(
      {
        _id: addContentResponse._id,
        seller: addContentResponse.createdBy,
        buyer: addContentResponse.ownedBy,
        price: addContentResponse.saleData.price || 0,
        currency: addContentResponse.saleData.currency || "",
        transaction: addContentResponse.transactionHash || "",
        collectionId: addContentResponse.collectionId || "",
      },
      "MINT"
    );

    return Utils.response(
      response,
      addContentResponse,
      apiSuccessMessage.ADD_CONTENT_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  //get ngts
  async getContent(request, response) {
    const [error, contentList] = await Utils.parseResponse(
      new BLManager().getNfts(request.body)
    );
    if (error) return Utils.handleError(error, request, response);

    return Utils.response(
      response,
      contentList,
      apiSuccessMessage.FETCH_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async updateContent(request, response) {
    const [error, updateContentRes] = await Utils.parseResponse(
      new BLManager().updateContent(request.body)
    );
    if (!updateContentRes) {
      return Utils.handleError(error, request, response);
    }
    if (request.body && request.body.type) {
      await SellAndPurchaseManager.addTransaction(
        {
          _id: updateContentRes._id,
          seller: request.body.seller || "",
          buyer: request.body.buyer,
          price: updateContentRes.saleData.price || 0,
          currency: updateContentRes.saleData.currency || "",
          transaction: request.body.transaction || "",
          collectionId: updateContentRes.collectionId || "",
        },
        request.body.type
      );
    }

    return Utils.response(
      response,
      updateContentRes,
      apiSuccessMessage.UPDATED_CONTENT_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async OpenForSale(request, response) {
    const [error, openForSaleRes] = await Utils.parseResponse(
      new BLManager().OpenForSale(request.body)
    );
    if (!openForSaleRes) {
      return Utils.handleError(error, request, response);
    }
    let message =
      openForSaleRes.status == "error"
        ? apiFailureMessage.HIDDEN_NFT
        : apiSuccessMessage.GET_OPEN_FOR_SALE_SUCCESSFULLY;
    return Utils.response(
      response,
      openForSaleRes,
      message,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async buyNFT(request, response) {
    const [error, buyNFTRes] = await Utils.parseResponse(
      new BLManager().buyNFT(request.body)
    );
    if (!buyNFTRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      buyNFTRes,
      apiSuccessMessage.PURCHASED_SUCCESSFULLY,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async trendingNft(request, response) {
    const [error, trendingContentRes] = await Utils.parseResponse(
      new BLManager().trendingNft(request.query)
    );
    if (!trendingContentRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      trendingContentRes,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async getOnSale(request, response) {
    try {
      const [error, getOnSaleRes] = await Utils.parseResponse(
        new BLManager().getOnSale(request.query)
      );
      if (!getOnSaleRes) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        response,
        getOnSaleRes,
        apiSuccessMessage.GET_ON_SALE_SUCCESSFULLY,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      return Utils.handleError(error, request, response);
    }
  }

  async getOwner(request, response) {
    const [error, getOwnerRes] = await Utils.parseResponse(
      new BLManager().getOwner(request.query)
    );
    if (!getOwnerRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getOwnerRes,
      apiSuccessMessage.GET_OWNER_SUCCESSFULLY,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async getNft(request, response) {
    const [error, getNftContent] = await Utils.parseResponse(
      new BLManager().getNft(request.query)
    );
    if (error) return Utils.handleError(error, request, response);
    return Utils.response(
      response,
      getNftContent,
      apiSuccessMessage.FETCH_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async removeNft(request, response) {
    try {
      const [error, removeNftContent] = await Utils.parseResponse(
        new BLManager().removeNft(request.body)
      );
      if (error) return Utils.handleError(error, request, response);
      return Utils.response(
        response,
        removeNftContent,
        apiSuccessMessage.DELETE_NFT,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      return Utils.handleError(error, request, response);
    }
  }

  async unRemoveNft(request, response) {
    try {
      const [error, removeNftContent] = await Utils.parseResponse(
        new BLManager().unRemoveNft(request.body)
      );
      if (error) return Utils.handleError(error, request, response);
      return Utils.response(
        response,
        removeNftContent,
        apiSuccessMessage.UN_DELETE_NFT,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (e) {
      return Utils.handleError(e, request, response);
    }
  }

  async getCreatedNft(request, response) {
    const [error, getCreatedNftRes] = await Utils.parseResponse(
      new BLManager().getCreatedNft(request.query)
    );
    if (error) return Utils.handleError(error, request, response);
    return Utils.response(
      response,
      getCreatedNftRes,
      apiSuccessMessage.CREATED_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async getRemovedNft(request, response) {
    const [error, getRemovedNftRes] = await Utils.parseResponse(
      new BLManager().getRemovedNft(request.query)
    );
    if (error) return Utils.handleError(error, request, response);
    return Utils.response(
      response,
      getRemovedNftRes,
      apiSuccessMessage.FETCH_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async topNftOpenForSale(request, response) {
    const [error, topOpenForSaleRes] = await Utils.parseResponse(
      new BLManager().topNftOpenForSale(request.query)
    );
    if (error) return Utils.handleError(error, request, response);
    return Utils.response(
      response,
      topOpenForSaleRes,
      apiSuccessMessage.FETCH_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async recentlySoldNft(request, response) {
    try {
      const [error, recentlySoldNftRes] = await Utils.parseResponse(
        new BLManager().recentlySoldNft(request.body)
      );
      if (!recentlySoldNftRes) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        response,
        recentlySoldNftRes,
        apiSuccessMessage.RECENTLY_SOLD_NFT_DATA_SUCCESS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      return Utils.handleError(error, request, response);
    }
  }

  async getNftOfCollection(request, response) {
    const [error, getNftOfCollectionRes] = await Utils.parseResponse(
      new BLManager().getNftOfCollection(request.query.collectionId)
    );
    if (!getNftOfCollectionRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getNftOfCollectionRes,
      apiSuccessMessage.FETCH_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async RemoveFromSale(request, response) {
    const [error, removeFromSaleRes] = await Utils.parseResponse(
      new BLManager().RemoveFromSale(request.query)
    );
    if (!removeFromSaleRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      removeFromSaleRes,
      apiSuccessMessage.NFT_REMOVE_FROM_SALE,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async addFileIpfs(request, response) {
    const [error, addFileIpfsResponse] = await Utils.parseResponse(
      new BLManager().addFileIpfs(request.body)
    );
    if (error) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      addFileIpfsResponse,
      apiSuccessMessage.ADD_CONTENT_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async topNft(request, response) {
    const [error, topNftRes] = await Utils.parseResponse(
      new BLManager().topNft(request.body)
    );
    if (error) return Utils.handleError(error, request, response);
    return Utils.response(
      response,
      topNftRes,
      apiSuccessMessage.FETCH_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getNftList(request, response) {
    const [error, NftList] = await Utils.parseResponse(
      new BLManager().getNftList(request.query)
    );
    if (error) return Utils.handleError(error, request, response);

    return Utils.response(
      response,
      NftList,
      apiSuccessMessage.FETCH_NFT,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async notifyService(request, response) {
    const [error, notifyServiceRes] = await Utils.parseResponse(
      new BLManager().notifyService(request.body)
    );
    if (!notifyServiceRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      notifyServiceRes,
      apiSuccessMessage.NOTIFY_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async notifyHelpCenterService(request, response) {
    const [error, notifyHelpCenterServiceRes] = await Utils.parseResponse(
      new BLManager().notifyHelpCenterService(request.body)
    );
    if (!notifyHelpCenterServiceRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      notifyHelpCenterServiceRes,
      apiSuccessMessage.NOTIFY_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async notifySuggestionService(request, response) {
    const [error, notifySuggestionServiceRes] = await Utils.parseResponse(
      new BLManager().notifySuggestionService(request.body)
    );
    if (!notifySuggestionServiceRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      notifySuggestionServiceRes,
      apiSuccessMessage.NOTIFY_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async addTokenRequestContent(request, response) {
    const [error, addTokenRequestContentRes] = await Utils.parseResponse(
      new BLManager().addTokenRequestContent(request.body)
    );
    if (!addTokenRequestContentRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      addTokenRequestContentRes,
      apiSuccessMessage.ADD_TOKEN_REQUEST_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getFavouriteNfts(request, response) {
    const [error, getFavouriteNftsRes] = await Utils.parseResponse(
      new BLManager().getFavouriteNfts(request.query)
    );
    if (error) return Utils.handleError(error, request, response);
    return Utils.response(
      response,
      getFavouriteNftsRes,
      apiSuccessMessage.GET_FAVOURITE_NFT_LIST,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async deleteNft(request, response) {
    try {
      const [error, removeNftContent] = await Utils.parseResponse(
        new BLManager().deleteNft(request.query)
      );
      if (error) return Utils.handleError(error, request, response);
      return Utils.response(
        response,
        removeNftContent,
        apiSuccessMessage.DELETE_NFT,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      return Utils.handleError(error, request, response);
    }
  }
  async getFloorPrice(request, response) {
    const [error, getCollectionRes] = await Utils.parseResponse(
      new BLManager().getFloorPrice(request.query)
    );
    if (error) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getCollectionRes,
      apiSuccessMessage.GET_COLLECTION,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getCount(request, response) {
    const [error, getCollectionRes] = await Utils.parseResponse(
      new BLManager().getCount(request.query)
    );
    if (error) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      getCollectionRes,
      apiSuccessMessage.GET_COLLECTION,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async hideNft(request, response) {
    const [error, nftRes] = await Utils.parseResponse(
      new BLManager().hideNft(request.query)
    );
    if (!nftRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      nftRes,
      apiSuccessMessage.NFT_HIDE,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getHiddenNft(request, response) {
    const [error, nftRes] = await Utils.parseResponse(
      new BLManager().getHiddenNft(request.query)
    );
    if (!nftRes) {
      return Utils.handleError(error, request, response);
    }
    return Utils.response(
      response,
      nftRes,
      apiSuccessMessage.FETCH_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
}
