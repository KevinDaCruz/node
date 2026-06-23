import { prisma } from "../../app.js";

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    res.status(200).json(woods);
  } catch (error) {
    res.status(500).json({
      error: error?.message || "An error occurred while fetching woods",
    });
  }
};

export const readByHardness = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany({
      where: {
        hardness: req.params.hardness,
      },
    });
    res.status(200).json(woods);
  } catch (error) {
    res.status(500).json({
      error:
        error?.message || "An error occurred while fetching woods by hardness",
    });
  }
};
