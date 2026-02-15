"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("/api/auth", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await res.json();

  //   if (res.ok) {
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("role", data.role); // admin
  //     router.push("/admin/dashboard");
  //   } else {
  //     alert(data.message);
  //   }
  // };

//   const handleLogin = async (e) => {

//   const res = await fetch("/api/auth", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (res.ok) {
//     router.replace("/admin/dashboard");
//   } else {
//     const data = await res.json();
//     alert(data.message);
//   }
// };

const handleLogin = async (e) => {
  e.preventDefault();

  const res = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ VERY IMPORTANT
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Invalid email or password");
    return;
  }

  // router.replace("/admin/dashboard");
  // 🔥 FORCE PAGE RELOAD so middleware sees cookie
window.location.href = "/admin/dashboard";
};


  return (
    <div className="page">
      <form onSubmit={handleLogin} className="card">
        <h1>Administrator login</h1>
        <p className="sub">Admin Access</p>

        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@cafe.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>

        <div className="footer">Cafe Sourabh • Admin Panel</div>
      </form>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
            url("/japan-bg.jpg");
          background-size: cover;
          background-position: center;
          font-family: "Georgia", serif;
        }

        .card {
          width: 360px;
          background: rgba(255, 255, 255, 0.95);
          padding: 28px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        h1 {
          text-align: center;
          font-size: 26px;
          margin-bottom: 4px;
        }

        .sub {
          text-align: center;
          color: #777;
          font-size: 14px;
          margin-bottom: 22px;
        }

        .field {
          margin-bottom: 16px;
        }

        label {
          display: block;
          font-size: 13px;
          margin-bottom: 6px;
          color: #444;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #222;
        }

        button {
          width: 100%;
          margin-top: 10px;
          padding: 12px;
          background: #1f1f1f;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          transition: background 0.2s;
        }

        button:hover {
          background: #000;
        }

        .footer {
          margin-top: 16px;
          text-align: center;
          font-size: 12px;
          color: #777;
        }
      `}</style>
    </div>
  );
}
