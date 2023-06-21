var express = require("express");
var router = express.Router();
const auth = require("../middleware/auth");

/* GET welcome message. */
router.get("/", function (req, res, next) {
  res.json({ message: "welcome to supabase!" });
});

//auth routes
router.use("/products",auth(),require('./products'))
//products routes
router.use("/auth", require('./user.auth'))

module.exports = router;
