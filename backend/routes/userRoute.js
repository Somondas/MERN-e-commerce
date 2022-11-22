const express = require("express");
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser} = require("../controller/userController");
const {isAuthenticatedUser, authorizedUser} = require("../middleware/auth")
const router = express.Router();
// |                                                                                                    
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/logout").get(logout)

router.route("/me").get(isAuthenticatedUser, getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser, authorizedUser("admin"), getAllUser)

router.route("/admin/user/:id").get(isAuthenticatedUser,authorizedUser("admin"), getSingleUser).put(isAuthenticatedUser,authorizedUser("admin"), updateUserRole).delete(isAuthenticatedUser,authorizedUser("admin"), deleteUser)
module.exports = router;