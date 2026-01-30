const mongoose = require("mongoose");

function connectTodb() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected ✅");
    })
    .catch((err) => {
      console.log("DB error ❌", err.message);
    });
}

module.exports = connectTodb;
