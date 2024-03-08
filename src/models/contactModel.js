const mongoose = require("mongoose");


const contactSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: [true, "A user must have an email"],
    },
    enquiry: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;
