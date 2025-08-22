const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

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
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = auth;
