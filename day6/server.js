/* 
 - server ko start krna
 - database se connect krna
*/

const app = require("./src/app");
const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect("")
    .then(() => {
      console.log("MongoDB connected ✅");
    })
    .catch((err) => {
      console.log("DB error ❌",err);
    });
}
connectToDb();


app.listen(3000, () => {
  console.log("Server is running on port 3000✅");
});
