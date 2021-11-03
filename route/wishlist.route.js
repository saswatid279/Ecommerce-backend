const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const {extend}=require("lodash");
const {Wishlist} = require("../model/wishlist.model.js")

 router.route("/")
  .get(async (req, res) => {
    try {
      const products = await Wishlist.find({});
      res.json({success:true,products})
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get products in the cart", errorMessage: err.message })
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const NewProduct = new Wishlist(product);
      const savedProduct = await NewProduct.save();
      res.json({ success: true, product: savedProduct })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message })
    }
  })

router.param("productId",async(req,res,next,productId) =>{
try{ 
   const product = await Wishlist.findById(productId);
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
  let { product } = req
  product.__v = undefined
  res.json({product})
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
  catch(err){
    res.json({ success: false, message:err.message })
  }
})

.delete(async(req,res) => {
  try{
  let {product}=req;
  await product.remove()
  product.deleted=true;
  res.json({success: true , product})
  }
  catch(err){
     res.json({success: false , message:err.message})
  }
})

module.exports = router