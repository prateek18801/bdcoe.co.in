const Contact = require("../models/contact");
const { sendConformation } = require("../services/confemail");

exports.getRegister = (req, res, next) => {
    res.status(200).send("GET: /register");
}

exports.postRegister = (req, res, next) => {
    res.status(200).send("POST: /register");
}

exports.postContact = async (req, res, next) => {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    try {
        await contact.save();
        res.status(201).redirect("/");
    } catch (err) {
        console.log(err.errors);
        res.status(400).redirect("/contact");
    }
    sendConformation(contact);
}