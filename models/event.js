const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name cannot be smaller than 2 characters"],
        validate: [(value) => {
            return /^[a-zA-Z ]*$/.test(value)
        }, "Name can only contain alphabets"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [(value) => {
            return /^[a-zA-z]{2,}20\d{5}\@akgec\.ac\.in$/.test(value)
        }, "Invalid email"]
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
        unique: true,
        validate: [(value) => {
            return /^\d{10}$/.test(value)
        }, "Invalid contact number"]
    },
    stdno: {
        type: Number,
        required: [true, "Student number is required"],
        unique: true,
        validate: [(value) => {
            return /^20\d{5}$/.test(value)
        }, "Invalid student number"]
    },
    branch: {
        type: String,
        required: [true, "Branch is required"],
        enum: {
            values: ["CSE", "AIML", "DS", "CS", "IT", "CSIT", "ECE", "ME", "EN", "CVL"],
            message: "{VALUE} is not supported"
        }
    },
    section: {
        type: Number,
        required: [true, "Section is required"],
        min: [1, "Invalid section"],
        max: [3, "Invalid section"]
    },
    domain: {
        type: String,
        required: [true, "Domain is required"],
        enum: {
            values: ["app", "web", "design"],
            message: "{VALUE} is not suppprted"
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Event", eventSchema);