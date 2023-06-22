const util = require("util");
const JWT = require("jsonwebtoken");
const ENV = process.env;
const bcrypt = require("bcryptjs");

class AuthService {
  constructor() {
    this.refreshTokens = [];
  }
  // generate token
  generateToken = (user) => {
    // generate token

    const accessToken = JWT.sign(
      {
        id: user.id,
      },
      ENV.JWT_SECRET
    );

    const refreshToken = JWT.sign(
      { id: user.id },
      ENV.REFRESH_TOKEN_JWT_SECRET
    );
    this.refreshTokens.push(refreshToken);
    return { accessToken, refreshToken };
  };
  // generate refresh token
  generateRefreshToken = async (token, response) => {
    if (!this.refreshTokens.includes(token)) {
      return response.status(404).json({ message: "Refresh token expired" });
    }
    const user = await this.generateVerifyToken(
      token,
      ENV.REFRESH_TOKEN_JWT_SECRET
    );
    const access_token = this.generateToken(user);

    return access_token;
  };

  // verify jwt token
  generateVerifyToken = async (token, secret) => {
    const jwtVerifyAsync = util.promisify(JWT.verify);
    let decoded = await jwtVerifyAsync(token, secret);
    return decoded;
  };
  // hash password
  HashPassword = (password) => {
    //   generate salt for password
    const salt = bcrypt.genSaltSync(+ENV.BCRYPT_SALT);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };
  // compare passwords
  comparePassword = (password, user_password) => {
    // Check if user password is correct
    const isCorrect = bcrypt.compareSync(password, user_password);
    return isCorrect;
  };
  // generate otp
  generateOTP = () => {
    // generate otp
    let otp = Math.floor(10000 + Math.random() * 9000);
    return otp;
  };
  // generate otp expiry
  generateOTPExpires = () => {
    // generate otp expiry
    const resetPasswordExpires = Date.now() + 86400;
    return resetPasswordExpires;
  };
}

module.exports = new AuthService();
