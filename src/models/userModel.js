const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
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
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      max: 11,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// Encrypt password before pushing to database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  if (!password) throw new Error("Password is missing, can not compare");

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (e) {
    console.log("Error while comparing password!", e.message);
  }
};

userSchema.methods.toJSON = function () {
  const userData = this.toObject();

  delete userData.password;
  delete userData.deleted;
  return userData;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
