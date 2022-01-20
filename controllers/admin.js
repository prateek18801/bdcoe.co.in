const Toggle = require("../models/toggle");
const User = require("../models/users");
const Contact = require("../models/contact");
const Event = require("../models/event");
const { age, generateToken } = require("../utils/token");

exports.getLogin = (req, res, next) => {
    res.status(200).render("admin/login", {
        pageTitle: "BDCoE | Admin",
        usernameError: false,
        passwordError: false
    });
}

exports.postLogin = (req, res, next) => {
    const { username, password } = req.body;
    if (!User.authenticateUsername(username, password)) return res.status(401).redirect("/admin");
    const id = User.getId(username);
    const token = generateToken(id);
    res.cookie("authjwt", token, { httpOnly: true, maxAge: age * 1000 }).status(200).redirect(`/admin/panelwC448WgVJxvyx9tsA8rN5nQ67dRU1F3G/${id}`);
}

exports.getPanel = (req, res, next) => {
    Toggle.getStatus((obj) => {
        res.status(200).render("admin/panel", {
            pageTitle: "BDCoE | Admin",
            userId: req.params.userid,
            state: obj
        });
    });
}

exports.getRegistrationStatus = (req, res, next) => {
    Toggle.getStatus(state => {
        res.status(200).send(state);
    });
}

exports.postToggle = (req, res, next) => {
    if (!User.authenticateId(req.body.userId, req.body.password)) {
        res.status(403).send("unauthorized");
    } else {
        Toggle.toggleRegistration(state => {
            res.status(200).send(state);
        });
    }
}

exports.getEventLog = async (req, res, next) => {
    const allRecords = await Event.find({});
    res.status(200).json(allRecords);
}

exports.getContactLog = async (req, res, next) => {
    const allContacts = await Contact.find({});
    res.status(200).json(allContacts);
}

exports.getLogout = (req, res, next) => {
    res.cookie("authjwt", '', { maxAge: 1 }).redirect("/admin");
}