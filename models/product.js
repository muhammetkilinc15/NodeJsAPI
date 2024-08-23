const mongoose = require("mongoose"); // mongo db içim
const Joi = require('joi'); // validate içinm


const productSchema = new mongoose.Schema({
  name: String,
  price: Number, // 'number' yerine 'Number'
  description: String,
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: Boolean, // 'bool' yerine 'Boolean'
});

function validateProduct(product) {
  // Joi schema tanımlaması
  const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      price: Joi.number().min(0).required(),
      description: Joi.string().required(),
      imageUrl: Joi.string().required(),
      isActive: Joi.boolean()
  });
  return schema.validate(product);
}


const Product = mongoose.model("Product", productSchema);

module.exports = {Product,validateProduct}
