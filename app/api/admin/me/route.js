// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const cookieStore = cookies();
//   const token = cookieStore.get("admin_token")?.value;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     return NextResponse.json({ ok: true });
//   } catch {
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }
// }

//*********** Fully Functional Code Below ***********************/

// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const cookieStore = await cookies(); // 🔥 REQUIRED
//   const token = cookieStore.get("admin_token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   try {
//     jwt.verify(token, process.env.JWT_SECRET);
//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Invalid token" },
//       { status: 401 }
//     );
//   }
// }

//-------------------------------------------------

// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("admin_token")?.value;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return NextResponse.json({
//       id: decoded.id,
//       email: decoded.email,
//     });
//   } catch (err) {
//     return NextResponse.json({ error: "Token expired" }, { status: 401 });
//   }
// }


//_----------------------------________________________________\\
//=================================================================

// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const cookieStore = await cookies(); // ✅ FIX
//   const token = cookieStore.get("admin_token")?.value;

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return NextResponse.json({ admin: decoded });
//   } catch {
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }
// }

//=================================================

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  // ✅ MUST AWAIT cookies()
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ admin: decoded });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}
