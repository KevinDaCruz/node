import { prisma } from "../../app.js";
import bcrypt from "bcrypt";

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

export const login = (req, res) => {
  res.send("You are login");
};
