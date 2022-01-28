const Toggle = require("../models/toggle");
const User = require("../models/users");
const Contact = require("../models/contact");
const Event = require("../models/event");
const { age, generateToken } = require("../utils/token");
// const fs = require("fs");
const path = require("path");
const csvwriter = require("csv-writer");


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
    // let allEmail = [];
    // allRecords.forEach( (cont) => {
    //     allEmail.push(cont.email);
    // });
    // fs.writeFile(path.join(path.dirname(require.main.filename), "data", "email.json"), JSON.stringify(allEmail), err => {
    //     console.log(err);
    // });
    res.status(200).json(allRecords);
}

exports.getContactLog = async (req, res, next) => {
    const allContacts = await Contact.find({});
    res.status(200).json(allContacts);
}

exports.getLogout = (req, res, next) => {
    res.cookie("authjwt", '', { maxAge: 1 }).redirect("/admin");
}

exports.downloadEventLog = async (req, res, next) => {
    const allRecords = await Event.find({});

    const createCsvWriter = csvwriter.createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: path.join(path.dirname(require.main.filename), "data", "event.csv"),
        header: [
            { id: '_id', title: 'ID' },
            { id: 'name', title: 'NAME' },
            { id: 'email', title: 'EMAIL' },
            { id: 'contact', title: 'CONTACT' },
            { id: 'stdno', title: 'STDNO' },
            { id: 'branch', title: 'BRANCH' },
            { id: 'section', title: 'SECTION' },
            { id: 'domain', title: 'DOMAIN' },
            { id: 'date', title: 'DATE' }
        ]
    });
    csvWriter
        .writeRecords(allRecords)
        .then(() => {
            res.download(path.join(path.dirname(require.main.filename), "data", "event.csv"));
        });
}