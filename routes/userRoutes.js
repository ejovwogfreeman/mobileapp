const express = require("express");
const {
  getUser,
  updateUser,
  changePassword,
  forgotPasword,
  resetPassword,
  addToCart,
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  clearCart,
  createOrder,
  cancelOrder,
  getAllOrders,
  getSingleOrder,
} = require("../controllers/userControllers");
const protect = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/fileMiddleware");

const router = express.Router();

router.get("/user", protect, getUser);
router.post("/user/change_password", protect, changePassword);
router.post("/user/forgot_password", forgotPasword);
router.post("/user/reset_password", resetPassword);
router.put("/user/update", protect, upload.array("files"), updateUser);
router.put("/user/add_to_cart", protect, addToCart);
router.put("/user/remove_from_cart", protect, removeFromCart);
router.put("/user/increase_cart", protect, increaseCartItemQuantity);
router.put("/user/decrease_cart", protect, decreaseCartItemQuantity);
router.put("/user/clear_cart", protect, clearCart);
router.put("/user/create_order", protect, createOrder);
router.put("/user/cancel_order", protect, cancelOrder);
router.put("/user/orders", protect, getAllOrders);
router.put("/user/order", protect, getSingleOrder);

module.exports = router;
