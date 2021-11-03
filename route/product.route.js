const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const {extend}=require("lodash");
const {Product} = require("../model/product.model.js")

router.route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({products})
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
    }

  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const NewProduct = new Product(product);
      const savedProduct = await NewProduct.save();
      res.json({ success: true, product: savedProduct })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message })
    }
  })

  router.param("productId",async(req,res,next,productId) =>{
try{ 
   const product = await Product.findById(productId);
  if(!product){
    return res.status(400).json({success:false,message:"cannot find data"})
  }
  req.product = product;
  next()
  }
  catch{
    res.status(400).json({success:false,message:"cannot retrive data"})
  }
})

router.route("/:productId")
.get((req,res) => {
  try{
  let { product } = req
  product.__v = undefined
  res.json({product})
  }
  catch{
    res.json({success:false,message:"unable to fetch products"})
  }
})
.post(async(req,res) => {
  try{
  let { product } = req;
  const updateproduct=req.body;
  product=extend(product,updateproduct)
  product.updated=Date.now();
  product= await product.save();
  res.json({ success: true, product })
  }
  catch{
     res.status(400).json({success:false,message:"unable to update the product"})
  }
})

.delete(async(req,res) => {
  try{
  let {product}=req;
  await product.remove()
  product.deleted=true;
  res.json({success: true , product})
  }
  catch{
    res.json({success: false , message:"unable to delete"})
  }
})


 
module.exports = router