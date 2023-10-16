const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const sendEmail = require("../middlewares/emailMiddleware");
const accessToken = require("../middlewares/accessTokenMiddleware");

/////////////////////////////
//////GET A SINGLE USER//////
/////////////////////////////
const getUser = async (req, res) => {
  let user = await User.findById(req.user._id);
  const { ...others } = user._doc;
  res.send({
    ...others,
    token: accessToken(user),
  });
};

/////////////////////////////
//////////UPDATE USER////////
/////////////////////////////
const updateUser = async (req, res) => {
  const userId = req.user._id;

  const updateFields = {};

  if (req.files && req.files.length > 0) {
    const filesArray = req.files.map((element) => {
      return {
        fileName: element.originalname,
        fileType: element.mimetype,
        link: `file/${element.filename}`,
      };
    });

    updateFields.profileImage = filesArray;
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(userId);
    const email = user.email;
    console.log(email);
    await sendEmail(email, "Profile Updated Successfully", "html/update.html");

    res.status(200).json({ message: "Profile Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
///////CHANGE PASSWORD///////
/////////////////////////////

const changePassword = async (req, res) => {
  const { oldPassword, password } = req.body;

  if (password && oldPassword) {
    const user = await User.findById(req.user._id);
    const oldhashedPassword = user.password;
    const comparedPassword = await bcrypt.compare(
      oldPassword,
      oldhashedPassword
    );
    if (user && comparedPassword === true) {
      if (oldPassword === password) {
        return res
          .status(400)
          .send({ message: "Old password cannot be thesame as new password" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(req.user._id, { password: hashedpassword });

      const user = await User.findById(req.user._id);

      const email = user.email;

      await sendEmail(
        email,
        "Password Changed Successfully",
        "html/change_password.html"
      );

      res.status(200).json({ message: "Password Changed Successfully" });
    } else {
      res.status(400).json({ message: "Old Password is not correct" });
    }
  }
};

//////////////////////////////
////////FORGOT PASSWORD///////
//////////////////////////////

const forgotPasword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    await sendEmail(email, "Password Reset", "html/reset.html");
    res.status(200).json({ message: "An email has been sent to you" });
  } else {
    res.status(400).json({
      message: "We could not find an account with that email",
    });
  }
};

/////////////////////////////
////////RESET PASSWORD///////
/////////////////////////////

const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const oldhashedPassword = user.password;
  const comparedPassword = await bcrypt.compare(password, oldhashedPassword);

  if (comparedPassword === true) {
    return res
      .status(400)
      .send({ message: "Old password cannot be thesame as new password" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedUser = await User.findByIdAndUpdate(user._id, {
    password: hashedPassword,
  });

  if (!updatedUser) {
    return res.status(500).json({ message: "Password update failed" });
  }

  await sendEmail(
    email,
    "Password Reset Successful",
    "html/reset_password_successful.html"
  );

  return res.status(200).json({ message: "Password reset is successful" });
};

/////////////////////////////
/////////ADD TO CART/////////
/////////////////////////////
const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const isProductInCart = cart.items.some(
      (item) => item.product.toString() === productId
    );

    if (isProductInCart) {
      return res
        .status(400)
        .json({ message: "Product already exists in the cart" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    cart.items.push({ product: productId, quantity: 1 });

    await cart.save();

    res.status(201).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/////////////////////////////
//////REMOVE FROM CART///////
/////////////////////////////
const removeFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

///////////////////////////////////////
//////INCREASE CART ITEM QUANTITY//////
///////////////////////////////////////
const increaseCartItemQuantity = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    cartItem.quantity += 1;

    await cart.save();

    res.status(200).json({ message: "Cart item quantity increased", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

///////////////////////////////////////
//////DECREASE CART ITEM QUANTITY//////
///////////////////////////////////////
const decreaseCartItemQuantity = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    }

    await cart.save();

    res.status(200).json({ message: "Cart item quantity decreased", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

////////////////////////
//////CLEAR CART////////
////////////////////////
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//////////////////////////
//////CREATE ORDER////////
//////////////////////////
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const order = new Order({
      user: userId,
      items: cart.items,
      total: cart.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

////////////////////////
//////CANCEL ORDER//////
////////////////////////
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Order cannot be canceled" });
    }

    order.status = "Canceled";

    await order.save();

    res.status(200).json({ message: "Order canceled successfully", order });
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
    const loggedInUserId = req.user.id;
    const orders = await Order.find({ user: loggedInUserId });
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
    const loggedInUserId = req.user.id;
    const order = await Order.findOne({ _id: orderId, user: loggedInUserId });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
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
};
