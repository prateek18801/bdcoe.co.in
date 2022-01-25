const Toggle = require("../models/toggle");

exports.ifRegistrationOpen = (req, res, next) => {
    Toggle.getStatus(toggle => {
        if(!toggle.status)  return res.redirect("/snz4Um9AKSkiAzq3c7IuRI0qdex3qTkZ");
        next();
    });
}