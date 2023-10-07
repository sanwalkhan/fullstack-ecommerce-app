import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export const createCart = async (req, res) => {
  //   console.log("Hello start");
  try {
    const { productId, quantity, userId } = req.body;

    if (!quantity ) {
      return res.status(400).json({ message: "All Fields Are mandatory" });
    }

    //   console.log("Hello mid");

    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(400).json({ message: "User or Product not found" });
    }

    const newCart = new Cart({ productId: Product._id , quantity, userId: User._id });

    await newCart.save();

    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

export const getSingleCart = async(req, res)=>{
    try{
        const {id} = req.params;

        const cart = await Cart.findById(id)

        if(cart){
            res.status(200).json(cart)
        }
        else {
          res.status(404).json({ message: error.message });
        }
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// cart update


export const getCartUpdate = async(req, res)=>{
  try{
      const {id} = req.params;

      const cart = await Cart.findByIdAndUpdate(id , req.body, {new:true})

      if(cart){
          res.status(200).json(cart)
      }
      else {
        res.status(404).json({ message: error.message });
      }
      
  }catch(error){
      res.status(500).json({message: error.message})
  }
}

// delete cart


export const getCartDelete = async(req, res)=>{
  try{
      const {id} = req.params;

      const cart = await Cart.findByIdAndDelete(id)

      if(cart){
          res.status(200).json({ message: `Deleted ${cart.productId}` })
      }
      else {
        res.status(404).json({message:`${cart.productId} is not defined`});
      }
      
  }catch(error){
      res.status(500).json({message: error.message})
  }
}
