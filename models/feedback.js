const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name cannot be smaller than 2 characters"],
        validate: [(value) => {
            return /^[a-zA-Z ]*$/.test(value)
        }, "Name can only contain alphabets"]
    },
    stdno: {
        type: String,
        required: [true, "Student number is required"],
        validate: [(value) => {
            return /^2[01]{1}\d{5}(?:-[dD]{1}){0,1}$/.test(value)
        }, "Invalid student number"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [(value) => {
            return /^[a-zA-Z]{0,}2[01]{1}\d{5}(?:-[dD]{1}){0,1}@akgec\.ac\.in$/.test(value)
        }, "Invalid email"]
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        validate: [(value) => {
            return /^(?:\b\w+\b[\s\r\n]*){5,}$/.test(value)
        }, "Message cannot be < 5 words"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);