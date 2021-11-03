const mongoose = require("mongoose");
require('mongoose-type-url');
const CartSchema = new mongoose.Schema({
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
  quantity:{
    type:Number,
    required:"Cannot enter a product without quantity"
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
  const Cart = mongoose.model("cart",CartSchema)
module.exports = {Cart}