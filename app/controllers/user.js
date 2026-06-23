import { prisma } from "../../app.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: passwordHash,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
};

export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error?.message || "An error occurred during login" });
  }
};
