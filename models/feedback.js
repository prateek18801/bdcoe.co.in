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
        required: [true, "Student number is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    },
    domain: {
        type: String,
        enum: {
            values: ["app", "web", "fig", "psd", "all"],
            message: "{VALUE} is not suppprted"
        },
        default: "all"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);