// "use client";

// import { useEffect, useState } from "react";

// export default function TabletPage() {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     const res = await fetch("/api/admin/orders");
//     const data = await res.json();
//     setOrders(data.filter(o => o.status !== "Served"));
//   };

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ padding: 30, background: "#000", minHeight: "100vh", color: "#fff" }}>
//       <h1>📱 Tablet Live Orders</h1>

//       {orders.length === 0 ? (
//         <p>No active orders</p>
//       ) : (
//         orders.map(order => (
//           <div
//             key={order.id}
//             style={{
//               background: "#111",
//               padding: 20,
//               marginTop: 15,
//               borderRadius: 8
//             }}
//           >
//             <h3>Table {order.tableNo}</h3>
//             <p>Status: {order.status}</p>
//             <p>Total: ₹{order.total}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function TabletPage() {
  const [orders, setOrders] = useState([]);

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data.filter(o => o.status !== "Served"));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1>📱 Tablet Live Orders</h1>
        <span>Tablet Counter View</span>
      </header>

      {orders.length === 0 ? (
        <p style={styles.empty}>No active orders</p>
      ) : (
        <div style={styles.grid}>
          {orders.map(order => (
            <div key={order.id} style={styles.card}>
              <div style={styles.top}>
                <h2>TABLE {order.tableNo}</h2>
                <span style={badge(order.status)}>
                  {order.status}
                </span>
              </div>

              <p style={styles.total}>₹ {order.total}</p>

              <div style={styles.items}>
                {JSON.parse(order.items).map((item, i) => (
                  <div key={i}>
                    • {item.name} × {item.qty || 1}
                  </div>
                ))}
              </div>

              <p style={styles.time}>
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0b0b0b, #111)",
    color: "#f5f5f5",
    padding: "24px",
    fontFamily: "Georgia, serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    borderBottom: "1px solid #222",
    paddingBottom: "12px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "#111",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.5)",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  total: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#facc15",
  },

  items: {
    marginTop: "12px",
    fontSize: "15px",
    lineHeight: "1.6",
  },

  time: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#888",
    textAlign: "right",
  },

  empty: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "20px",
    color: "#777",
  },
};

/* ================= STATUS BADGE ================= */
const badge = status => ({
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
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
