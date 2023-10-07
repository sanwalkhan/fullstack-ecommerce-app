import express from 'express';
const router = express.Router();

import { createUser, deleteUser, getAllUser, getSingleUser, updateUser, userLogin, userRegister } from "../controller/usercontroller.js"
import { createProduct, getAllProducts, getSingleProduct , updateSingleProduct, deleteSingleProduct } from "../controller/productController.js";
import { createCart, getCart, getCartDelete, getCartUpdate, getSingleCart } from '../controller/cartController.js';

// USER CRUD

router.post("/user", createUser);
router.get("/user", getAllUser);
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
router.get("/cart", getCart)
router.get("/cart/:id" , getSingleCart)
router.put("/cart/:id", getCartUpdate)
router.delete("/cart/:id" , getCartDelete)

router.post("/user-register" , userRegister)
router.post("/user-login",userLogin)

export { router };
