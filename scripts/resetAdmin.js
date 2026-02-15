import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

async function reset() {
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.admin.update({
    where: { email: "admin@cafe.com" },
    data: { password: hash },
  });

  console.log("Admin password reset to admin123");
  process.exit();
}

reset();
