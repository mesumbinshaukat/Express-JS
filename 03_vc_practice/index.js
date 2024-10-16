// Import Express Package
const express = require("express")

// Import DotEnv Package
const dotenv = require("dotenv").config()

// Import Controller From Controller Folder
const {regGet, regPost, logPost} = require("./controller/Controller")

const app = express()

app.use(express.json())

app.set("view engine", "ejs")

app.route("/").get(regGet).post(regPost)

app.route("/login").post(logPost)

app.listen(process.env.PORT, () => {
    console.log("WORKING");
})
