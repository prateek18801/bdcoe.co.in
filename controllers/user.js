const Contact = require("../models/contact");
const Event = require("../models/event");
const { sendContactConformation, sendEventConformation } = require("../services/confemail");

exports.getRegister = (req, res, next) => {
    res.status(200).render("user/register", {
        pageTitle: "Tech Knockdown"
    });
}

exports.postRegister = (req, res, next) => {
    res.status(200).send("POST: /register");
}

exports.postEvent = async (req, res, next) => {
    const { name, email, contact, stdno, branch, section, domain } = req.body;
    const eventRegistration = new Event({ name, email, contact, stdno, branch, section, domain });
    try{
        await eventRegistration.save();
        sendEventConformation({name, email});
        res.status(201).render("user/success", {
            pageTitle: "Registration Successful"
        });
    }catch(err){
        res.redirect("/q8CLbbym1GRf27Ngh685vHWqtZyVYwbi");
    }
}

exports.postContact = async (req, res, next) => {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    try {
        await contact.save();
        sendContactConformation(contact);
        return res.status(201).redirect('/');
    } catch (err) {
        console.log(err);
        res.status(400).redirect("/contact");
    }
}