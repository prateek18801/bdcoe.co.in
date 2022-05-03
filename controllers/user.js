const axios = require("axios").default;
const Contact = require("../models/contact");
const Participant = require("../models/participant");
const Registration = require("../models/registration");
const Feedback = require("../models/feedback");
const { sendContactConformation, sendEventConformation } = require("../services/confemail");


// 01/05/2022 codemaze registrations

exports.getRegister = async (req, res) => {

    const firstYrRegCount = await Registration.countDocuments({ year: 1 });
    const secondYrRegCount = await Registration.countDocuments({ year: 2 });
    const firstYrStatus = (firstYrRegCount < 90) ? true : false;
    const secondYrStatus = (secondYrRegCount < 90) ? true : false;

    res.status(200).render("user/register", {
        pageTitle: "CODEMAZE",
        firstYrStatus,
        secondYrStatus
    });
    // res.status(300).redirect("/snz4Um9AKSkiAzq3c7IuRI0qdex3qTkZ");
}

exports.postRegister = async (req, res) => {
    const response_key = req.body["g-recaptcha-response"];
    if (!response_key) {
        return res.status(400).json({
            message: "Navigate back and complete captcha",
            error: "Captch Error"
        });
    }
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${response_key}`;

    const body = req.body;
    Object.keys(body).forEach(key => body[key] = body[key].trim());

    // console.log(req.body);
    const leader = new Participant({
        name: body.leadname,
        stdno: body.leadstdno,
        email: body.leademail,
        branch: body.leadbranch,
        section: body.leadsection,
        year: body.year,
        hostel: body.leadhostel
    });

    const member = new Participant({
        name: body.memname,
        stdno: body.memstdno,
        email: body.mememail,
        branch: body.membranch,
        section: body.memsection,
        year: body.year,
        hostel: body.memhostel
    });

    const registration = new Registration({
        teamname: body.teamname,
        year: body.year,
        hackerrank: body.hackerrank,
        leader,
        member
    });

    try {
        const response = await axios.post(url);
        if (!response.data.success) {
            return rea.status(400).json({
                message: "captcha error",
                error: "you are a robot"
            });
        }

        if (await Participant.findOne({ stdno: body.leadstdno }) || await Participant.findOne({ stdno: body.memstdno })) {
            return res.status(400).render("error/fail", {
                pageTitle: "Registration Failed",
                message: "Already Registered"
            });
        }

        await registration.save();
        await leader.save();
        await member.save();

        sendEventConformation({ name: body.leadname, email: body.leademail });
        return res.status(201).render("user/success", {
            pageTitle: "Registration Successful"
        });


    } catch (err) {
        console.log(err);
        res.status(400).render("error/fail", {
            pageTitle: "Registration Failed",
            message: "Bad Request"
        });
    }
}

exports.getTeamAvailability = async (req, res) => {
    const teamname = req.query.t;
    try {
        const exist = await Registration.findOne({ teamname });
        if (exist) {
            return res.status(200).json({
                message: "Not Available",
                available: false
            });
        }
        return res.status(200).json({
            message: "Available",
            available: true
        });
    } catch (err) {
        return res.status(400).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

exports.getFeedback = (req, res, next) => {

}

exports.postFeedback = async (req, res) => {
    const { teamname, rating, message } = req.body;
    message = message.trim();
    teamname = teamname.trim();
    const feedback = new Feedback({ teamname, rating, message });
    try {
        await feedback.save();
        return res.status(200).render("user/feedbackSuccess", {
            pageTitle: "Recorded"
        });
    } catch (err) {
        return res.status(400).json({
            message: "bad request",
            error: err.message
        });
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
        res.status(400).redirect("/contact");
    }
}