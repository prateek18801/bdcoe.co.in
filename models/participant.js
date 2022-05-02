const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        match: [/^[a-zA-Z ]*$/, "invalid name"]
    },
    stdno: {
        type: String,
        required: [true, "student number is required"],
        match: [/^[\dx]{7,8}[-dD]{0,2}$/, "invalid email id"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        match: [/^\w+[\dx]{7,8}[-dD]{0,2}@akgec\.ac\.in$/, "invalid email id"],
        unique: true
    },
    branch: {
        type: String,
        required: [true, "branch is required"],
        enum: {
            values: ["CSE", "AIML", "DS", "CS", "IT", "CSIT", "ECE", "ME", "EN", "CVL"],
            message: "{VALUE} is not supported"
        }
    },
    section: {
        type: Number,
        required: [true, "section is required"],
        min: [1, "invalid section"],
        max: [19, "invalid section"]
    },
    year: {
        type: Number,
        required: [true, "year is required"],
        min: [1, "invalid year"],
        max: [2, "invalid year"]
    },
    hostel: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Participant", participantSchema);