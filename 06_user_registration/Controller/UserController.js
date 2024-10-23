const { default: axios } = require("axios")
const bcryptjs = require("bcryptjs")

// METHOD: GET
// URL: http://localhost:5000

const login = (req, res) => {
    return res.render("Login", { user: null, error: null });
}

// Handle POST request for login
const loginPost = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;

        const user_emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/;

        if (!user_emailRegex.test(user_email)) {
            return res.render("Login", { user: null, error: "Invalid Email" });
        }

        if (!user_password) {
            return res.render("Login", { user: null, error: "Password is required" });
        }

        // Fetch users from the API
        const response = await axios.get(process.env.API);
        const users = response.data;

        // Find user by email
        const user = users.find((u) => u.email === user_email);
        if (!user) {
            return res.render("Login", { user: null, error: "User not found" });
        }

        // Check if password matches
        const isMatch = await bcryptjs.compare(user_password, user.password);
        if (!isMatch) {
            return res.render("Login", { user: null, error: "Invalid Password" });
        }

        // If everything matches, render the user data
        return res.render("Login", { user: user, error: null });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};


// Method: GET
// URL: http://localhost:5000/register
const register = (req, res) => {
    res.render("Registration")
}

// METHOD: POST
// URL: http://localhost:5000/register
const registerPost = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).send("Image upload failed. Please try again!")
        }

       const {user_name, user_email, user_password} = req.body

        const user_emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/
;

       if(!user_name){
           return res.status(400).send("Name is required")
       }

       if(!user_emailRegex.test(user_email)){
           return res.status(400).send("Invalid Email")
       }

       if(!user_password){
           return res.status(400).send("Password is required")
       }

       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(user_password, salt)

       const user_hashed_password = hashedPassword
       const user_image = req.file.originalname
       const user_image_path = req.file.path       

    //    console.log(req.file)
       console.table([user_name, user_email, user_hashed_password, user_image])

    //     console.log(user_name)
    //     console.log(user_email)
    //     console.log(user_hashed_password)
    //     console.log(user_image)

       const userData = {
           username: user_name,
           email: user_email,
           password: user_hashed_password,
           image_name: user_image,
           image_path: user_image_path
       }

        await axios.post(process.env.API, userData)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            console.log("Registration Successful")
        })

       res.status(203).redirect("/")
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = {login, loginPost, register, registerPost}
