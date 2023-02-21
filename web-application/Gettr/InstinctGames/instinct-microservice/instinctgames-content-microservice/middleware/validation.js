import Utils from "../app/utils";
import * as yup from "yup";
module.exports = {
  validateAddContent: async (req, res, next) => {
    const schema = yup.object().shape({
      tokenId: yup.number().required(),
      transactionHash:yup.string().required(),
      cid: yup.string().required(),
      name: yup.string().required(),
      categoryId: yup.string().required(),
      collectionId: yup.string().required(),
      ipfsUrl: yup.string().required(),
      cdnUrl: yup.string().required(),
      contentType: yup.string().required(),
      network: yup.object().shape({
        chainId:yup.number().required(),
        name:yup.string().required(),
      }),
      ownedBy: yup.string().required(),
      createdBy: yup.string().required(),
      updatedBy: yup.string().required(),
      ownerAddress: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateUpdateContent: async (req, res, next) => {
    const schema = yup.object().shape({
      ipfsUrl: yup.string().required(),
      name: yup.string().required(),
      categoryId: yup.string().required(),
      contentType: yup.string().required(),
      blockchain: yup.string().required(),
      description: yup.string().required(),
      ownedBy: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateBuyNFT: async (req, res, next) => {
    const schema = yup.object().shape({
      contentId: yup.string().required(),
      seller: yup.string().required(),
      buyer: yup.string().required(),
      price: yup.number().required(),
      currency: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
};

const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    Utils.responseForValidation(res, errors);
  }
};
