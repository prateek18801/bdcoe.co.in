const jwt = require("jsonwebtoken");
const age = +process.env.TOKEN_AGE;
exports.age = age;

exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: age });
}