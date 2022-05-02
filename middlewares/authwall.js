const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.authjwt;
    if(!token)  return res.status(401).redirect("/admin");
    jwt.verify(token, process.env.JWT_SECRET, (err)=>{
        if(err){
            return res.status(403).redirect("/admin");
        }else{
            next();
        }
    });
}