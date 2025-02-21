const mongoose = require("mongoose");
function connectDB(req, res) {
  const URI = "mongodb://127.0.0.1:27017/Fityatra";
  mongoose
    .connect(URI)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(err);
      console.log("oops there are some erros");
    });
}

module.exports = connectDB;
