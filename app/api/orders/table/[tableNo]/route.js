// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(req, { params }) {
//   try {
//     const tableNo = params.tableNo;

//     if (!tableNo) {
//       return NextResponse.json(
//         { message: "Table number required" },
//         { status: 400 }
//       );
//     }

//     const orders = await prisma.order.findMany({
//       where: {
//         tableNo: tableNo,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(orders); // ✅ ALWAYS JSON
//   } catch (err) {
//     return NextResponse.json(
//       { message: "Failed to fetch orders", error: err.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, context) {
  try {
    // ✅ params MUST be awaited
    const params = await context.params;
    const tableNo = params.tableNo;

    if (!tableNo) {
      return NextResponse.json(
        { message: "Table number required" },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        tableNo: tableNo,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders); // ✅ ALWAYS JSON
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch orders", error: err.message },
      { status: 500 }
    );
  }
}
