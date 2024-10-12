import express, { Request, Response, Router } from "express";
import authMiddleware from "../middleware/auth";
import webToons from "../schema/webtoonSchema";
import Comments from "../schema/comments";
import mongoose from "mongoose";

const router: Router = express.Router();

router.get("/popular", authMiddleware, async (req: Request, res: Response) => {
  try {
    const webtoons = await webToons.find();
    if (webtoons) {
      res.status(200).json({ message: webtoons });
      return;
    } else {
      res.status(400).json({ error: "Could not retrieve data" });
      return;
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server error" });
    return;
  }
});

router.get(
  "/custom/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const webToon = await webToons.findById(id);
      if (webToon) {
        res.status(200).json({ message: webToon });
        return;
      } else {
        res.status(400).json({ error: "Could not retrieve data" });
        return;
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  },
);

router.post(
  "/comments/add",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { comment, id } = req.body;
    try {
      const comments = await Comments.create({
        comment,
        webtoonId: id,
      });
      if (comments) {
        res.status(200).json({ message: comments });
        return;
      } else {
        res.status(400).json({ error: "Could not retreive data" });
        return;
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server errro" });
      return;
    }
  },
);

router.get(
  "/comments/get/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const comments = await Comments.find({ webtoonId: id });
      if (comments) {
        res.status(200).json({ message: comments });
        return;
      } else {
        res.status(400).json({ error: "Could not retreive data" });
        return;
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server errro" });
      return;
    }
  },
);

//router.get()

export default router;
