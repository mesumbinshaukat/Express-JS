// IMPORTING
const express = require("express")
const dotenv = require("dotenv").config()
const {login, loginPost, register, registerPost} = require("./Controller/UserController")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))  

app.set("view engine", "ejs")


app.route("/").get(login).post(loginPost)

app.route("/register").get(register).post(registerPost)


app.listen(process.env.PORT, ()=>{
    console.log("WORKING")
})