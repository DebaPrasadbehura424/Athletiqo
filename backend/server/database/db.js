const mongoose = require("mongoose");
function connectDB(req, res) {
  const URI =
    "mongodb+srv://debaprasadbehura89:SrOPEXkCoTHEx1Fc@cluster0.9chhe.mongodb.net/Fityatra?retryWrites=true&w=majority&appName=Cluster0";
  // const URI = "mongodb://localhost:27017/Fityatra";

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
