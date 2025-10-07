const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_ERROR_CODE } = require("../errors");

const auth = (req, res, next) => {
  const publicRoutes = [
    { method: "POST", path: "/signin" },
    { method: "POST", path: "/signup" },
    { method: "GET", path: "/items" },
  ];

  const isPublic = publicRoutes.some(
    (route) => route.method === req.method && route.path === req.path
  );

  if (isPublic) {
    return next();
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .json({ message: "Unauthorized: No token provided" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = auth;
