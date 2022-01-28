const Contact = require("../models/contact");
const Event = require("../models/event");
const Feedback = require("../models/feedback");
const { sendContactConformation, sendEventConformation } = require("../services/confemail");

exports.getRegister = (req, res, next) => {
    // res.status(200).render("user/register", {
    //     pageTitle: "Tech Knockdown"
    // });
    res.status(300).redirect("/snz4Um9AKSkiAzq3c7IuRI0qdex3qTkZ");
}

exports.getFeedback = (req, res, next) => {
    res.status(200).render("user/feedback", {
        pageTitle: "Feedback"
    });
}

exports.postRegister = (req, res, next) => {
    res.status(200).send("POST: /register");
}

exports.postFeedback = async (req, res, next) => {
    const { name, stdno, email, message } = req.body;
    const date = new Date();
    let domain = "all";

    if(date.getDate() === 29){
        if(date.getHours() >= 11 && date.getHours() <= 15){
            domain = "app";
        }else{
            domain = "web";
        }
    }else{
        if(date.getHours() >= 11 && date.getHours() <= 13){
            domain = "fig";
        }else{
            domain = "psd";
        }
    }

    const eventFeedback = new Feedback({ name, stdno, email, message, domain });
    try {
        let existing = await Event.findOne({ email: email }).exec();
        if(!existing){
            existing = await Event.findOne({ stdno: stdno}).exec();
        }
        if(existing){
            await eventFeedback.save();
            return res.status(201).render("user/feedbackSuccess", {
                pageTitle: "Feedback"
            });
        }
        res.status(300).redirect("/q8CLbbym1GRf27Ngh685vHWqtZyVYwbi")
    } catch (err) {
        res.status(400).send("<h2>Err: could not submit</h2>");
    }
}

exports.postEvent = async (req, res, next) => {
    const { name, email, contact, stdno, branch, section, domain } = req.body;
    const eventRegistration = new Event({ name, email, contact, stdno, branch, section, domain });
    try {
        await eventRegistration.save();
        sendEventConformation({ name, email });
        res.status(201).render("user/success", {
            pageTitle: "Registration Successful"
        });
    } catch (err) {
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