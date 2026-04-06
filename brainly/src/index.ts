import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { UserMiddleware } from "./middleware.js";
import { signupSchema } from "./validations/user.js";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import bcrypt from "bcrypt";
import { JWT_PASSWORD, PORT } from "./config.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.post("/api/v1/signup", async (req, res) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid inputs",
      errors: result.error.issues,
    });
  }

  const { username, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    res.json({
      message: "User signed up",
    });
  } catch (e) {
    res.status(409).json({
      message: "User already exists",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid inputs",
      errors: result.error.issues,
    });
  }

  const { username, password } = result.data;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(403).json({ message: "incorrect credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(403).json({ message: "incorrect credentials" });
  }

  const token = jwt.sign({ id: user._id }, JWT_PASSWORD, {
    expiresIn: "1h",
  });
  res.json({
    token,
  });
});

app.post("/api/v1/content", UserMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title;
  if (!link || !type || !title) {
  return res.status(400).json({ message: "Missing fields" });
}
  try {
    await ContentModel.create({
      link,
      type,
      title,
      //@ts-ignore
      userId: req.userId,
      tags: [],
    });
    return res.json({
      message: "Content added",
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/api/v1/content", UserMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  try{const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username");
  res.json({
    content,
  });
}
catch(e){res.status(500).json({message:"Something went wrong"})}
});

app.delete("/api/v1/content/:id", UserMiddleware, async (req, res) => {
  const contentId = req.params.id;
  await ContentModel.deleteOne({
    _id: contentId,
    //@ts-ignore
    userId: req.userId,
  });
  return res.json({
    message: "Content deleted",
  });
});

app.post("/api/v1/brain/share", UserMiddleware, async (req, res) => {
  const share = req.body.share;
  //@ts-ignore
  const userId = req.userId;
  if (share) {
    let existingLink = await LinkModel.findOne({ userId });
    if (existingLink) {
      await UserModel.updateOne(
        { _id: userId },
        {
          share: true,
        },
      );
      return res.json({
        link: `/api/v1/brain/${existingLink.hash}`,
      });
    }

    const hash = uuidv4();

    await LinkModel.create({
      userId: userId,
      hash: hash,
    });

    await UserModel.updateOne(
      { _id: userId },
      {
        share: true,
      },
    );

    return res.json({
      link: `/api/v1/brain/${hash}`,
    });
  } else {
    await UserModel.updateOne(
      { _id: userId },
      {
        share: false,
      },
    );

    await LinkModel.deleteOne({ userId });

    return res.json({
      message: "Sharing disabled",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const shareLink = req.params.shareLink;

  try {
    const link = await LinkModel.findOne({
      hash: shareLink,
    });

    if (!link) {
      return res.status(404).json({
        message: "Invalid link",
      });
    }

    const user = await UserModel.findById(link.userId);

    if (!user || !user.share) {
      return res.status(404).json({
        message: "Sharing disabled",
      });
    }

    const content = await ContentModel.find({
      userId: user._id,
    });

    const formattedContent = content.map((items) => ({
      id: items._id,
      type: items.type,
      link: items.link,
      title: items.title,
      tags: items.tags,
    }));

    res.json({
      username: user.username,
      content: formattedContent,
    });
  } catch (e) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.listen(PORT);
