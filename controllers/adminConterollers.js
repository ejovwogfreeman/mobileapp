const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

/////////////////////////////
////////GET ALL USERS////////
/////////////////////////////
const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

/////////////////////////////
////////GET SINGLE USER//////
/////////////////////////////
const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.find(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

///////////////////////////////////
/////////////FUND USER/////////////
///////////////////////////////////

const fundUser = async (req, res) => {
  const { id, amount } = req.body;

  const user = await User.findById(id);

  const bal = Number(user.balance) + Number(amount);

  await User.findByIdAndUpdate(id, {
    balance: Number(bal),
  });
  res.status(200).json({ message: "Funded Successfully" });
};

/////////////////////////////
////////UPLOAD PRODUCT///////
/////////////////////////////
const uploadProduct = async (req, res) => {
  const { ProductName, description, price, category } = req.body;
  try {
    let productImageArray = [];

    if (req.files && req.files.length > 0) {
      productImageArray = req.files.map((element) => {
        return {
          fileName: element.originalname,
          fileType: element.mimetype,
          link: `file/${element.filename}`,
        };
      });
    }

    const newProduct = await Product.create({
      ProductName,
      description,
      price,
      category,
      productImage: productImageArray,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
////////UPDATE PRODUCT///////
/////////////////////////////
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { productName, description, price, category } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.productName = productName;
    product.description = description;
    product.price = price;
    product.category = category;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
////////UPDATE PRODUCT///////
/////////////////////////////
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
////////GET ALL PRODUCTS/////
/////////////////////////////
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findById();

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
////////GET SINGLE PRODUCTS/////
/////////////////////////////
const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.find(productId);

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
////////GET ALL ORDERS///////
/////////////////////////////
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
////////GET SINGLE ORDER/////
/////////////////////////////
const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  try {
    const product = await Order.find(orderId);

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////////
//////////PROCESS ORDER//////////
/////////////////////////////////
const processOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "serving";
    await order.save();

    res.status(200).json({ message: "Order processed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////////
//////////CONFIRM ORDER//////////
/////////////////////////////////
const confirmOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "served";
    await order.save();

    res.status(200).json({ message: "Order confrimed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////////
//////////CONFIRM ORDER//////////
/////////////////////////////////
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
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
};
