const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controller/productController")
const { isAuthenticatedUser, authorizedUser } = require("../middleware/auth");
// |                                                                                      


router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticatedUser, authorizedUser("admin"), createProduct);
router.route("/product/:id").put(isAuthenticatedUser, authorizedUser("admin"), updateProduct).delete(isAuthenticatedUser, authorizedUser("admin"), deleteProduct).get(getProductDetails)
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview)

module.exports = router;