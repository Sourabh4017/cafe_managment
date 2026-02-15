// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { email, password } = await req.json();

//   const admin = await prisma.admin.findUnique({
//     where: { email },
//   });

//   if (!admin) {
//     return NextResponse.json(
//       { message: "Admin not found" },
//       { status: 401 }
//     );
//   }

//   const isValid = await bcrypt.compare(password, admin.password);

//   if (!isValid) {
//     return NextResponse.json(
//       { message: "Invalid password" },
//       { status: 401 }
//     );
//   }

//   return NextResponse.json({ message: "Login successful" });
// }

//working code below

// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { email, password } = await req.json();

//   const admin = await prisma.admin.findUnique({
//     where: { email },
//   });

//   if (!admin) {
//     return NextResponse.json(
//       { message: "Admin not found" },
//       { status: 401 }
//     );
//   }

//   const isValid = await bcrypt.compare(password, admin.password);

//   if (!isValid) {
//     return NextResponse.json(
//       { message: "Invalid password" },
//       { status: 401 }
//     );
//   }

//   return NextResponse.json({ message: "Login successful" });
// }

//*********** **************** */


// import prisma from "@/lib/prisma";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { email, password } = await req.json();

//   const admin = await prisma.admin.findUnique({ where: { email } });
//   if (!admin) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const match = await bcrypt.compare(password, admin.password);
//   if (!match) {
//     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//   }

//   const token = jwt.sign(
//     { id: admin.id, email: admin.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   const res = NextResponse.json({ message: "Login successful" });
//   res.cookies.set("admin_token", token, {
//     httpOnly: true,
//     path: "/",
//   });

//   return res;
// }

//************************************************************* */
//Fully functional code below __________________-----------------------------

// import prisma from "@/lib/prisma";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { email, password } = await req.json();

//   const admin = await prisma.admin.findUnique({
//     where: { email },
//   });

//   if (!admin) {
//     return NextResponse.json(
//       { message: "Invalid credentials" },
//       { status: 401 }
//     );
//   }

//   const valid = await bcrypt.compare(password, admin.password);

//   if (!valid) {
//     return NextResponse.json(
//       { message: "Invalid password" },
//       { status: 401 }
//     );
//   }

//   const token = jwt.sign(
//     { id: admin.id, email: admin.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   // const res = NextResponse.json({ message: "Login successful" });

// const res = NextResponse.json({
//   message: "Login successful",
//   role: "admin",
// });


//   res.cookies.set("admin_token", token, {
//     httpOnly: true,
//     sameSite: "strict",
//     path: "/",
//   });

//   return res;
// }


// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   const { email, password } = await req.json();

//   // validate admin here...

//   const token = jwt.sign(
//     { email, role: "admin" },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   const res = NextResponse.json({ success: true });

//   res.cookies.set("adminToken", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24,
//   });

//   return res;
// }

//+++++++====================+++++++++++++++++

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   const { email, password } = await req.json();

//   if (email !== process.env.ADMIN_EMAIL) {
//     return NextResponse.json(
//       { message: "Invalid credentials" },
//       { status: 401 }
//     );
//   }

//   const isValid = await bcrypt.compare(
//     password,
//     process.env.ADMIN_PASSWORD_HASH
//   );

//   if (!isValid) {
//     return NextResponse.json(
//       { message: "Invalid credentials" },
//       { status: 401 }
//     );
//   }

//   const token = jwt.sign(
//     { email, role: "admin" },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   const res = NextResponse.json({ success: true });

//   res.cookies.set("adminToken", token, {
//     httpOnly: true,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24,
//   });

//   return res;
// }

//================== Admin register/login working code =====================

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import connectDB from "@/lib/db";
// import Admin from "@/models/Admin";

// export async function POST(req) {
//   await connectDB();

//   const { email, password } = await req.json();

//   const admin = await Admin.findOne({ email });

//   if (!admin) {
//     return NextResponse.json(
//       { message: "Invalid credentials" },
//       { status: 401 }
//     );
//   }

//   const isValid = await bcrypt.compare(password, admin.password);

//   if (!isValid) {
//     return NextResponse.json(
//       { message: "Invalid credentials" },
//       { status: 401 }
//     );
//   }

//   const token = jwt.sign(
//     { id: admin._id, role: "admin" },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );

//   const res = NextResponse.json({ success: true });

//   res.cookies.set("adminToken", token, {
//     httpOnly: true,
//     sameSite: "lax",
//     path: "/",
//     maxAge: 60 * 60 * 24,
//   });

//   return res;
// }

//================== Final working code with mongoose connection =====================

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/Admin";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return NextResponse.json(
      { message: "Admin not found" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const response = NextResponse.json({ success: true });

  response.cookies.set("adminToken", token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}
