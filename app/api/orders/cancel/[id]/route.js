import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req, context) {
  try {
    const { id } = await context.params;

    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // ✅ RULE: ONLY PENDING CAN BE CANCELLED
    if (order.status !== "Pending") {
      return NextResponse.json(
        { message: "Order cannot be cancelled now" },
        { status: 403 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { status: "Cancelled" },
    });

    return NextResponse.json(updatedOrder);
  } catch (err) {
    return NextResponse.json(
      { message: "Cancel failed", error: err.message },
      { status: 500 }
    );
  }
}
