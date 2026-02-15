// "use client";

// import { useEffect, useState } from "react";

// export default function KitchenDisplay() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch live orders
//   const fetchOrders = async () => {
//     try {
//       const res = await fetch("/api/admin/orders");
//       const data = await res.json();

//       // Show only non-served orders
//       const activeOrders = data.filter(
//         (order) => order.status !== "Served"
//       );

//       setOrders(activeOrders);
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to load orders", err);
//     }
//   };

//   // Auto refresh every 5 seconds
//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Update order status
// //   const updateStatus = async (id, status) => {
// //     await fetch(`/api/admin/orders/${id}/status`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ status }),
// //     });
// //     fetchOrders();
// //   };

// //   if (loading) {
// //     return <p style={{ textAlign: "center" }}>Loading kitchen orders...</p>;
// //   }

// const updateStatus = async (id, status) => {
//   try {
//     const res = await fetch(`/api/admin/orders/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status }),
//     });

//     if (!res.ok) {
//       const err = await res.json();
//       alert(err.message || "Failed to update order");
//       return;
//     }

//     fetchOrders(); // refresh live orders
//   } catch (error) {
//     console.error("Status update failed", error);
//   }
// };


//   return (
//     <div style={pageStyle}>
//       <h1 style={{ marginBottom: 20 }}>🍳 Kitchen Display Screen</h1>

//       {orders.length === 0 && (
//         <p style={{ color: "#666" }}>No active orders</p>
//       )}

//       <div style={gridStyle}>
//         {orders.map((order) => (
//           <div key={order.id} style={cardStyle}>
//             <h2>Table {order.tableNo}</h2>

//             <p style={{ fontSize: 14, color: "#666" }}>
//               Order #{order.id}
//             </p>

//             <div style={itemsStyle}>
//               {order.items.split(",").map((item, idx) => (
//                 <div key={idx}>• {item}</div>
//               ))}
//             </div>

//             <p style={{ marginTop: 10 }}>
//               Status: <strong>{order.status}</strong>
//             </p>

//             <div style={{ marginTop: 12 }}>
//               {order.status === "Pending" && (
//                 <button
//                   style={btnPrepare}
//                   onClick={() => updateStatus(order.id, "Preparing")}
//                 >
//                   Start Preparing
//                 </button>
//               )}

//               {order.status === "Preparing" && (
//                 <button
//                   style={btnServe}
//                   onClick={() => updateStatus(order.id, "Served")}
//                 >
//                   Mark as Served
//                 </button>
//               )}
//             </div>

//             <p style={timeStyle}>
//               {new Date(order.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const pageStyle = {
//   minHeight: "100vh",
//   padding: "30px",
//   background: "#111",
//   color: "#fff",
//   fontFamily: "Arial",
// };

// const gridStyle = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//   gap: "20px",
// };

// const cardStyle = {
//   background: "#1e1e1e",
//   padding: "20px",
//   borderRadius: "10px",
//   boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
// };

// const itemsStyle = {
//   marginTop: "10px",
//   fontSize: "15px",
// };

// const timeStyle = {
//   marginTop: "12px",
//   fontSize: "12px",
//   color: "#aaa",
// };

// const btnPrepare = {
//   width: "100%",
//   padding: "10px",
//   background: "#f39c12",
//   border: "none",
//   color: "#000",
//   cursor: "pointer",
//   borderRadius: "6px",
// };

// const btnServe = {
//   width: "100%",
//   padding: "10px",
//   background: "#2ecc71",
//   border: "none",
//   color: "#000",
//   cursor: "pointer",
//   borderRadius: "6px",
// };


"use client";

import { useEffect, useState } from "react";

export default function KitchenDisplay() {
  const [orders, setOrders] = useState([]);

  /* ================= FETCH LIVE ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();

      // Only active orders
      setOrders(data.filter(o => o.status !== "Served"));
    } catch (err) {
      console.error("Kitchen fetch failed", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1>🍳 kitchen order display</h1>
        <span>Live Kitchen Orders</span>
      </header>

      {orders.length === 0 && (
        <p style={styles.empty}>No active orders</p>
      )}

      {/* ORDER GRID */}
      <div style={styles.grid}>
        {orders.map(order => (
          <div key={order.id} style={styles.card}>
            <div style={styles.top}>
              <h2>TABLE {order.tableNo}</h2>
              <span style={badge(order.status)}>
                {order.status}
              </span>
            </div>

            <div style={styles.items}>
              {JSON.parse(order.items).map((item, i) => (
                <div key={i}>
                  • {item.name} × {item.qty || 1}
                </div>
              ))}
            </div>

            <div style={styles.footer}>
              {order.status === "Pending" && (
                <button
                  style={styles.prepare}
                  onClick={() => updateStatus(order.id, "Preparing")}
                >
                  Preparation to start
                </button>
              )}

              {order.status === "Preparing" && (
                <button
                  style={styles.serve}
                  onClick={() => updateStatus(order.id, "Served")}
                >
                  Offer completed
                </button>
              )}
            </div>

            <div style={styles.time}>
              {new Date(order.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0b0b",
    color: "#f5f5f5",
    fontFamily: "Georgia, serif",
    padding: "30px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    borderBottom: "1px solid #222",
    paddingBottom: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
  },

  card: {
    background: "#111",
    borderRadius: "14px",
    padding: "22px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  items: {
    marginTop: "16px",
    fontSize: "18px",
    lineHeight: "1.6",
  },

  footer: {
    marginTop: "20px",
  },

  time: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#888",
    textAlign: "right",
  },

  prepare: {
    width: "100%",
    padding: "14px",
    fontSize: "18px",
    background: "#f59e0b",
    color: "#000",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  serve: {
    width: "100%",
    padding: "14px",
    fontSize: "18px",
    background: "#22c55e",
    color: "#000",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    color: "#777",
    fontSize: "20px",
  },
};

/* ================= STATUS BADGE ================= */
const badge = status => ({
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "bold",
  background:
    status === "Pending"
      ? "#fff7ed"
      : status === "Preparing"
      ? "#eff6ff"
      : "#ecfdf5",
  color:
    status === "Pending"
      ? "#c2410c"
      : status === "Preparing"
      ? "#1d4ed8"
      : "#047857",
});
