// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req) {
//   const token = req.cookies.get("admin_token")?.value;

//   // Protect admin routes
//   if (req.nextUrl.pathname.startsWith("/admin")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/admin/login", req.url));
//     }

//     try {
//       jwt.verify(token, process.env.JWT_SECRET);
//     } catch {
//       return NextResponse.redirect(new URL("/admin/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };


//------------Fully Revised Code Below---------------
//***********************************************************8 */


// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   // Allow admin login page without auth
//   if (pathname === "/admin/login") {
//     return NextResponse.next();
//   }

//   // Protect other admin routes
//   if (pathname.startsWith("/admin")) {
//     const token = req.cookies.get("admin_token")?.value;

//     if (!token) {
//       return NextResponse.redirect(
//         new URL("/admin/login", req.url)
//       );
//     }

//     try {
//       await jwtVerify(
//         token,
//         new TextEncoder().encode(process.env.JWT_SECRET)
//       );
//     } catch (err) {
//       return NextResponse.redirect(
//         new URL("/admin/login", req.url)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };


//******************** Fully Functional Code Below ***********************/

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export function middleware(req) {
//   const token = req.cookies.get("admin_token")?.value;

//   // Protect admin routes
//   if (req.nextUrl.pathname.startsWith("/admin")) {
//     if (!token) {
//       return NextResponse.redirect(
//         new URL("/admin/login", req.url)
//       );
//     }

//     try {
//       jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return NextResponse.redirect(
//         new URL("/admin/login", req.url)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// /* Apply only to admin routes */
// export const config = {
//   matcher: ["/admin/:path*"],
// };


// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const token = req.cookies.get("admin_token")?.value;
//   const pathname = req.nextUrl.pathname;

//   if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
//     if (!token) {
//       return NextResponse.redirect(
//         new URL("/admin/login", req.url)
//       );
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };

//================= Fully Functional Code Below ===================

import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("adminToken")?.value;
  const pathname = req.nextUrl.pathname;

  // Allow login page without token
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect all other admin routes
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
