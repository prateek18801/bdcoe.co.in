const Toggle = require("../models/toggle");
const User = require("../models/users");
const Contact = require("../models/contact");
const Registration = require("../models/registration");
const Participant = require("../models/participant");
const Feedback = require("../models/feedback");
const { age, generateToken } = require("../utils/token");
// const { sendInvite } = require("../services/confemail");
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
    res.cookie("authjwt", token, { httpOnly: true, maxAge: age * 1000 }).status(200).redirect(`/admin/panel/${id}`);
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

exports.getRegistrationStatus = (req, res) => {
    Toggle.getStatus(state => {
        res.status(200).send(state);
    });
}

exports.postToggle = (req, res) => {
    if (!User.authenticateId(req.body.userId, req.body.password)) {
        res.status(403).send("unauthorized");
    } else {
        Toggle.toggleRegistration(state => {
            res.status(200).send(state);
        });
    }
}

exports.getEventLog = async (req, res, next) => {
    const allRecords = await Registration.find({});
    res.status(200).json(allRecords);
    // let allEmail = [];
    // allRecords.forEach( (cont) => {
    //     allEmail.push(cont.email);
    // });
    // fs.writeFile(path.join(path.dirname(require.main.filename), "data", "email.json"), JSON.stringify(allEmail), err => {
    //     console.log(err);
    // });
}

exports.getContactLog = async (req, res, next) => {
    const allContacts = await Contact.find({});
    res.status(200).json(allContacts);
}

exports.getLogout = (req, res, next) => {
    res.cookie("authjwt", '', { maxAge: 1 }).redirect("/admin");
}

exports.downloadEventLog = async (req, res, next) => {
    const allRecords = await Registration.find({}).sort({ year: 1 });
    let csvArr = [];
    let newRecord = {};
    allRecords.forEach(record => {
        newRecord = {
            teamname: record.teamname,
            year: record.year,
            hackerrank: record.hackerrank,
            timestamp: record.timestamp,
            leadername: record.leader.name,
            leaderstdno: record.leader.stdno,
            leaderemail: record.leader.email,
            leaderbranch: record.leader.branch,
            leadersection: record.leader.section,
            leaderhostel: record.leader.hostel,
            membername: record.member.name,
            memberstdno: record.member.stdno,
            memberemail: record.member.email,
            memberbranch: record.member.branch,
            membersection: record.member.section,
            memberhostel: record.member.hostel,
        };
        csvArr = [...csvArr, newRecord];
    });
    const createCsvWriter = csvwriter.createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: path.join(path.dirname(require.main.filename), "data", "codemaze-registrations.csv"),
        header: [
            { id: 'teamname', title: 'TEAM NAME' },
            { id: 'year', title: 'YEAR' },
            { id: 'hackerrank', title: 'HACKERRANK USERNAME' },
            { id: 'leadername', title: 'MEMBER1 NAME' },
            { id: 'leaderstdno', title: 'MEMBER1 Std.No.' },
            { id: 'leaderemail', title: 'MEMBER1 EMAIL' },
            { id: 'leaderbranch', title: 'MEMBER1 BRANCH' },
            { id: 'leadersection', title: 'MEMBER1 SECTION' },
            { id: 'leaderhostel', title: 'MEMBER1 HOSTELLER' },
            { id: 'membername', title: 'MEMBER2 NAME' },
            { id: 'memberstdno', title: 'MEMBER2 Std.No.' },
            { id: 'memberemail', title: 'MEMBER2 EMAIL' },
            { id: 'memberbranch', title: 'MEMBER2 BRANCH' },
            { id: 'membersection', title: 'MEMBER2 SECTION' },
            { id: 'memberhostel', title: 'MEMBER2 HOSTELLER' },
            { id: 'timestamp', title: 'DATE' }
        ]
    });
    await csvWriter.writeRecords(csvArr);
    return res.download(path.join(path.dirname(require.main.filename), "data", "codemaze-registrations.csv"));
}

exports.downloadFeedbackLog = async (req, res) => {
    const allRecords = await Feedback.find({});

    const createCsvWriter = csvwriter.createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: path.join(path.dirname(require.main.filename), "data", "codemaze-feedback.csv"),
        header: [
            { id: 'teamname', title: 'TEAM NAME' },
            { id: 'rating', title: 'RATING' },
            { id: 'message', title: 'MESSAGE' },
            { id: 'timestamp', title: 'DATE' }
        ]
    });
    await csvWriter.writeRecords(allRecords);
    return res.download(path.join(path.dirname(require.main.filename), "data", "codemaze-feedback.csv"));
}

exports.downloadParticipantLog = async (req, res) => {
    const allRecords = await Participant.find({}).sort({ year: 1 });

    const createCsvWriter = csvwriter.createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: path.join(path.dirname(require.main.filename), "data", "codemaze-participants.csv"),
        header: [
            { id: 'name', title: 'NAME' },
            { id: 'year', title: 'YEAR' },
            { id: 'stdno', title: 'STDNO' },
            { id: 'email', title: 'EMAIL' },
            { id: 'branch', title: 'BRANCH' },
            { id: 'section', title: 'SECTION' },
            { id: 'hostel', title: 'HOSTELLER' },
            { id: 'timestamp', title: 'DATE' }
        ]
    });
    await csvWriter.writeRecords(allRecords);
    return res.download(path.join(path.dirname(require.main.filename), "data", "codemaze-participants.csv"));
}

// exports.getSendInvite = (req, res, next) => {
//     const allRecords = await Event.find({});
//     allRecords.forEach(record => {
//         setTimeout(() => {
//             const name = record.name;
//             const email = record.email;
//             sendInvite({ name: name, email: email });
//         }, 100);
//     });
//     res.send("started mailing");
// }