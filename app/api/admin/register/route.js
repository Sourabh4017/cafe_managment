import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password required" },
      { status: 400 }
    );
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { message: "Admin already exists" },
      { status: 409 }
    );
  }

  // ✅ bcrypt hashing (FIXES YOUR ISSUE)
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    email,
    password: hashedPassword,
  });

  return NextResponse.json({
    success: true,
    message: "Admin registered successfully",
  });
}
