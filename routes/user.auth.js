var express = require('express');
var router = express.Router();

const AuthController = require("../controllers/user.auth");

/*  register */
router.post('/register', AuthController.register);
/* get products  */
router.post('/login', AuthController.login);

module.exports = router;
