const mongoose = require("mongoose");
require('mongoose-type-url');
const WishlistSchema = new mongoose.Schema({
  name : {
    type:String,
    required:"Cannot enter a product without a name"
  } ,
  info : {
    type:String,
    required:"Cannot enter a product without a name"
  } ,
  price : {
    type:Number,
    required:"Cannot enter a product without price"
  },
  url:{
    type:mongoose.SchemaTypes.Url,
    required:"Cannot enter a product without URL"
  },
  fastdelivery:{
   type :Boolean
  },
  instock:{
   type:Boolean
  }},
  { timestamps:true
  })
  const Wishlist = mongoose.model("wishlist",WishlistSchema)
module.exports = {Wishlist}