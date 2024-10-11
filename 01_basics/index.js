const express = require("express")

const app = express();

app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    return res.render("Home")
})

app.get("/login", (req, res)=>{
    return res.render("Login")
})

app.get("/contact", (req, res)=>{
    return res.render("Contact")
})


app.listen(5000, ()=>{
    console.log("Working")
})