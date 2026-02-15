// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import jwt from "jsonwebtoken";

// export async function GET(req) {
//   try {
//     const token = req.cookies.get("admin_token")?.value;
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     jwt.verify(token, process.env.JWT_SECRET);

//     const orders = await prisma.order.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(orders);
//   } catch (err) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }
// }


// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import prisma from "@/lib/prisma";

// export async function PATCH(req, { params }) {
//   try {
//     const token = req.cookies.get("admin_token")?.value;
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     jwt.verify(token, process.env.JWT_SECRET);

//     const { status } = await req.json();

//     const updatedOrder = await prisma.order.update({
//       where: { id: params.id },
//       data: { status },
//     });

//     return NextResponse.json(updatedOrder);
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Update failed", error: err.message },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     const orders = await prisma.order.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(orders); // ✅ ALWAYS JSON
//   } catch (err) {
//     return NextResponse.json([], { status: 500 }); // ✅ JSON even on error
//   }
// }

// /* ================= DELETE ORDER ================= */
// export async function DELETE(req, { params }) {
//   try {
//     const token = req.cookies.get("admin_token")?.value;
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     jwt.verify(token, process.env.JWT_SECRET);

//     const order = await prisma.order.findUnique({
//       where: { id: params.id },
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
//       where: { id: params.id },
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

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
