export default class Parser {
    static getContentUpdateRequest(request) {
        let updateObj = {}
        if (request.transactionHash)
            updateObj['transactionHash'] = request.transactionHash;
        if (request.ipfsUrl)
            updateObj['ipfsUrl'] = request.ipfsUrl;
        if (request.cdnUrl)
            updateObj['cdnUrl'] = request.cdnUrl;
        if (request.contentType)
            updateObj['contentType'] = request.contentType;
        if (request.externalUrl)
            updateObj['externalUrl'] = request.externalUrl;
        if (request.name)
            updateObj['name'] = request.name;
        if (request.categoryId)
            updateObj['categoryId'] = request.categoryId;
        if (request.externalLink)
            updateObj['externalLink'] = request.externalLink;
        if (request.nftType)
            updateObj['nftType'] = request.nftType;
        if (request.collectionId)
            updateObj['collectionId'] = request.collectionId;
        if (request.description)
            updateObj['description'] = request.description;
        if (request.ownedBy)
            updateObj['ownedBy'] = request.ownedBy;
        if (request.ownerAddress)
            updateObj['ownerAddress'] = request.ownerAddress;
        if (request.viewsCount)
            updateObj['viewsCount'] = request.viewsCount;
        if (request.likesCount)
            updateObj['likesCount'] = request.likesCount;
        if (request.createdBy)
            updateObj['createdBy'] = request.createdBy;
        if (request.updatedBy)
            updateObj['updatedBy'] = request.updatedBy;
        if (request.network && Object.keys(request.network).length > 0)
            updateObj['network'] = request.network;
        if (request.saleData && Object.keys(request.saleData).length > 0)
            updateObj['saleData'] = request.saleData;
        if (request.tags && request.tags.length > 0)
            updateObj['tags'] = request.tags;
        if (request.properties && request.properties.length > 0)
            updateObj['properties'] = request.properties;

        updateObj['updatedOn'] = new Date().getTime();
        return updateObj
    }
}
