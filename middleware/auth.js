const STRINGS = require("../utils/texts");
const supabase = require("../config/db");

const AuthService = require("../services/auth.service");

/**
 * If no role is passed the default role is user
 *
 * @param  {String} role role allowed to access the route
 */

function auth() {
  // roles = roles.length > 0 && roles : role.USER;
  return async (req, res, next) => {
    const header = req.get("Authorization");
    if (!header || !header.startsWith("Bearer")) {
      return res.status(401).json({ message: STRINGS.ERRORS.tokenInvalid });
    }

    try {
      const token = header.split(" ")[1];

      const decoded = await AuthService.generateVerifyToken(
        token,
        process.env.JWT_SECRET
      );

      // let role = role;
      let id = String(decoded.id);
      const { data } = await supabase
        .from("user")
        .select("id,name,email,created_at")
        .eq("id", id)
        .single();
      if (!data)
        return res.status(401).json({ message: STRINGS.ERRORS.userNotFound });

      req.user = data;
      req.userId = data.id;
      next();
    } catch (err) {
      console.log("err--->", err);
      return res.status(401).json({ message: STRINGS.ERRORS.tokenExpired });
    }
  };
}

module.exports = auth;
