

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import prisma from "@/lib/prisma";

// /* ================= UPDATE STATUS ================= */
// export async function PATCH(req, context) {
//   try {
//     const { id } = await context.params;

//     const token = req.cookies.get("admin_token")?.value;
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     jwt.verify(token, process.env.JWT_SECRET);

//     const { status } = await req.json();

//     const updated = await prisma.order.update({
//       where: { id: Number(id) },
//       data: { status },
//     });

//     return NextResponse.json(updated);
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Update failed", error: err.message },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req, context) {
//   try {
//     // ✅ FIX: await params
//     const { id } = await context.params;

//     const token = req.cookies.get("admin_token")?.value;
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     jwt.verify(token, process.env.JWT_SECRET);

//     const order = await prisma.order.findUnique({
//       where: { id: Number(id) },
//     });

//     if (!order) {
//       return NextResponse.json({ message: "Order not found" }, { status: 404 });
//     }

//     // ✅ RULE: ONLY PENDING CAN BE DELETED
//     if (order.status !== "Pending") {
//       return NextResponse.json(
//         { message: "Only pending orders can be deleted" },
//         { status: 403 }
//       );
//     }

//     await prisma.order.delete({
//       where: { id: Number(id) },
//     });

//     return NextResponse.json({ message: "Order deleted successfully" });
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Delete failed", error: err.message },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* ================= UPDATE ORDER STATUS ================= */
export async function PATCH(req, { params }) {
  try {
    const { id } = await params; // ✅ FIX for Next 14
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: { status },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("PATCH order error:", error);
    return NextResponse.json(
      { message: "Failed to update order" },
      { status: 500 }
    );
  }
}

/* ================= DELETE ORDER (PENDING ONLY) ================= */
export async function DELETE(req, { params }) {
  try {
    const { id } = await params; // ✅ FIX for Next 14

    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status !== "Pending") {
      return NextResponse.json(
        { message: "Only pending orders can be deleted" },
        { status: 403 }
      );
    }

    await prisma.order.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Order deleted" });
  } catch (error) {
    console.error("DELETE order error:", error);
    return NextResponse.json(
      { message: "Failed to delete order" },
      { status: 500 }
    );
  }
}
