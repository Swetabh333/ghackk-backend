import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token; // Get token from cookies
  if (!token) {
    // If no token is present, user is not logged in
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    next(); // User is logged in, proceed to the next middleware or route handler
  } catch (err) {
    // If token verification fails, return unauthorized error
    res.status(401).json({ error: "Invalid or expired token" });
    return;
  }
};

export default authMiddleware;
