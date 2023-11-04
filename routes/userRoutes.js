import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';


import { createUser, deleteUser, forgotPassword, getAllUser, getSingleUser, updatePassword, updateUser, userLogin, userRegister } from "../controller/usercontroller.js"
import { createProduct, getAllProducts, getSingleProduct , updateSingleProduct, deleteSingleProduct } from "../controller/productController.js";
import { addtocart, createCart, getCart, getCartDelete, getSingleCart } from '../controller/cartController.js';
// import createOrder from '../controller/orderController';

// middleware
const middleware = (req, res, next) => {
    console.log("Middleware called");
        const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
        if (err) {
            return res.status(402).json({ message: err.message });
        }
        console.log("User authenticated successfully");
        next();
    });
};



// USER CRUD

router.post("/user", createUser);
router.get("/user",middleware, getAllUser);
router.get("/user/:id", getSingleUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// product CRUD

router.post("/product", createProduct); 
router.get("/product", getAllProducts); 
router.get("/product/:id" , getSingleProduct);
router.put("/product/:id" , updateSingleProduct);
router.delete("/product/:id" , deleteSingleProduct);

// Cart Crud

router.post("/cart", createCart)
router.post("/addtocart" , addtocart)
router.get("/cart", getCart)
router.get("/cart/:id" , getSingleCart)
// router.put("/cart/:id", getCartUpdate)
router.delete("/cart/:productId" , getCartDelete)


// Register / Login 

router.post("/user-register" , userRegister)
router.post("/user-login",userLogin)
router.post("/user-forgot", forgotPassword)
router.post("/userupdate-password" , updatePassword)

// Order CRUD

// router.post("/userorder", createOrder);






export { router };
