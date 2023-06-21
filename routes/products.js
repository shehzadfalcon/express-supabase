var express = require("express");
var router = express.Router();
const ProductsController = require("../controllers/products");

/* create products  */
router.post("/", ProductsController.create);
/* get products  */
router.get("/", ProductsController.get);
/* get product by id  */
router.get("/:id", ProductsController.getById);
/* update product by id  */
router.patch("/:id", ProductsController.updateById);
/* delete product  */
router.delete("/:id", ProductsController.deleteById);

module.exports = router;
