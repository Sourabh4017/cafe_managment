import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/Admin";

export async function POST(req) {
  await connectDB();

  // 1. Get admin token
  const token = cookies().get("adminToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 2. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  // 3. Get new admin data
  const { email, password } = await req.json();

  // 4. Check if already exists
  const exists = await Admin.findOne({ email });
  if (exists) {
    return NextResponse.json(
      { message: "Admin already exists" },
      { status: 400 }
    );
  }

  // 5. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 6. Save admin
  await Admin.create({
    email,
    password: hashedPassword,
    role: "admin",
  });

  return NextResponse.json({ success: true });
}
