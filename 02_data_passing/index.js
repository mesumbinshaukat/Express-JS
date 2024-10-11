const express = require("express")

const app = express()

app.set("view engine", "ejs")

const product = [
    {
        id: "1",
        product: "TV",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCu6sgUeTmYLu3WRulbqAr6u4Tqz3UObpe8A&s"
    },
    {
        id: "2",
        product: "Mobile",
        image: "https://images.samsung.com/is/image/samsung/p6pim/pk/sm-s928bztcpkd/gallery/pk-galaxy-s24-s928-489293-sm-s928bztcpkd-thumb-539796755"
    },
    {
        id: "3",
        product: "Laptop",
        image: "https://intaglaptops.com/cdn/shop/products/HPLaptop15s-fr2006TU-Corei311thGenerationintaglogo2_800x.jpg?v=1666626538"
    }
]

app.get("/", (req, res)=>{
    return res.render("Home", {product})
})




app.listen(5000, ()=>{
    console.log("Working")
})