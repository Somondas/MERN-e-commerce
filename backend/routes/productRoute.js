const express = require("express");
const router = express.Router();
const {getAllProducts,createProduct, updateProduct, deleteProduct,getProductDetails} = require("../controller/productController")
const {isAuthenticatedUser, authorizedUser} = require("../middleware/auth");
// |                                                                                      


router.route("/products").get( getAllProducts);
router.route("/products/new").post( isAuthenticatedUser,authorizedUser("admin"), createProduct);
router.route("/products/:id").put(isAuthenticatedUser,authorizedUser("admin"), updateProduct).delete(isAuthenticatedUser,authorizedUser("admin"), deleteProduct).get(getProductDetails)

module.exports = router;