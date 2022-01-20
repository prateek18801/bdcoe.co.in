const Contact = require("../models/contact");
const Event = require("../models/event");
const { sendContactConformation, sendEventConformation } = require("../services/confemail");

exports.getRegister = (req, res, next) => {
    res.status(200).render("user/register", {
        pageTitle: "event name"
    });
}

exports.postRegister = (req, res, next) => {
    res.status(200).send("POST: /register");
}

exports.postEvent = async (req, res, next) => {
    const { name, email, contact, stdno, branch, section, domain } = req.body;
    const eventRegistration = new Event({ name, email, contact, stdno, branch, section, domain });
    try{
        const saved = await eventRegistration.save();
        sendEventConformation({name, email});
        res.status(201).send(saved)
    }catch(err){
        res.status(400).send("Already registered");
    }
}

exports.postContact = async (req, res, next) => {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    try {
        await contact.save();
        sendContactConformation(contact);
        res.status(201).redirect('/');
    } catch (err) {
        res.status(400).send("/contact");
    }
}