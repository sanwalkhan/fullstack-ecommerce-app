import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export const createCart = async (req, res) => {
  try {
    const { userId } = req.body;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] , totalCartPrice: 0 });
    } else {
      return res.status(500).json({ message: "User Already exist" });
    }

    await cart.save();
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// addtocart

export const addtocart = async (req, res) => {
  try {
    const { userId, productId, quantity, totalPrice, totalCartPrice } =
      req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(500).json({ message: "User is not available" });
    }

    const existingProduct = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity = quantity;
      existingProduct.totalPrice = totalPrice;
    } else {
      cart.items.push({ productId, quantity, totalPrice });
    }
    cart.totalCartPrice = totalCartPrice;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// cart get

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find();

    if (cart) {
      res.status(200).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// cart cart single

export const getSingleCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findById(id);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // cart update

// export const getCartUpdate = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });

//     if (cart) {
//       res.status(200).json(cart);
//     } else {
//       res.status(404).json({ message: error.message });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// delete cart

export const getCartDelete = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, totalCartPrice } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(400).json({ message: "User's Cart Doesn't exist" });
    }

    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product is not in the Cart" });
    }

    cart.items.splice(productIndex, 1);
    cart.totalCartPrice = totalCartPrice;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
