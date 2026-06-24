import { prisma } from "../../app.js";

export const readAll = async (req, res) => {
  try {
    const woods = await prisma.wood.findMany();
    const woodsWithLinks = woods.map((wood) => {
      const baseUrl = `${req.protocol}://${req.get("host")}/api/woods/${wood.id}`;
      return {
        ...wood,
        links: [
          { rel: "self", method: "GET", href: baseUrl },
          {
            rel: "sameHardness",
            method: "GET",
            href: `${req.protocol}://${req.get("host")}/api/woods/${wood.hardness}`,
          },
        ],
      };
    });
    res.status(200).json(woodsWithLinks);
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
    const woodsWithLinks = woods.map((wood) => {
      const baseUrl = `${req.protocol}://${req.get("host")}/api/woods/${wood.id}`;
      return {
        ...wood,
        links: [
          { rel: "self", method: "GET", href: baseUrl },
          {
            rel: "sameHardness",
            method: "GET",
            href: `${req.protocol}://${req.get("host")}/api/woods/${wood.hardness}`,
          },
        ],
      };
    });
    res.status(200).json(woodsWithLinks);
  } catch (error) {
    res.status(500).json({
      error:
        error?.message || "An error occurred while fetching woods by hardness",
    });
  }
};

export const create = async (req, res) => {
  try {
    let pathname;
    if (req.file) {
      pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const data = req.body.datas ? JSON.parse(req.body.datas) : req.body;

    const wood = await prisma.wood.create({
      data: {
        ...data,
        ...(pathname ? { image: pathname } : {}),
      },
    });

    const baseUrl = `${req.protocol}://${req.get("host")}/api/woods/${wood.id}`;
    res.status(201).json({
      ...wood,
      links: [
        { rel: "self", method: "GET", href: baseUrl },
        {
          rel: "sameHardness",
          method: "GET",
          href: `${req.protocol}://${req.get("host")}/api/woods/${wood.hardness}`,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      error: error?.message || "An error occurred while creating wood",
    });
  }
};
