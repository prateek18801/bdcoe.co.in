const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: [true, "teamname is required"],
        unique: true
    },
    rating: {
        type: Number,
        required: [true, "rating is required"],
        min: [1, "min 1"],
        max: [5, "max 5"]
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);