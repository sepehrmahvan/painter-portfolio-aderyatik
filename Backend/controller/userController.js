const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.handleLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Username or password Is Wrong" });
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) {
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: 300 }
      );
      res
        .status(200)
        .setHeader("Authorization", token)
        .json({
          token,
          userId: user._id.toString(),
          message: `Welcome back ${user.email}`,
        });
    } else {
      res.status(401).json({ message: "Username or password Is Wrong" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) {
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
