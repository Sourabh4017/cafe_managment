import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function verifyAdmin() {
  const token = cookies().get("adminToken")?.value;
  if (!token) throw new Error("Unauthorized");
  return jwt.verify(token, process.env.JWT_SECRET);
}
