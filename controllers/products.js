const STRINGS = require("../utils/texts");

//services
const LoggerService = require("../config/logger");
const SupaBaseService = require("../services/supabase.service");

class ProductsController {
  //create
  async create(req, res) {
    try {
      const { name } = req.body;
      //find user by email

      const { data } = await SupaBaseService.getById("products", "name", name);

      if (data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.productAlreadyExist,
          res
        );
      }
      //add product
      await SupaBaseService.create("products", req.body);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.productsCreated,
        res
      );
    } catch (error) {
      console.log("User Register Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }
  //get products
  async get(req, res) {
    try {
      //get all products
      const { data } = await SupaBaseService.getAll(
        "products",
        SupaBaseService.selectProductsFields
      );

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.productsFetched,
        res,
        data
      );
    } catch (error) {
      console.log("products Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }
  //get product by user id
  async getByUserId(req, res) {
    try {
      const id = req.params.userId;
      const { data } = await SupaBaseService.getById(
        "products",
        "user_id",
        id,
        SupaBaseService.selectProductsFields
      );

      // .single();
      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.productNotFound,
          res
        );
      }
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.productsFetched,
        res,
        data
      );
    } catch (error) {
      console.log("User Register Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }
  //get product by id
  async getById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById(
        "products",
        "id",
        id,
        SupaBaseService.selectProductsFields
      );

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.productNotFound,
          res
        );
      }
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.productsFetched,
        res,
        data
      );
    } catch (error) {
      console.log("User Register Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }
  //update product by id
  async updateById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById(
        "products",
        "id",
        id,
        SupaBaseService.selectProductsFields
      );
      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.productNotFound,
          res
        );
      }
      await SupaBaseService.update("products", req.body, id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.productsUpdated,
        res
      );
    } catch (error) {
      console.log("User Register Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }
  //delete product by id
  async deleteById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await SupaBaseService.getById(
        "products",
        "id",
        id,
        SupaBaseService.selectProductsFields
      );
      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.productNotFound,
          res
        );
      }
      //delete
      await SupaBaseService.delete("products", id);

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.productsDeleted,
        res
      );
    } catch (error) {
      console.log("User Register Error-->", error.message);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }
}

module.exports = new ProductsController();
