import express, { Router, Request, Response } from "express";
import User from "../schema/userSchema";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";

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

router.post("/login", async (req: Request, res: Response) => {});

export default router;
