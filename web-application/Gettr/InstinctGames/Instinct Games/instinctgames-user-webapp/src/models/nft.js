export class NFTModel {
    constructor(data) {
        this._id = "";
        this.name = "";
        this.network = {
            chainId: 0,
            name: ""
        };
        this.isHidden=false;
        this.likedBy = [];
        this.saleData = {
            isOpenForSale: null,
            isSold: null,
            price: null,
            currency: ""
        };
        this.collectionId = {
            _id: "",
            name: "",
            collectionAddress: ""
        };
        this.cdnUrl = "";
        this.tokenId = null;
        this.attributes = [];


        if (data) {
            return this.setData(data);
        }
    }

    setData(nft) {
        this._id = nft._id ? nft._id : "";
        this.name = nft._id ? nft.name : (nft.metadata ? (JSON.parse(nft.metadata).name ? JSON.parse(nft.metadata).name : "") : "NA");
        this.network = nft.network ? nft.network : this.network;
        this.likedBy = nft.likedBy ? nft.likedBy : [];
        this.saleData = nft.saleData ? nft.saleData : this.saleData;
        this.isHidden = nft.isHidden;
        this.collectionId = nft.collectionId ? nft.collectionId : {
            _id: "",
            name: nft.name,
            collectionAddress: nft.token_address
        };
        this.collectionDetails = nft.collectionDetails ? nft.collectionDetails : {
            collectionName: nft.name,
            collectionAddress: nft.token_address
        };
        this.cdnUrl = this.getNftUrl(nft);// nft.cdnUrl ? nft.cdnUrl : (nft.metadata ? (JSON.parse(nft.metadata).image ? JSON.parse(nft.metadata).image : "") : (nft.token_uri ? nft.token_uri : ""));
        this.tokenId = nft.tokenId ? nft.tokenId : (nft.token_id ? parseInt(nft.token_id) : 0);
        this.attributes = nft.metadata ? (JSON.parse(nft.metadata).attributes ? JSON.parse(nft.metadata).attributes : []) : [];
    }

    getNftUrl = (nft) => {
        if (nft && nft.cdnUrl)
            return this.parseUrlFormat(nft.cdnUrl);
        let metadata = null;
        if (nft && nft.metadata) {
             metadata = JSON.parse(nft.metadata)
        }
        if (metadata && metadata.image) {
            return this.parseUrlFormat(metadata.image);
        }
        if (metadata && metadata.animation_url) {
            return this.parseUrlFormat(metadata.animation_url);
        }
        return this.parseUrlFormat(nft.token_uri);
    }

    parseUrlFormat = (url)=>{
        if(!url)
            return;
        if (url.includes("ipfs://"))
            url = url.replace("ipfs://", "https://hoardable.infura-ipfs.io/ipfs/");
        return url;
    }
}
