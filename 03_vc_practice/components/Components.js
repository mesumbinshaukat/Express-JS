// @method : GET

const regGet = (req, res) => {
    return res.render("Registration")
}


// @method : POST
const regPost = (req, res) => {
    try {
        const {username, password, email} = req.body

        const checkUsername = username ?? null
        const checkPassword = password ?? null
        const checkEmail = username ?? null

        if(checkEmail && checkPassword && checkUsername){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const nameRegex = /^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/;

            const validateEmail = emailRegex.test(checkEmail) ? "<h1>Valid Email</h1>" : "<h1>Invalid Email</h1>"
            const validateName = nameRegex.test(checkUsername) ? "<h1>Valid Name</h1>" : "<h1>Invalid Name</h1>"
            const validatePassword = checkPassword.length > 5 ? "<h1>Valid Password" : "<h1>Invalid Password</h1>"

            return res.send({"Email": validateEmail, "Name": validateName, "Password": validatePassword})
            

        }else {
            return res.send("<h1>Fill All The Input Fields")
        }


    } catch (error) {
        return res.send("<h1>Error At: Post Request</h1>")
    }
   
}

module.exports = {regGet, regPost}