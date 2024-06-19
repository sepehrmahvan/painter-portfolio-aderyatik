const jwt = require("jsonwebtoken");

exports.authenticated = (req, res, next) => {
  const token = req.get("Authorization");
  try {
    if (!token) {
      const error = new Error("مجوز کافی ندارید");
      error.statusCode = 401;
      throw error;
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken, "decodedToken");
    if (!decodedToken) {
      const error = new Error("شما مجوز کافی ندارید");
      error.statusCode = 401;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};