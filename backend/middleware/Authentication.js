const jwt = require("jsonwebtoken")
const authentication = (req, res,next) => {
  
    if (!req.headers.authorization) {
      res.status(403).json({
        success: false,
        message: " Forbidden",
      });
    } else {
      const token = req.headers.authorization.split(" ").pop();
      jwt.verify(token, process.env.SECRET, (error, result) => {
        if (error) {
          res.status(403).json({
            success: false,
            message: "The token is invalid or expired",
          });
        } else {
          req.token = result
          next()
        }
      });
    }
  };
  
  module.exports = authentication