const express = require("express");
const {
  getUsers,
  getSingleUser,
  fundUser,
  uploadProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  getAllOrders,
  getSingleOrder,
  processOrder,
  confirmOrder,
  cancelOrder,
} = require("../controllers/adminConterollers");
const admin = require("../middlewares/adminMiddleware");
const { upload } = require("../middlewares/fileMiddleware");

const router = express.Router();

router.get("/users", admin, getUsers);
router.get("/user:id", admin, getSingleUser);
router.get("/fund_user", admin, fundUser);
router.get("/upload_product", admin, upload.array("files"), uploadProduct);
router.get("/update_product", admin, updateProduct);
router.get("/delete_product", admin, deleteProduct);
router.get("/products", admin, getAllProducts);
router.get("/product:id", admin, getSingleProduct);
router.get("/orders", admin, getAllOrders);
router.get("/order:id", admin, getSingleOrder);
router.get("/process", admin, processOrder);
router.get("/confirm", admin, confirmOrder);
router.get("/cancel", admin, cancelOrder);
module.exports = router;
