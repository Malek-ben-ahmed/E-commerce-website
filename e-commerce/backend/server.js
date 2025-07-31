const express=require("express");
const cors=require("cors");
const app=express();
const mongoose=require("mongoose");
app.use(cors({ origin: 'http://localhost:5173'}));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/e-commerce_accessories_website');
const Products=mongoose.model('Products',{
    id:String,
    category:String,
    name:String,
    image:String,
    description:String,
    price:String,
},'Products'
)
app.get('/Products',async(req,res)=>{
    try{
    const produits=await Products.find() ;
    res.json(produits);
    }catch(error){res.json("erreur dans la récupération des produits")}
})
const port=5000;
app.listen(port,()=>{
    console.log(`i m listening to port: ${port}`)
});
