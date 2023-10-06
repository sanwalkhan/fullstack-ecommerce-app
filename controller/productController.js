import Product from '../models/productModel.js';

// creating a product


export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;

    if (!title || !description || !price || !category || !image) {
      return res.status(400).json({ message: "All Fields Are Mandatory" });
    }


    const newProduct = new Product({
      title,
      description,
      price,
      category,
      image
    });

    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};


// getting all products

export const getAllProducts =async (req, res)=>{
  try{
    const product = await Product.find()
    if(product){
      res.status(200).json(product)
    }
  }catch(error){
    res.status(500).json({message: error.message})
  }
}


// get single record

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    // console.log("before single product call");
    const product = await Product.findById(id); 
    // console.log("product", product);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ message: "Product not found! Internal error" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update single product

export const updateSingleProduct = async(req, res)=>{
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true})
    if(product){
      res.status(200).json(product)
    }
  }catch(error){
    res.status(500).json({message: error.message})
  }
}


// delate product

export const deleteSingleProduct = async(req,res)=>{
  try{
    const {id} = req.params;
  const product = await Product.findByIdAndDelete(id)
  if(product){
    res.status(200).json({message:`Deleted ${product.title}`})
  }
  }catch(error){
    res.status(500).json({message: error.message})
  }
}