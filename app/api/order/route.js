// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { items, total } = await req.json();

//   await prisma.order.create({
//     data: {
//       items,
//       total,
//     },
//   });

//   return NextResponse.json({ message: "Order placed" });
// }

// export async function GET() {
//   const orders = await prisma.order.findMany({
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json(orders);
// }

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// GET all orders (Admin)
// export async function GET() {
//   const orders = await prisma.order.findMany({
//     orderBy: { createdAt: "desc" },
//   });
//   return NextResponse.json(orders);
// }

// // POST new order (Customer)
// export async function POST(req) {
//   const body = await req.json();
//   const { tableNo, items, total } = body;

//   const order = await prisma.order.create({
//     data: {
//       tableNo,
//       items: JSON.stringify(items),
//       total,
//     },
//   });

//   return NextResponse.json(order);
// }

// export async function PUT(req) {
//   const { id, status } = await req.json();

//   const updated = await prisma.order.update({
//     where: { id },
//     data: { status },
//   });

//   return NextResponse.json(updated);
// }



//***************************** */

// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// // GET orders (Admin OR Customer by tableNo)
// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const tableNo = searchParams.get("tableNo");

//   const orders = await prisma.order.findMany({
//     where: tableNo ? { tableNo } : {},
//     orderBy: { createdAt: "desc" },
//   });

//   return NextResponse.json(orders);
// }

// // POST new order
// export async function POST(req) {
//   const { tableNo, items, total } = await req.json();

//   const order = await prisma.order.create({
//     data: {
//       tableNo,
//       items: JSON.stringify(items),
//       total,
//       status: "Pending",
//     },
//   });

//   return NextResponse.json(order);
// }

// // UPDATE order status
// export async function PUT(req) {
//   const { id, status } = await req.json();

//   const updated = await prisma.order.update({
//     where: { id },
//     data: { status },
//   });

//   return NextResponse.json(updated);
// }


import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET (Admin / Customer)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tableNo = searchParams.get("tableNo");

  const orders = await prisma.order.findMany({
    where: tableNo ? { tableNo } : {},
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}

// POST (Customer)
export async function POST(req) {
  const { tableNo, items, total } = await req.json();

  const order = await prisma.order.create({
    data: {
      tableNo,
      items: JSON.stringify(items),
      total,
      status: "Pending",
    },
  });

  return NextResponse.json(order);
}

// PUT (Admin status update)
export async function PUT(req) {
  const { id, status } = await req.json();

  const updated = await prisma.order.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}


// DELETE (Admin)
export async function DELETE(req) {
  const { id } = await req.json();

  await prisma.order.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Order deleted" });
}


// PATCH – Customer cancel order
export async function PATCH(req) {
  const { id } = await req.json();

  const order = await prisma.order.findUnique({ where: { id } });

  if (!order || order.status !== "Pending") {
    return NextResponse.json(
      { error: "Cannot cancel this order" },
      { status: 400 }
    );
  }

  await prisma.order.delete({ where: { id } });

  return NextResponse.json({ message: "Order cancelled" });
}
