require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSign = (email) => {
    return jwt.sign(email, process.env.SECRET_ACCESS_TOKEN , {expiresIn: '7d'})
}

module.exports = {jwtSign}

