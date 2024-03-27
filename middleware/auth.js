const localStorage = require("localStorage")
const jwt = require('jsonwebtoken');
const JWT_SECERET = "chiragmirazapur"

const authMiddleware = async (req, res, next) => {
    const authHeader = localStorage.getItem("authToken")
    console.log('auth', authHeader);

    if (authHeader) {
        jwt.verify(authHeader, JWT_SECERET, (err, payload) => {
            if (err) {
                res.render('login', { err: "not authorized" })
            }
            next();
        })
    }
    else {
        res.render('login', { err: "not authorized" })
    }
}
const verifyLoginMiddleware = async (req,res,next) => {
    const authHeader = localStorage.getItem("authToken")
    if (authHeader == null) {
            next();
    }
    else {
        res.redirect('/newprofile')
    }
}

module.exports = { authMiddleware,verifyLoginMiddleware }