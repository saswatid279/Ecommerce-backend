const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
var cors = require('cors')

const app = express();
app.use(bodyParser.json())
app.use(cors());

const productrouter = require("./route/product.route.js")
const cartrouter = require("./route/cart.route.js")
const wishlistrouter = require("./route/wishlist.route.js")
const userrouter = require("./route/user.route.js")

const {dbconnection}=require("./db/db.js")

dbconnection()


app.use("/product",productrouter)
app.use("/cart",cartrouter)
app.use("/wishlist",wishlistrouter)
app.use("/user",userrouter)

app.get('/', (req, res) => {
  res.json({text:'Hello world'})
});

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check"})
})

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message})
})
app.listen(3000, () => {
  console.log('server started');
});