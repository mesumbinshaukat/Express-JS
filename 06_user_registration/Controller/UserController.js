// METHOD: GET
// URL: http://localhost:5000

const login = (req, res) => {
    return res.render("Login")
}


// METHOD: POST
// URL: http://localhost:5000
const loginPost = async (req, res) => {

}

// Method: GET
// URL: http://localhost:5000/register
const register = (req, res) => {
    res.render("Registration")
}

// METHOD: POST
// URL: http://localhost:5000/register
const registerPost = (req, res) => {
    try {
       const {user_name, user_email, user_password, user_image} = req.body

       console.table([user_name, user_email, user_password, user_image])

        console.log(user_name)
        console.log(user_email)
        console.log(user_password)
        console.log(user_image)

       res.status(203).redirect("/")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = {login, loginPost, register, registerPost}
