const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String },
    skills: [{ type: String }],
    github: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
