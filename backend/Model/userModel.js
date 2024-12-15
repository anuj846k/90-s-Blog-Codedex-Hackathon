const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "please tell us your first name"],
    trim: true,
    maxlength: 20,
  },
  lastname: {
    type: String,
    required: [true, "please tell us your last name"],
    trim: true,
    maxlength: 20,
  },
  username: {
    type: String,
    required: [true, "please tell us your username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please tell us your password"],
    minlength: 8,
    // select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("Users", userSchema);

module.exports = { User };