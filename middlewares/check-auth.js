const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "279ce3cf-d8c4-42cc-acac-748050925925");
    req.FetchedBrandAccountData = { email: decodedToken.email, BrandAccountId: decodedToken.BrandAccountId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};