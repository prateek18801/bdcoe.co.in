const Toggle = require("../models/toggle");

exports.ifRegistrationOpen = (req, res, next) => {
    Toggle.getStatus(toggle => {
        if(!toggle.status)  return res.status(200).send("registrations closed");
        next();
    });
}