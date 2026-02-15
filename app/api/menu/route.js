// import  prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

// function verifyAdmin() {
//   const token = cookies().get("admin_token")?.value;
//   if (!token) throw new Error("Unauthorized");
//   jwt.verify(token, process.env.JWT_SECRET);
// }

// router.post("/add", upload.single("image"), async (req, res) => {
//   try {
//     const { name, price } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "Image required" });
//     }

//     const imagePath = `/uploads/${req.file.filename}`;

//     const menu = await prisma.menu.create({
//       data: {
//         name,
//         price: Number(price),
//         image: imagePath,
//       },
//     });

//     res.json(menu);
//   } catch (err) {
//     res.status(500).json({ message: "Upload failed" });
//   }
// });



// export async function GET() {
//   const menu = await prisma.menuItem.findMany({
//     orderBy: { id: "desc" },
//   });
//   return NextResponse.json(menu);
// }

// // export async function POST(req) {
// //   const { name, price, image } = await req.json();

// //   await prisma.menuItem.create({
// //     data: {
// //       name,
// //       price: Number(price),
// //       image,
// //     },
// //   });

// //   return NextResponse.json({ message: "Item added" });
// // }


// //working code below

// export async function POST(req) {
//   try {
//     verifyAdmin();

//     const { name, price, image } = await req.json();

//     const item = await prisma.menuItem.create({
//       data: { name, price: Number(price), image },
//     });

//     return NextResponse.json(item);
//   } catch {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
// }

//***************************Worked    */


// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// /* GET all menu items */
// export async function GET() {
//   try {
//     const menu = await prisma.menuItem.findMany({
//       orderBy: { id: "desc" },
//     });
//     return NextResponse.json(menu);
//   } catch (err) {
//     return NextResponse.json([], { status: 500 });
//   }
// }

// /* ADD menu item (image URL optional) */
// export async function POST(req) {
//   try {
//     const { name, price, image } = await req.json();

//     if (!name || !price) {
//       return NextResponse.json(
//         { error: "Name and price are required" },
//         { status: 400 }
//       );
//     }

//     const item = await prisma.menuItem.create({
//       data: {
//         name,
//         price: Number(price),
//         image: image || "", // ✅ optional
//       },
//     });

//     return NextResponse.json(item);
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to add menu item" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Menu from "@/models/Menu";

// export async function GET() {
//   await connectDB();
//   const menu = await Menu.find().sort({ createdAt: -1 });
//   return NextResponse.json(menu);
// }

// export async function POST(req) {
//   await connectDB();
//   const body = await req.json();

//   const item = await Menu.create({
//     name: body.name,
//     price: body.price,
//     image: body.image || "",
//   });

//   return NextResponse.json(item);
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Menu from "@/models/Menu";

/* GET ALL MENU */
export async function GET() {
  await connectDB();
  const menu = await Menu.find().sort({ createdAt: -1 });
  return NextResponse.json(menu);
}

/* ADD MENU ITEM */
export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const item = await Menu.create({
    name: body.name,
    price: body.price,
    category: body.category || "General",
    image: ""
  });

  return NextResponse.json(item, { status: 201 });
}
