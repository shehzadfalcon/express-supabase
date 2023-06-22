const STRINGS = require("../utils/texts");

// services
const AuthService = require("../services/auth.service");
const SupaBaseService = require("../services/supabase.service");

const LoggerService = require("../config/logger");
//db
const supabase = require("../config/db");

class AuthController {
  //    User Register
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      //find user by email
      const { data } = await SupaBaseService.getById(
        "user",
        "email",
        email,
        SupaBaseService.selectUserFields
      );

      // generating hashed password
      const hashedPassword = AuthService.HashPassword(password);

      if (data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.userAlreadyExists,
          res
        );
      }

      //register user
      await SupaBaseService.create("user", {
        email,
        name,
        password: hashedPassword,
      });

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

  //   User login
  async login(req, res) {
    try {
      let { email, password } = req.body;
      const { data } = await SupaBaseService.getById(
        "user",
        "email",
        email,
        SupaBaseService.selectUserFields
      );

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.userNotExists,
          res
        );
      }

      //Check Password
      const isCorrect = AuthService.comparePassword(password, data.password);

      if (!isCorrect) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.EXISTS,
          STRINGS.ERRORS.passwordInvalid,
          res
        );
      }

      // generating auth token
      const token = AuthService.generateToken(data);

      delete data.password;

      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.userLogin,
        res,
        { token, data }
      );
    } catch (error) {
      console.log("User Login Error-->", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }

  //   //Get Current Logged In User
  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const { data } = await SupaBaseService.getById(
        "user",
        "id",
        userId,
        SupaBaseService.selectUserFields
      );

      if (!data) {
        return LoggerService.LoggerHandler(
          STRINGS.STATUS_CODE.NOT_FOUND,
          STRINGS.ERRORS.userNotExists,
          res
        );
      }
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.SUCCESS,
        STRINGS.TEXTS.profileData,
        res,
        data
      );
    } catch (error) {
      console.log("Invite Error -->", error);
      LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
        error.message,
        res
      );
    }
  }
}

module.exports = new AuthController();
