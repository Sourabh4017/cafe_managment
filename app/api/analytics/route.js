import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    // Total orders
    const totalOrders = await prisma.order.count();

    // Total sales (exclude cancelled)
    const totalSales = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { not: "Cancelled" } },
    });

    // Orders by status
    const statusCounts = await prisma.order.groupBy({
      by: ["status"],
      _count: true,
    });

    // Today orders
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayOrders = await prisma.order.count({
      where: {
        createdAt: { gte: todayStart },
      },
    });

    return NextResponse.json({
      totalOrders,
      totalSales: totalSales._sum.totalAmount || 0,
      statusCounts,
      todayOrders,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Analytics error", error: err.message },
      { status: 500 }
    );
  }
}
