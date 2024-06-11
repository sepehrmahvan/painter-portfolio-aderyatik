const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { schema } = require("./secure/userValidation");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "نام کاربری الزامی می باشد"],
    trim: true,
    maxlength: [225, "نام و نام خانوادگی نباید بیشتر از 225 کاراکتر باشد"],
    minlength: [3, "نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
    maxlength: [225, "رباره من نباید بیشتر از 225 کاراکتر باشد"],
    minlength: [3, "رباره من نباید کمتر از 3 کاراکتر باشد"],
  },
  logo: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkdine: {
    type: String,
  },
  pintrest: {
    type: String,
  },
  youtube: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
