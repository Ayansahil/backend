// import dotenv from 'dotenv'
// dotenv.config()
require("dotenv").config();
const app = require("./src/app");
const connectTodb=require("./src/config/databse")


connectTodb();



app.listen(3000, () => {
  console.log("Server day7 is running on port 3000✅");
});
