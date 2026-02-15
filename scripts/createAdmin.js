// import pkg from "@prisma/client";
// const { PrismaClient } = pkg;
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// async function main() {
//   const password = await bcrypt.hash("admin123", 10);

//   await prisma.admin.create({
//     data: {
//       email: "admin@cafe.com",
//       password: "admin123",
//     },
//   });

//   console.log("Admin created successfully");
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());

//=================================================================

// import bcrypt from "bcryptjs";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   const email = "sourabh@cafe.com";
//   const plainPassword = "admin123";

//   const hashedPassword = await bcrypt.hash(plainPassword, 10);

//   await prisma.admin.create({
//     data: {
//       email,
//       password: hashedPassword,
//     },
//   });

//   console.log("Admin created");
// }

// main()
//   .catch(console.error)
//   .finally(() => prisma.$disconnect());


//===============================================================

import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

// 🔥 Load env variables
dotenv.config({ path: ".env.local" }); // or ".env"

// Debug (remove later)
console.log("MONGODB_URI:", process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in env file");
}

// Connect MongoDB
await mongoose.connect(process.env.MONGODB_URI);

// Hash password
const hashedPassword = await bcrypt.hash("admin@2026", 10);

// Create admin
await Admin.create({
  email: "sourabhmehra951@gmail.com",
  password: hashedPassword,
  role: "admin",
});

console.log("✅ Admin created successfully");
process.exit(0);
