// Import Express Package
const express = require("express")

// Import DotEnv Package
const dotenv = require("dotenv").config()



// Import Components From Components Folder
const {regGet, regPost} = require("./controller/Controller")

const app = express()

app.use(express.json())

app.set("view engine", "ejs")

app.route("/").get(regGet).post(regPost)

app.listen(process.env.PORT, () => {
    console.log("WORKING");
})
