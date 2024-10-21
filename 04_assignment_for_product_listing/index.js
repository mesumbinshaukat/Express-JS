// Importing Express
const express = require("express")
const app = express()

// Importing DotEnv
const dotenv = require("dotenv").config()

// Importing Controller
const {homeController, addProductController_GET, addProductController_POST, displayProductsController_GET} = require("./controller/ProductController")

//Importing Middlewares
const {image_handler} = require("./middleware/Image_Handler")

const upload = image_handler()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))  // Sir, if you're reading this, then I used this middleware to get data from form in post request in a JSON format.

app.set("view engine", "ejs")

app.route("/").get(homeController)

app.route("/add-product").get(addProductController_GET).post(upload.single('product_image'), addProductController_POST)

app.route("/display-products").get(displayProductsController_GET)

app.listen(process.env.PORT, () => {
    console.log("WORKING")
})