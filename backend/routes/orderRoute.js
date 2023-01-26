const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizedUser } = require("../middleware/auth");
const { newOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController");
const { getSingleUser } = require("../controller/userController");
// |                                                                                                                            
router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, authorizedUser("admin"), getSingleUser);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizedUser('admin'), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizedUser("admin"), updateOrder).delete(isAuthenticatedUser, authorizedUser("admin"), deleteOrder);

module.exports = router; 