import express from 'express';
const router = express.Router();

import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from "../controller/userController.js";
import { createProduct, getAllProducts, getSingleProduct , updateSingleProduct, deleteSingleProduct } from "../controller/productController.js";

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



export { router };
