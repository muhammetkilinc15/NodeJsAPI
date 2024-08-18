const express = require("express")
const app = express();
app.use(express.json())
const Joi = require('joi'); // valildasyonlar için kütüphane



// http nethods : get ,post, put , delete

const products = [
    {id : 1 , name : "Iphone 12",price : 1399 },
    {id : 2 , name : "Samsung A24",price : 899 },
    {id : 3 , name : "Oppo A5",price : 1299 }
]

app.get("/",(req,res)=>{
    res.send(products[0])
})


app.get("/api/products",(req,res)=>{
    res.send(products)
})


app.post("/api/products", (req, res) => {  
    const productId = req.params.id;
    const product = products.find(p=>p.id==productId)
    // Veriyi doğrulama
    const { error }  = validateProduct(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Doğrulama başarılıysa, ürünleri işleme
    const { name, price } = req.body;
    const id = products.length + 1;

    products.push({ id, name, price });

    res.status(201).send(`${name} oluşturuldu`);
});


app.put("/api/products/:id",(req,res)=>{
    const productId = req.params.id;
    const product = products.find(p=>p.id==productId)
    if(product == null){
        return res.status(404).send("Ürün bulunamadı")
    }
   

    // Veriyi doğrulama
    const { error } = validateProduct(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    product.name = req.body.name
    product.price = req.body.price
    return res.send(product.id+ " sahip ürün  güncellendi")


})


app.get("/api/products/:id",(req,res)=>{
    const productId = req.params.id;
    const product = products.find(p=>p.id==productId)
    if(product == null)
    {
        res.status(404).send("aradığınız ürün bulunamadı")
    }

    res.send(product);
})

function validateProduct(product){
 // Joi schema tanımlaması
    const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    price: Joi.number().min(0).required()
    });
    return schema.validate(product)
}


app.listen(3000,()=>{
    console.log("Listening on port 3000")
});