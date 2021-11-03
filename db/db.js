
const mongoose=require("mongoose")
function dbconnection(){
const dotenv = require('dotenv');
dotenv.config();
const db_URL = process.env['DB_URL'];
mongoose.connect(db_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
})
.then(()=>console.log("successfully connected"))
.catch(error=>console.log("connection failed",error))
}
module.exports={dbconnection};