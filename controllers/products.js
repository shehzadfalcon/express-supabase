const STRINGS = require("../utils/texts");


const LoggerService = require("../config/logger");
//database
const supabase = require("../config/db");


class ProductsController {
  //create
  async create(req, res) {
    try {
      const { name } = req.body;
      //find user by email
      const { data } = await supabase
        .from("products")
        .select("name,category,created_at")
        .eq("name", name)
        .single();

      if (data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.productAlreadyExist,
          res
        );
      }
      //add product
      await supabase.from("products").insert(req.body);

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
      //find user by email
      const { data } = await supabase
        .from("products")
        .select("id,name,created_at");

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
  //get product by id
  async getById(req, res) {
    try {
      const id = req.params.id;
      const { data } = await supabase
        .from("products")
        .select("id,name,created_at")
        .eq("id", id)
        .single();
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
      const { data } = await supabase
        .from("products")
        .select("id,name,created_at")
        .eq("id", id)
        .single();
      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.productNotFound,
          res
        );
      }
      await supabase.from("products").update(req.body).eq("id", id);

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
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.CREATED,
        STRINGS.TEXTS.userCreated,
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
