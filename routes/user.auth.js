var express = require('express');
var router = express.Router();

const AuthController = require("../controllers/user.auth");
const auth = require("../middleware/auth");

/*  register */
router.post('/register', AuthController.register);
/* login  */
router.post('/login', AuthController.login);
/* get authenticated user */
router.get("/",auth(), AuthController.getProfile);

module.exports = router;
