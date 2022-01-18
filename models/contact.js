const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
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
        validate: [(value) => {
            return /^[a-zA-Z0-9]{1,100}\@[a-zA-Z]{2,50}\.[a-zA-Z.]{2,5}$/.test(value)
        }, "Email not valid"]
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        minlength: [10, "Message cannot be smaller than 10 characters"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Contact", contactSchema);