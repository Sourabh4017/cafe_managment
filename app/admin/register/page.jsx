"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Admin created successfully!");
    router.replace("/admin/login");
  };

  return (
    <div className="page">
      <form onSubmit={handleRegister} className="card">
        <h1>Admin Registration</h1>

        <input
          type="email"
          placeholder="admin@cafesourabh.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Strong password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>Create Admin</button>
      </form>
    </div>
  );
}
