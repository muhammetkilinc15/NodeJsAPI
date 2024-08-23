const express = require("express");
const router = express.Router();


const {Product,validateProduct} = require("../models/product");

router.delete("/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id == productId);
  if (!product) {
    return res.status(404).send("Aradağınız ürün yok");
  }
  const index = products.indexOf(product);
  products.splice(index, 1);
  return res.send(product);
});

router.get("/", async (req, res) => {
  // const products = await Product.find();
  // const products = await Product.find({isActive:true}).limit(1).select({name:1,price:1});
  const products = await Product.find({price : {$lte : 2000, $gte:1400}})
  res.send(products);
});

router.post("/", async (req, res) => {
  // Veriyi doğrulama
  const { error } = validateProduct(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const p = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    isActive: req.body.isActive,
  });

  try {
    const result = await p.save();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong.");
  }
});

router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id == productId);
  if (product == null) {
    return res.status(404).send("Ürün bulunamadı");
  }

  // Veriyi doğrulama
  const { error } = productValidater.validateProduct(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  product.name = req.body.name;
  product.price = req.body.price;
  return res.send(product.id + " sahip ürün  güncellendi");
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({_id : productId})
  if (product == null) {
    res.status(404).send("aradığınız ürün bulunamadı");
  }

  res.send(product);
});

module.exports = router;
