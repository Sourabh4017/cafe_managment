
// "use client";

// import { useRouter } from "next/navigation";
// import AdminGuard from "@/components/AdminGuard";
// // import { verifyAdmin } from "@/lib/verifyAdmin";


// // import AdminGuard from "../../../components/AdminGuard";


// import { useEffect, useState, useRef } from "react";

// export default function AdminDashboard() {
//   // verifyAdmin();
//   const router = useRouter();  //navigation hook
//   const [analytics, setAnalytics] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const prevOrderCount = useRef(0);
//   const audioRef = useRef(null);

//   const handleLogout = async () => {
//     await fetch("/api/logout", {
//       method: "POST",
//       credentials: "include",
//     });

//     router.replace("/admin/login");
//   };

//   /* ================= ENABLE SOUND AFTER USER CLICK ================= */
//   useEffect(() => {
//     const enableSound = () => {
//       if (audioRef.current) {
//         audioRef.current.play().catch(() => {});
//       }
//       document.removeEventListener("click", enableSound);
//     };
//     document.addEventListener("click", enableSound);
//   }, []);

//   /* ================= FETCH ANALYTICS ================= */
//   const fetchAnalytics = async () => {
//     const res = await fetch("/api/admin/analytics");
//     if (res.status === 401) {
//       window.location.href = "/admin/login";
//       return;
//     }
//     setAnalytics(await res.json());
//   };

//   /* ================= FETCH ORDERS + SOUND ================= */
//   const fetchOrders = async () => {
//     const res = await fetch("/api/admin/orders");
//     if (res.status === 401) {
//       window.location.href = "/admin/login";
//       return;
//     }

//     const data = await res.json();

//     if (prevOrderCount.current !== 0 && data.length > prevOrderCount.current) {
//       audioRef.current?.play().catch(() => {});
//     }

//     prevOrderCount.current = data.length;
//     setOrders(data);
//     setLoading(false);
//   };

//   /* ================= AUTO REFRESH ================= */
//   useEffect(() => {
//     fetchAnalytics();
//     fetchOrders();
//     const interval = setInterval(() => {
//       fetchAnalytics();
//       fetchOrders();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   /* ================= UPDATE STATUS ================= */
//   const updateStatus = async (id, status) => {
//     await fetch(`/api/admin/orders/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status }),
//     });
//     fetchAnalytics();
//     fetchOrders();
//   };

//   // ================= ADD ADMIN (TESTING ONLY) ================= //

//   async function addAdmin(e) {
//   e.preventDefault();

//   const email = e.target.email.value;
//   const password = e.target.password.value;

//   const res = await fetch("/api/admin/create", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = await res.json();

//   if (res.ok) alert("Admin added successfully");
//   else alert(data.message);
// }


//   if (!analytics) return <p className="loading">Loading dashboard...</p>;

//   const statusMap = { Pending: 0, Preparing: 0, Served: 0, Cancelled: 0 };
//   analytics.statusCounts?.forEach((s) => (statusMap[s.status] = s._count));

//   return (
//     <div className="page">
//       <AdminGuard>
//         <audio ref={audioRef} src="/sounds/new-order.mp3" preload="none" />

//         <header className="header">
//           <h1>Admin Dashboard</h1>
//           <span>Admin Cafe Management</span>
//           <br />
//           {/* <button
//             onClick={async () => {
//               await fetch("/api/admin/logout", { method: "POST" });
//               window.location.href = "/admin/login";
//             }}
//           >
//             Logout
//           </button> */}
//           <button onClick={handleLogout}>Logout</button>
//         </header>

//         {/* ================= ANALYTICS ================= */}
//         <section className="cards">
//           <Card title="Total Orders" value={analytics.totalOrders} />
//           <Card title="Today's Orders" value={analytics.todayOrders} />
//           <Card title="Total Sales" value={`₹ ${analytics.totalSales}`} />
//           <Card title="Pending" value={statusMap.Pending} />
//         </section>

//         {/* ================= ACTIONS ================= */}
//         <section className="actions">
//           <button onClick={() => (window.location.href = "/admin/menu")}>
//             🍱 Manage Menu
//           </button>
//           <button onClick={() => (window.location.href = "/admin-orders.html")}>
//             📋 Orders
//           </button>
//           {/* <Card title="Kitchen" jp="kitchen" desc="Live orders" href="/kitchen" night={night} /> */}
//           <button onClick={() => (window.location.href = "/kitchen")}>
//             🍳 Kitchen Screen
//           </button>
//         </section>
//         <form onSubmit={addAdmin}>
//   <input name="email" placeholder="Admin Email" required />
//   <input name="password" type="password" placeholder="Password" required />
//   <button>Add Admin</button>
// </form>


//         {/* ================= ORDERS ================= */}
//         <section className="tableSection">
//           <h2>Recent Orders</h2>

//           {loading ? (
//             <p>Loading orders...</p>
//           ) : orders.length === 0 ? (
//             <p>No orders found</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Table</th>
//                   <th>Items</th>
//                   <th>Total</th>
//                   <th>Status</th>
//                   <th>Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((o) => (
//                   <tr key={o.id}>
//                     <td>{o.tableNo}</td>
//                     <td>
//                       {JSON.parse(o.items).map((i, idx) => (
//                         <div key={idx}>
//                           {i.name} – ₹{i.price}
//                         </div>
//                       ))}
//                     </td>
//                     <td>₹ {o.total}</td>
//                     <td>
//                       <select
//                         value={o.status}
//                         onChange={(e) => updateStatus(o.id, e.target.value)}
//                       >
//                         <option>Pending</option>
//                         <option>Preparing</option>
//                         <option>Served</option>
//                         <option>Cancelled</option>
//                       </select>
//                     </td>
//                     <td>{new Date(o.createdAt).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </section>
//       </AdminGuard>
//       {/* ================= STYLES ================= */}
//       <style jsx>{`
//         .page {
//           min-height: 100vh;
//           background: #0f0f0f;
//           color: #f5f5f5;
//           padding: 30px;
//           font-family: "Georgia", serif;
//         }

//         .header h1 {
//           font-size: 30px;
//         }

//         .header span {
//           color: #aaa;
//         }

//         .cards {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 20px;
//           margin-top: 30px;
//         }

//         .actions {
//           margin: 30px 0;
//           display: flex;
//           gap: 15px;
//         }

//         .actions button {
//           padding: 12px 20px;
//           background: #1f1f1f;
//           color: #fff;
//           border-radius: 8px;
//           border: 1px solid #333;
//           cursor: pointer;
//         }

//         .tableSection {
//           background: #fff;
//           color: #000;
//           padding: 20px;
//           border-radius: 12px;
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         th,
//         td {
//           padding: 10px;
//           border-bottom: 1px solid #ddd;
//         }

//         th {
//           background: #f5f5f5;
//           text-align: left;
//         }

//         select {
//           padding: 6px;
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ================= CARD ================= */
// function Card({ title, value }) {
//   return (
//     <div className="card">
//       <h3>{title}</h3>
//       <p>{value}</p>
//       <style jsx>{`
//         .card {
//           background: #1a1a1a;
//           padding: 20px;
//           border-radius: 12px;
//           text-align: center;
//         }
//         h3 {
//           color: #aaa;
//           margin-bottom: 10px;
//         }
//         p {
//           font-size: 26px;
//           font-weight: bold;
//         }
//       `}</style>
//     </div>
//   );
// }


//+++++++++===========================Fully functional code============================++++++++++++++//

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState, useRef } from "react";

// export default function AdminDashboard() {
//   const router = useRouter();

//   const [analytics, setAnalytics] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const prevOrderCount = useRef(0);
//   const audioRef = useRef(null);

//   /* ================= LOGOUT ================= */
//   const handleLogout = async () => {
//     await fetch("/api/logout", {
//       method: "POST",
//       credentials: "include",
//     });

//     router.replace("/admin/login");
//   };

//   /* ================= ENABLE SOUND AFTER USER CLICK ================= */
//   useEffect(() => {
//     const enableSound = () => {
//       audioRef.current?.play().catch(() => {});
//       document.removeEventListener("click", enableSound);
//     };
//     document.addEventListener("click", enableSound);
//   }, []);

//   /* ================= FETCH ANALYTICS ================= */
//   const fetchAnalytics = async () => {
//     const res = await fetch("/api/admin/analytics", {
//       credentials: "include",
//     });

//     if (res.status === 401) {
//       router.replace("/admin/login");
//       return;
//     }

//     setAnalytics(await res.json());
//   };

//   /* ================= FETCH ORDERS + SOUND ================= */
//   const fetchOrders = async () => {
//     const res = await fetch("/api/admin/orders", {
//       credentials: "include",
//     });

//     if (res.status === 401) {
//       router.replace("/admin/login");
//       return;
//     }

//     const data = await res.json();

//     if (
//       prevOrderCount.current !== 0 &&
//       data.length > prevOrderCount.current
//     ) {
//       audioRef.current?.play().catch(() => {});
//     }

//     prevOrderCount.current = data.length;
//     setOrders(data);
//     setLoading(false);
//   };

//   /* ================= AUTO REFRESH ================= */
//   useEffect(() => {
//     fetchAnalytics();
//     fetchOrders();

//     const interval = setInterval(() => {
//       fetchAnalytics();
//       fetchOrders();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   /* ================= UPDATE STATUS ================= */
//   const updateStatus = async (id, status) => {
//     await fetch(`/api/admin/orders/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ status }),
//     });

//     fetchAnalytics();
//     fetchOrders();
//   };

//   if (!analytics) return <p className="loading">Loading dashboard...</p>;

//   const statusMap = { Pending: 0, Preparing: 0, Served: 0, Cancelled: 0 };
//   analytics.statusCounts?.forEach(
//     (s) => (statusMap[s.status] = s._count)
//   );

//   return (
//     <div className="page">
//       <audio ref={audioRef} src="/sounds/new-order.mp3" preload="none" />

//       {/* ================= HEADER ================= */}
//       <header className="header">
//         <h1>Admin Dashboard</h1>
//         <span>Admin Cafe Management</span>
//         <br />
//         <button onClick={handleLogout}>Logout</button>
//       </header>

//       {/* ================= ANALYTICS ================= */}
//       <section className="cards">
//         <Card title="Total Orders" value={analytics.totalOrders} />
//         <Card title="Today's Orders" value={analytics.todayOrders} />
//         <Card title="Total Sales" value={`₹ ${analytics.totalSales}`} />
//         <Card title="Pending" value={statusMap.Pending} />
//       </section>

//       {/* ================= ACTIONS ================= */}
//       <section className="actions">
//         <button onClick={() => router.push("/admin/menu")}>
//           🍱 Manage Menu
//         </button>
//         <button onClick={() => router.push("/admin/orders")}>
//           📋 Orders
//         </button>
//         <button onClick={() => router.push("/kitchen")}>
//           🍳 Kitchen Screen
//         </button>
//       </section>

//       {/* ================= ORDERS TABLE ================= */}
//       <section className="tableSection">
//         <h2>Recent Orders</h2>

//         {loading ? (
//           <p>Loading orders...</p>
//         ) : orders.length === 0 ? (
//           <p>No orders found</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>Table</th>
//                 <th>Items</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th>Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((o) => (
//                 <tr key={o.id}>
//                   <td>{o.tableNo}</td>
//                   <td>
//                     {JSON.parse(o.items).map((i, idx) => (
//                       <div key={idx}>
//                         {i.name} – ₹{i.price}
//                       </div>
//                     ))}
//                   </td>
//                   <td>₹ {o.total}</td>
//                   <td>
//                     <select
//                       value={o.status}
//                       onChange={(e) =>
//                         updateStatus(o.id, e.target.value)
//                       }
//                     >
//                       <option>Pending</option>
//                       <option>Preparing</option>
//                       <option>Served</option>
//                       <option>Cancelled</option>
//                     </select>
//                   </td>
//                   <td>
//                     {new Date(o.createdAt).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </section>

//       {/* ================= STYLES ================= */}
//       <style jsx>{`
//         .page {
//           min-height: 100vh;
//           background: #0f0f0f;
//           color: #f5f5f5;
//           padding: 30px;
//           font-family: Georgia, serif;
//         }

//         .header h1 {
//           font-size: 30px;
//         }

//         .header span {
//           color: #aaa;
//         }

//         .header button {
//           margin-top: 10px;
//           padding: 8px 16px;
//           cursor: pointer;
//         }

//         .cards {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 20px;
//           margin-top: 30px;
//         }

//         .actions {
//           margin: 30px 0;
//           display: flex;
//           gap: 15px;
//         }

//         .actions button {
//           padding: 12px 20px;
//           background: #1f1f1f;
//           color: #fff;
//           border-radius: 8px;
//           border: 1px solid #333;
//           cursor: pointer;
//         }

//         .tableSection {
//           background: #fff;
//           color: #000;
//           padding: 20px;
//           border-radius: 12px;
//         }

//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         th,
//         td {
//           padding: 10px;
//           border-bottom: 1px solid #ddd;
//         }

//         th {
//           background: #f5f5f5;
//           text-align: left;
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ================= CARD ================= */
// function Card({ title, value }) {
//   return (
//     <div className="card">
//       <h3>{title}</h3>
//       <p>{value}</p>
//       <style jsx>{`
//         .card {
//           background: #1a1a1a;
//           padding: 20px;
//           border-radius: 12px;
//           text-align: center;
//         }
//         h3 {
//           color: #aaa;
//           margin-bottom: 10px;
//         }
//         p {
//           font-size: 26px;
//           font-weight: bold;
//         }
//       `}</style>
//     </div>
//   );
// }



"use client";

import { useRouter } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import { useEffect, useState, useRef } from "react";

export default function AdminDashboard() {
  const router = useRouter();

  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const prevOrderCount = useRef(0);
  const audioRef = useRef(null);

  /* ================= LOGOUT ================= */
 const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    router.replace("/admin/login");
  };

  /* ================= ENABLE SOUND ================= */
  useEffect(() => {
    const enableSound = () => {
      audioRef.current?.play().catch(() => {});
      document.removeEventListener("click", enableSound);
    };
    document.addEventListener("click", enableSound);
  }, []);

  /* ================= FETCH ANALYTICS ================= */
  const fetchAnalytics = async () => {
    const res = await fetch("/api/admin/analytics");
    if (res.status === 401) return (window.location.href = "/admin/login");
    setAnalytics(await res.json());
  };

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders");
    if (res.status === 401) return (window.location.href = "/admin/login");

    const data = await res.json();

    if (prevOrderCount.current && data.length > prevOrderCount.current) {
      audioRef.current?.play().catch(() => {});
    }

    prevOrderCount.current = data.length;
    setOrders(data);
    setLoading(false);
  };

  /* ================= AUTO REFRESH ================= */
  useEffect(() => {
    fetchAnalytics();
    fetchOrders();
    const interval = setInterval(() => {
      fetchAnalytics();
      fetchOrders();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchAnalytics();
    fetchOrders();
  };

  /* ================= ADD ADMIN ================= */
  async function addAdmin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("/api/admin/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) alert("Admin added successfully");
    else alert(data.message);
  }

  if (!analytics)
    return <div className="loading">Loading dashboard...</div>;

  const statusMap = { Pending: 0, Preparing: 0, Served: 0, Cancelled: 0 };
  analytics.statusCounts?.forEach(
    (s) => (statusMap[s.status] = s._count)
  );

  return (
    <AdminGuard>
      <div className="dashboard">
        <audio ref={audioRef} src="/sounds/new-order.mp3" preload="none" />

        {/* ===== SIDEBAR ===== */}
        <aside className="sidebar">
          <h2>🏭 Admin Panel</h2>

          <button onClick={() => router.push("/admin/menu")}>
            🍱 Menu
          </button>
          <button onClick={() => router.push("/kitchen")}>
            🍳 Kitchen
          </button>
          <button onClick={handleLogout} className="logout">
            🚪 Logout
          </button>
        </aside>

        {/* ===== MAIN ===== */}
        <main className="main">
          <header className="topbar">
            <h1>Dashboard Overview</h1>
            <p>Real-time café operations</p>
          </header>

          {/* ===== ANALYTICS CARDS ===== */}
          <section className="cards">
            <Card title="Total Orders" value={analytics.totalOrders} />
            <Card title="Today's Orders" value={analytics.todayOrders} />
            <Card title="Total Sales" value={`₹ ${analytics.totalSales}`} />
            <Card title="Pending Orders" value={statusMap.Pending} />
          </section>

          {/* ===== ADD ADMIN ===== */}
          <section className="addAdmin">
            <h3>Add New Admin</h3>
            <form onSubmit={addAdmin}>
              <input name="email" placeholder="Admin Email" required />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
              />
              <button>Add Admin</button>
            </form>
          </section>

          {/* ===== ORDERS TABLE ===== */}
          <section className="orders">
            <h2>Recent Orders</h2>

            {loading ? (
              <p>Loading...</p>
            ) : orders.length === 0 ? (
              <p>No orders found</p>
            ) : (
              <div className="tableWrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Table</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td>{o.tableNo}</td>
                        <td>
                          {JSON.parse(o.items).map((i, idx) => (
                            <div key={idx}>
                              {i.name} – ₹{i.price}
                            </div>
                          ))}
                        </td>
                        <td>₹ {o.total}</td>
                        <td>
                          <select
                            value={o.status}
                            onChange={(e) =>
                              updateStatus(o.id, e.target.value)
                            }
                          >
                            <option>Pending</option>
                            <option>Preparing</option>
                            <option>Served</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                        <td>
                          {new Date(o.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>

        <style jsx>{`
          .dashboard {
            display: flex;
            min-height: 100vh;
            background: #111827;
            color: #fff;
            font-family: Inter, sans-serif;
          }

          .sidebar {
            width: 240px;
            background: #0f172a;
            padding: 25px;
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .sidebar h2 {
            margin-bottom: 20px;
            font-size: 20px;
          }

          .sidebar button {
            padding: 12px;
            background: #1e293b;
            border: none;
            color: white;
            border-radius: 8px;
            cursor: pointer;
          }

          .logout {
            background: #7f1d1d;
          }

          .main {
            flex: 1;
            padding: 30px;
          }

          .topbar h1 {
            font-size: 28px;
          }

          .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
          }

          .addAdmin {
            background: #1e293b;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
          }

          .addAdmin form {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .addAdmin input {
            padding: 10px;
            border-radius: 6px;
            border: none;
          }

          .addAdmin button {
            padding: 10px 16px;
            background: #2563eb;
            border: none;
            color: white;
            border-radius: 6px;
            cursor: pointer;
          }

          .orders {
            background: #1e293b;
            padding: 20px;
            border-radius: 10px;
          }

          .tableWrapper {
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            padding: 10px;
            border-bottom: 1px solid #374151;
          }

          select {
            padding: 6px;
            border-radius: 6px;
          }

          @media (max-width: 900px) {
            .dashboard {
              flex-direction: column;
            }
            .sidebar {
              width: 100%;
              flex-direction: row;
              overflow-x: auto;
            }
          }
        `}</style>
      </div>
    </AdminGuard>
  );
}

/* ===== CARD COMPONENT ===== */
function Card({ title, value }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{value}</p>
      <style jsx>{`
        .card {
          background: #1e293b;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
        }
        h4 {
          color: #94a3b8;
          margin-bottom: 10px;
        }
        p {
          font-size: 26px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
