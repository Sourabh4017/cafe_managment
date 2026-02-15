//************************Full working code */
//__________________________-----------------------

// "use client";

// import { useEffect, useState } from "react";


// export default function CustomerOrderStatus() {
//   const [tableNo, setTableNo] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   /* ================= FETCH CUSTOMER ORDERS ================= */
//   const fetchOrders = async () => {
//     if (!tableNo) return;

//     try {
//       setLoading(true);
//       setError("");

//       const res = await fetch(`/api/orders/table/${tableNo}`);

//       if (!res.ok) {
//         throw new Error("No orders found");
//       }

//       const data = await res.json();
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setOrders([]);
//       setError("No active orders for this table");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= AUTO REFRESH ================= */
//   useEffect(() => {
//     if (!tableNo) return;

//     fetchOrders();
//     const interval = setInterval(fetchOrders, 5000); // auto refresh every 5 sec

//     return () => clearInterval(interval);
//   }, [tableNo]);

//   return (
//     <div style={styles.container}>
//       <h1>Track Your Order</h1>

//       {/* ================= TABLE NUMBER INPUT ================= */}
//       <div style={styles.inputBox}>
//         <input
//           type="text"
//           placeholder="Enter Table Number"
//           value={tableNo}
//           onChange={(e) => setTableNo(e.target.value)}
//           style={styles.input}
//         />
//         <button onClick={fetchOrders} style={styles.button}>
//           Track Order
//         </button>
//       </div>

//       {loading && <p>Loading orders...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* ================= ORDER CARDS ================= */}
//       {orders.map((order) => (
//         <div key={order.id} style={styles.card}>
//           <h3>Order ID: {order.id}</h3>

//           <p>
//             <strong>Status:</strong>{" "}
//             <span style={statusStyle(order.status)}>
//               {order.status}
//             </span>
//           </p>

//           <p><strong>Total:</strong> ₹{order.total}</p>

//           <div>
//             <strong>Items:</strong>
//             {JSON.parse(order.items).map((item, idx) => (
//               <div key={idx}>
//                 {item.name} – ₹{item.price}
//               </div>
//             ))}
//           </div>

//           <p style={styles.time}>
//             {new Date(order.createdAt).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ================= STATUS COLOR ================= */
// const statusStyle = (status) => ({
//   color:
//     status === "Pending"
//       ? "orange"
//       : status === "Preparing"
//       ? "blue"
//       : status === "Served"
//       ? "green"
//       : "red",
//   fontWeight: "bold",
// });


// /* ================= STYLES ================= */
// const styles = {
//   container: {
//     maxWidth: "600px",
//     margin: "40px auto",
//     padding: "20px",
//     fontFamily: "Arial",
//   },
//   inputBox: {
//     display: "flex",
//     gap: "10px",
//     marginBottom: "20px",
//   },
//   input: {
//     flex: 1,
//     padding: "10px",
//     fontSize: "16px",
//   },
//   button: {
//     padding: "10px 20px",
//     background: "#000",
//     color: "#fff",
//     cursor: "pointer",
//     borderRadius: "4px",
//   },
//   card: {
//     border: "1px solid #ddd",
//     padding: "15px",
//     marginTop: "15px",
//     borderRadius: "6px",
//     background: "#fafafa",
//   },
//   time: {
//     fontSize: "12px",
//     color: "#555",
//     marginTop: "5px",
//   },
// };


"use client";

import { useEffect, useState } from "react";

export default function CustomerOrderStatus() {
  const [tableNo, setTableNo] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    if (!tableNo) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/orders/table/${tableNo}`);
      if (!res.ok) throw new Error();

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
      setError("No active orders for this table");
    } finally {
      setLoading(false);
    }
  };

  /* ================= AUTO REFRESH ================= */
  useEffect(() => {
    if (!tableNo) return;

    fetchOrders();
    const i = setInterval(fetchOrders, 5000);
    return () => clearInterval(i);
  }, [tableNo]);

  return (
    <div className="page">
      {/* HEADER */}
      <header className="header">
        <h1>Order status</h1>
        <p>Search for your order</p>
      </header>

      {/* TABLE INPUT */}
      <div className="input-box">
        <input
          placeholder="Table No. "
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
        />
        <button onClick={fetchOrders}>Track</button>
      </div>

      {loading && <p className="info">Loading orders…</p>}
      {error && <p className="error">{error}</p>}

      {/* ORDERS */}
      <div className="orders">
        {orders.map((order) => (
          <div key={order.id} className="card">
            <div className="card-head">
              <span>Order #{order.id}</span>
              <span className={`status ${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="items">
              {JSON.parse(order.items).map((item, i) => (
                <div key={i} className="item">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="total">
              Total: ₹{order.total}
            </div>

            <div className="time">
              {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* STYLES */}
      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #f7f5f2;
          padding: 30px 15px;
          font-family: "Georgia", serif;
        }

        .header {
          text-align: center;
          margin-bottom: 25px;
        }

        .header h1 {
          font-size: 32px;
          margin: 0;
        }

        .header p {
          color: #777;
          margin-top: 4px;
        }

        .input-box {
          display: flex;
          max-width: 400px;
          margin: auto;
          gap: 10px;
        }

        .input-box input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
        }

        .input-box button {
          background: #2f2f2f;
          color: #fff;
          border: none;
          padding: 10px 18px;
          border-radius: 6px;
          cursor: pointer;
        }

        .info {
          text-align: center;
          margin-top: 20px;
        }

        .error {
          text-align: center;
          margin-top: 20px;
          color: #c0392b;
        }

        .orders {
          max-width: 600px;
          margin: 25px auto 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card {
          background: #fff;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .status {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 13px;
          text-transform: uppercase;
        }

        .Pending {
          background: #f1c40f;
          color: #000;
        }

        .Preparing {
          background: #3498db;
          color: #fff;
        }

        .Served {
          background: #27ae60;
          color: #fff;
        }

        .Cancelled {
          background: #e74c3c;
          color: #fff;
        }

        .items {
          border-top: 1px dashed #ddd;
          border-bottom: 1px dashed #ddd;
          padding: 10px 0;
          margin: 10px 0;
        }

        .item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .total {
          font-weight: bold;
          text-align: right;
          margin-top: 6px;
        }

        .time {
          font-size: 12px;
          color: #777;
          text-align: right;
          margin-top: 6px;
        }
      `}</style>
    </div>
  );
}
