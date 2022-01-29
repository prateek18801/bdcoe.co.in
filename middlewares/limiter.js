const rateLimit = require("express-rate-limit");

const contactLimiter = rateLimit({
    windowMs: 86400000,
    max: 3,
    message: "Blocked temporarily: too many requests"
});

const eventLimiter = rateLimit({
    windowMs: 86400000,
    max: 3,
    message: "Blocked temporarily: too many requests" 
});

const feedbackLimiter = rateLimit({
    windowMs: 70000,
    max: 10,
    message: "Blocked temporarily: too many requests" 
});

module.exports = { contactLimiter, eventLimiter, feedbackLimiter };