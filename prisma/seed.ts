import { prisma } from "../app.js";

async function main() {
  await prisma.user.upsert({
    where: { email: "john.doe@example.com" },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    },
  });

  const woods = [
    { name: "Épicéa", type: "softwood", hardness: "tender" },
    { name: "Pin", type: "softwood", hardness: "medium_hard" },
    { name: "Padouk", type: "exotic_wood", hardness: "hard" },
    { name: "Érable", type: "noble_and_hardwoods", hardness: "medium_hard" },
    { name: "Hêtre", type: "noble_and_hardwoods", hardness: "medium_hard" },
    { name: "Itauba", type: "exotic_wood", hardness: "hard" },
    { name: "Douglas", type: "softwood", hardness: "tender" },
  ];

  for (const wood of woods) {
    await prisma.wood.upsert({
      where: { name: wood.name },
      update: {},
      create: wood,
    });
  }

  console.log("Seed terminé !");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());