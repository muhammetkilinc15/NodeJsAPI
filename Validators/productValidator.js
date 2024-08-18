const Joi = require('joi'); // valildasyonlar için kütüphane

function validateProduct(product){
 // Joi schema tanımlaması
    const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    price: Joi.number().min(0).required()
    });
    return schema.validate(product)
}
