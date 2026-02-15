// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// // import Menu from "@/models/Menu";
// import Menu from "../../../../models/Menu";


// /* ---------------- UPDATE MENU ITEM ---------------- */
// export async function PUT(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;
//     const body = await req.json();

//     const updatedItem = await Menu.findByIdAndUpdate(
//       id,
//       {
//         name: body.name,
//         price: body.price,
//         image: body.image || "",
//       },
//       { new: true }
//     );

//     if (!updatedItem) {
//       return NextResponse.json(
//         { message: "Menu item not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedItem);
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Update failed", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// /* ---------------- DELETE MENU ITEM ---------------- */
// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();

//     const { id } = params;

//     const deletedItem = await Menu.findByIdAndDelete(id);

//     if (!deletedItem) {
//       return NextResponse.json(
//         { message: "Menu item not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: "Menu item deleted successfully" });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Delete failed", error: error.message },
//       { status: 500 }
//     );
//   }
// }

//*********************************************** */

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Menu from "@/models/Menu";

// /* ---------------- UPDATE MENU ITEM ---------------- */
// export async function PUT(req, context) {
//   try {
//     await connectDB();

//     const { id } = await context.params;   // ✅ FIX

//     const body = await req.json();
//     const { name, price, image } = body;

//     const updatedItem = await Menu.findByIdAndUpdate(
//       id,
//       { name, price, image },
//       { new: true }
//     );

//     if (!updatedItem) {
//       return NextResponse.json(
//         { message: "Item not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedItem);
//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message },
//       { status: 500 }
//     );
//   }
// }

// /* ---------------- DELETE MENU ITEM ---------------- */
// export async function DELETE(req, context) {
//   try {
//     await connectDB();

//     const { id } = await context.params;   // ✅ FIX

//     const deletedItem = await Menu.findByIdAndDelete(id);

//     if (!deletedItem) {
//       return NextResponse.json(
//         { message: "Item not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Menu item deleted successfully" }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: error.message },
//       { status: 500 }
//     );
//   }
// }

//*********************************************** working mongoos*/

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Menu from "@/models/Menu";

// export async function PUT(req, { params }) {
//   await connectDB();
//   const id = params.id;   // ✅ correct

//   const data = await req.json();

//   const updated = await Menu.findByIdAndUpdate(
//     id,
//     { name: data.name, price: data.price, image: data.image },
//     { new: true }
//   );

//   return NextResponse.json(updated);
// }

// export async function DELETE(req, { params }) {
//   await connectDB();
//   const id = params.id;   // ✅ correct

//   await Menu.findByIdAndDelete(id);

//   return NextResponse.json({ success: true });
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Menu from "@/models/Menu";

/* UPDATE */
export async function PUT(req, { params }) {
  await connectDB();

  const { id } = await params; // ✅ FIX
  const body = await req.json();

  const updated = await Menu.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  return NextResponse.json(updated);
}

/* DELETE */
export async function DELETE(req, context) {
  await connectDB();

  const params = await context.params;   // ✅ FIX
  const { id } = params;

  await Menu.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
