// @method : GET
// URL: http://localhost:500

const bcrypt = require("bcryptjs")
const { json } = require("express")
const jwt = require("jsonwebtoken")

const regGet = (req, res) => {
    return res.render("Registration")
}


// @method : POST
// URL: http://localhost:500
const regPost = async (req, res) => {
    try {
        const {username, password, email} = req.body

        const checkUsername = username ?? null
        const checkPassword = password ?? null
        const checkEmail = email ?? null

        const hashedPassword = await bcrypt.hash(password, 10)

        if(checkEmail && checkPassword && checkUsername){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const nameRegex = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/;

            const validateEmail = emailRegex.test(checkEmail) ? "<h1>Valid Email</h1>" : "<h1>Invalid Email</h1>"
            const validateName = nameRegex.test(checkUsername) ? "<h1>Valid Name</h1>" : "<h1>Invalid Name</h1>"
            const validatePassword = checkPassword.length > 5 ? "<h1>Valid Password</h1>" : "<h1>Invalid Password Length (Less Than 5 Character)</h1>"

            const userData = {
                username: username,
                email: email,
                password:hashedPassword
            }

            const send_data = await fetch(process.env.API, 
                {
                    headers: {
                        "Content-Type":"application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(userData)
                }
            ).then(()=>{
                console.log("User Data Inserted")
            }).catch((e)=>{
                console.log("User Data Can't Be Inserted. Error:", e)
            })

            return res.status(200).send({"Email": validateEmail, "Name": validateName, "Password": validatePassword})
            

        }else {
            const {username, password, email} = req.body
            console.log(username)
            console.log(password)
            console.log(email)
            return res.send("<h1>Fill All The Input Fields</h1>")
        }


    } catch (error) {
        return res.send(`<h1>Error At: Post Request ${error}</h1>`)
    }
   
}

// @method: GET
// URL: http://localhost:500/login
const logPost = async (req, res) => {
    try {
        const {email, password} = req.body

        const checkEmail = email ?? null
        const checkPassword = password ?? null

        const getAPI = await fetch(process.env.API)

        const dataToJson = await getAPI.json()

        if(checkEmail == null) {
            return res.status(404).send("Invalid Email")
        }

        const fetchUser = dataToJson.filter((user) => user.email === checkEmail)

        if (fetchUser.length == 0 || fetchUser == null){
            return res.status(404).send("Invalid Credentials")
        }

        if(checkPassword == null){
            return res.status(404).send("Empty Password")
        }

      
        const validatePassword = bcrypt.compare(checkPassword, fetchUser[0].password)

        if(validatePassword == false) {
            return res.status(404).send("Invalid Password")
        }

        const authenticateUserData = fetchUser[0];
        const Secret_Key = process.env.TOKEN_SECRET_KEY;
    
        const Token = jwt.sign(authenticateUserData, Secret_Key, { expiresIn: "1hr" })
    
        return res.status(302).send({ "loginUser": Token, "message": "Login Successful" })

    } catch (e) {
        console.error("Error:", e); 
        return res.send("<h1>Error At: GET Request</h1>");
    }
}

module.exports = {regGet, regPost, logPost}
