const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("آدرس ایمیل یا کلمه عبور اشتباه است");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      res.status(200).json({ user });
    } else {
      res.status(400).send("آدرس ایمیل یا کلمه عبور اشتباه است");
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { username, email } = req.body;
  try {
    const user = await User.findOne();
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) {
      user.username = username;
      user.email = email;
      await user.save();
    }
    res.status(201).json({ message: "User changes Successfuly" });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json("Server Error");
  }
};

exports.handleResetPassword = async (req, res, next) => {

  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findOne();
  const { password } = user;
  const isEqual = await bcrypt.compare(oldPassword, password);

  try {
    if (!isEqual) {
      return res.status(400).send("Passwords Dont Match");
    } else if (newPassword !== confirmPassword) {
      return res.status(400).send("In Correct Confirmed Password");
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password Updated" });
  } catch (err) {
    next(err);
  }
};

