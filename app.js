const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
app.use(express.json());

const products = require("./routes/product");
const home = require("./routes/homej");
const mongoDb = require("./config/config");
const { func } = require("joi");

app.use(
  cors({
    origin: "*", // herkes apiye erişebilir
    methods: ["GET", "POST"],
  })
);

app.use("/", home);
app.use("/api/products", products);






async function connectMongoDb(){
  try{
  await  mongoose.connect(`mongodb+srv://${mongoDb.username}:${mongoDb.password}@cluster0.e0i19.mongodb.net/shopdb?retryWrites=true&w=majority&appName=Cluster0`)
  console.log("Mongo db bağlantısı gerçekleşti")

}catch(err){
    console.log(err)
  }
}

connectMongoDb(); // mongo db baglantı
app.listen(3000, () => {
  
  console.log("Listening on port 3000");
});
