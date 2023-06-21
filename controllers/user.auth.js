const STRINGS = require("../utils/texts");

// services
const AuthService = require("../services/auth.service");
const LoggerService = require("../config/logger");
//db
const supabase = require("../config/db");

class AuthController {
  //    User Register
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      //find user by email
      const { data } = await supabase
        .from("user")
        .select("id,name,email,created_at")
        .eq("email", email)
        .single();
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
      await supabase
        .from("user")
        .insert({ email, name, password: hashedPassword });

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
      const { data } = await supabase
        .from("user")
        .select("id,name,email,created_at,password")
        .eq("email", email)
        .single();
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
  //   async getProfile(req, res) {
  //     try {
  //       const userId = req.user.id;

  //       const user = await prisma.user.findFirst({
  //         where: {
  //           id: userId,
  //         },
  //         select: UserService.selectUserFields,
  //       });
  //       return LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.SUCCESS,
  //         STRINGS.TEXTS.profileData,
  //         res,
  //         { user: user }
  //       );
  //     } catch (error) {
  //       console.log("Invite Error -->", error);
  //       LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
  //         error.message,
  //         res
  //       );
  //     }
  //   }

  //   //Get  User By Id
  //   async getUser(req, res) {
  //     try {
  //       const userId = req.params.id;

  //       const user = await prisma.user.findFirst({
  //         where: {
  //           id: userId,
  //         },
  //         select: UserService.selectUserFields,
  //       });

  //       return LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.SUCCESS,
  //         STRINGS.TEXTS.profileData,
  //         res,
  //         { user: user }
  //       );
  //     } catch (error) {
  //       console.log("Invite Error -->", error);
  //       LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
  //         error.message,
  //         res
  //       );
  //     }
  //   }

  //   //Update user profile
  //   async updateProfile(req, res) {
  //     try {
  //       const id = req.user.id;
  //       const body = req.body;

  //       const data = {
  //         full_name: body.fullName,
  //         phoneNo: body.phone,
  //         address: body.address,
  //         profile_photo: body.profilePhoto,
  //         facebook: body.facebook || "",
  //         instagram: body.instagram || "",
  //         twitter: body.twitter || "",
  //       };

  //       const user = await UserService.updateUser(id, data);

  //       return LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.SUCCESS,
  //         STRINGS.TEXTS.profileUpdated,
  //         res,
  //         { user: user }
  //       );
  //     } catch (error) {
  //       console.log("Error -->", error);
  //       LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
  //         error.message,
  //         res
  //       );
  //     }
  //   }

  //   //User Change Password
  //   async changePassword(req, res) {
  //     try {
  //       const user = req.user;
  //       const { newPassword, currentPassword } = req.body;

  //       const isCorrect = AuthService.comparePassword(
  //         currentPassword,
  //         user.password
  //       );

  //       if (!isCorrect) {
  //         return LoggerService.LoggerHandler(
  //           STRINGS.STATUS_CODE.FORBIDDEN,
  //           STRINGS.ERRORS.invalidCurrentPassword,
  //           res
  //         );
  //       }

  //       const hashedPassword = AuthService.HashPassword(newPassword);
  //       await prisma.user.update({
  //         where: {
  //           id: user.id,
  //         },
  //         data: {
  //           password: hashedPassword,
  //         },
  //       });

  //       return LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.SUCCESS,
  //         STRINGS.ERRORS.passwordChanged,
  //         res
  //       );
  //     } catch (error) {
  //       console.log("Error -->", error);
  //       LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
  //         error.message,
  //         res
  //       );
  //     }
  //   }

  //   //Update user profile
  //   async updateUserById(req, res) {
  //     try {
  //       const body = req.body;
  //       const id = req.params.id;

  //       const data = {
  //         full_name: body.fullName,
  //       };

  //       const user = await UserService.updateUser(id, data);

  //       return LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.SUCCESS,
  //         STRINGS.TEXTS.profileUpdated,
  //         res,
  //         { user: user }
  //       );
  //     } catch (error) {
  //       console.log("Error -->", error);
  //       LoggerService.LoggerHandler(
  //         STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
  //         error.message,
  //         res
  //       );
  //     }
  //   }
}

module.exports = new AuthController();
