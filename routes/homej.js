const express = require("express");
const router = express.Router();

const products = [
    { id: 1, name: "Iphone 12", price: 1399 },
    { id: 2, name: "Samsung A24", price: 899 },
    { id: 3, name: "Oppo A5", price: 1299 },
  ];
  


router.get("/", (req, res) => {
    res.send(products[0]);
  });
  
module.exports = router;