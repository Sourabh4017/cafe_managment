// const cancelOrder = async (orderId) => {
//   if (!confirm("Cancel this order?")) return;

//   const res = await fetch(`/api/orders/cancel/${orderId}`, {
//     method: "PATCH",
//   });

//   if (!res.ok) {
//     alert("Order cannot be cancelled now");
//     return;
//   }

//   fetchOrder(); // refresh
// };



"use client";

import { useState } from "react";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId) return alert("Enter Order ID");

    setLoading(true);

    try {
      const res = await fetch(`/api/track?orderId=${orderId}`);
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      alert("Order not found");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Track Your Order</h1>

      <input
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button onClick={handleTrack}>Track</button>

      {loading && <p>Loading...</p>}

      {status && (
        <div style={{ marginTop: "20px" }}>
          <h3>Status: {status.status}</h3>
          <p>Total: ₹ {status.total}</p>
        </div>
      )}
    </div>
  );
}

