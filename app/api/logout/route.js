// import { NextResponse } from "next/server";

// export async function POST() {
//   const res = NextResponse.json({ message: "Logged out" });
//   res.cookies.set("admin_token", "", { maxAge: 0 });
//   return res;
// }

//********************** *********************** */

// import { NextResponse } from "next/server";

// export async function POST() {
//   const res = NextResponse.json({ ok: true });
//   res.cookies.set("admin_token", "", {
//     path: "/",
//     expires: new Date(0),
//   });
//   return res;
// }


import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Remove cookie
  response.cookies.set("adminToken", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
