import express, { Router, Request, Response } from "express";
import User from "../schema/userSchema";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth";

//This router will be used for authentication i.e. signup and login.
const router: Router = express.Router();

//This endpoint will be used for registering a new user.
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
      return;
    }

    const { username, password, email } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      const existingEmail = await User.findOne({ email });
      if (!existingUser && !existingEmail) {
        //using bcryptjs for storing hashed passwords for more security.
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
          username,
          password: hashedPassword,
          email,
        });
        res.status(201).json({ message: "User created" });
      } else {
        res.status(400).json({ error: "User or Email already exists" });
        return;
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
);

//This endpoint will be used for login with JWT for authentication.

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });
  if (!findUser) {
    res.status(400).json({ error: "User does not exist" });
    return;
  }
  //If user exists sign the user in and send a jwt token
  if (await bcrypt.compare(password, findUser.password as string)) {
    const token = jwt.sign(
      {
        id: findUser._id,
      },
      process.env.JWT_SECRET as string,
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 12 * 60 * 60 * 1000, //12 hours
      })
      .json({
        message: "Logged in",
      });
    return;
  } else {
    res.status(400).json({ error: "User and password do not match" });
    return;
  }
});

// This endpoint is to check if a user is already logged in
router.get("/verify", authMiddleware, (req, res) => {
  res.send("verified");
});

export default router;
