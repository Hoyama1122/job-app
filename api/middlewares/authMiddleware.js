import { UnauthenticatedError } from "../error/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError("Authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    if (!roles.includes(req.user.role)) {
      throw new UnauthenticatedError("Unauthorized to access this route");
    }

    next();
  };
};
