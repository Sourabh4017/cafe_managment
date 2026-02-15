// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminGuard({ children }) {
//   const router = useRouter();

//   useEffect(() => {
//     const role = localStorage.getItem("role");
//     const token = localStorage.getItem("token");

//     if (!token || role !== "admin") {
//       router.replace("/admin/login");
//     }
//   }, [router]);

//   return children;
// }

//******************** Fully Functional Code Below ***********************/


// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminGuard({ children }) {
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const res = await fetch("/api/admin/me");

//       if (!res.ok) {
//         router.replace("/admin/login");
//       }
//     };

//     checkAuth();
//   }, [router]);

//   return children;
// }

//-------------------------------------------------


// "use client";

// import { useEffect, useState } from "react";

// export default function AdminGuard({ children }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const res = await fetch("/api/admin/me");

//       if (!res.ok) {
//         alert("Session expired. Please login again.");
//         window.location.href = "/admin/login";
//         return;
//       }

//       setLoading(false);
//     };

//     checkAuth();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ color: "#fff", padding: "40px", textAlign: "center" }}>
//         Checking session...
//       </div>
//     );
//   }

//   return children;
// }


// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminGuard({ children }) {
//   const router = useRouter();
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     fetch("/api/admin/me")
//       .then((res) => {
//         if (res.status === 401) {
//           router.replace("/admin/login");
//         } else {
//           setChecked(true);
//         }
//       })
//       .catch(() => router.replace("/admin/login"));
//   }, []);

//   if (!checked) return null;

//   return children;
// }


// "use client";
// import { useEffect } from "react";

// export default function AdminGuard({ children }) {
//   useEffect(() => {
//     fetch("/api/admin/profile").then((res) => {
//       if (res.status === 401) {
//         window.location.href = "/admin/login";
//       }
//     });
//   }, []);

//   return children;
// }


//=======================================

"use client";

import { useEffect, useState } from "react";

export default function AdminGuard({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          window.location.href = "/admin/login";
        } else {
          setLoading(false);
        }
      });
  }, []);

  if (loading) return null;

  return children;
}
