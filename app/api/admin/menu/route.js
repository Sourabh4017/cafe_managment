// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import upload from "@/lib/multer";
// import { promisify } from "util";

// const uploadSingle = promisify(upload.single("image"));

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     const name = formData.get("name");
//     const price = Number(formData.get("price"));
//     const file = formData.get("image");

//     if (!name || !price || !file) {
//       return NextResponse.json(
//         { message: "All fields required" },
//         { status: 400 }
//       );
//     }

//     // Convert File → Buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "")}`;
//     const filePath = `public/uploads/${fileName}`;

//     await fs.writeFile(filePath, buffer);

//     const menu = await prisma.menuItem.create({
//       data: {
//         name,
//         price,
//         image: `/uploads/${fileName}`, // ✅ CORRECT URL
//       },
//     });

//     return NextResponse.json(menu);
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: 500 }
//     );
//   }
// }

//---------------------------------------------

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const menu = await prisma.menuItem.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(menu);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, price, image } = await req.json();

    if (!name || !price || !image) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const item = await prisma.menuItem.create({
      data: {
        name,
        price: Number(price),
        image, // URL string
      },
    });

    return NextResponse.json(item);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import fs from "fs/promises";
// import path from "path";

// export async function POST(req) {
//   try {
//     const formData = await req.formData();

//     const name = formData.get("name");
//     const price = Number(formData.get("price"));
//     const file = formData.get("image"); // OPTIONAL

//     if (!name || !price) {
//       return NextResponse.json(
//         { message: "Name and price are required" },
//         { status: 400 }
//       );
//     }

//     let imagePath = "/uploads/default.png"; // ✅ DEFAULT IMAGE

//     // ✅ IMAGE PROVIDED
//     if (file && typeof file === "object") {
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       const fileName =
//         Date.now() + "-" + file.name.replace(/\s+/g, "");
//       const uploadPath = path.join(
//         process.cwd(),
//         "public/uploads",
//         fileName
//       );

//       await fs.writeFile(uploadPath, buffer);
//       imagePath = `/uploads/${fileName}`;
//     }

//     const menu = await prisma.menuItem.create({
//       data: {
//         name,
//         price,
//         image: imagePath,
//       },
//     });

//     return NextResponse.json(menu);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Menu creation failed" },
//       { status: 500 }
//     );
//   }
// }
