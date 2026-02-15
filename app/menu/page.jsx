//=========================================Fully Working Customer Menu Page=========================================

// "use client";

// import { useEffect, useState } from "react";

// export default function CustomerMenuPage() {
//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [tableNo, setTableNo] = useState("");

//   /* ================= LOAD MENU ================= */
//   useEffect(() => {
//     fetch("/api/menu")
//       .then((res) => res.json())
//       .then(setMenu)
//       .catch(() => alert("Failed to load menu"));
//   }, []);

//   /* ================= GROUP BY CATEGORY ================= */
//   const groupedMenu = menu.reduce((acc, item) => {
//     const cat = item.category || "General";
//     if (!acc[cat]) acc[cat] = [];
//     acc[cat].push(item);
//     return acc;
//   }, {});

//   /* ================= CART LOGIC ================= */
//   const addToCart = (item) => {
//     setCart((prev) => {
//       const found = prev.find((i) => i._id === item._id);
//       if (found) {
//         return prev.map((i) =>
//           i._id === item._id ? { ...i, qty: i.qty + 1 } : i
//         );
//       }
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   const updateQty = (id, delta) => {
//     setCart((prev) =>
//       prev
//         .map((i) =>
//           i._id === id ? { ...i, qty: i.qty + delta } : i
//         )
//         .filter((i) => i.qty > 0)
//     );
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((i) => i._id !== id));
//   };

//   const total = cart.reduce(
//     (sum, i) => sum + i.price * i.qty,
//     0
//   );

//   /* ================= PLACE ORDER ================= */
//   const placeOrder = async () => {
//     if (!tableNo.trim()) return alert("Table number required");
//     if (cart.length === 0) return alert("Cart is empty");

//     const res = await fetch("/api/order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ tableNo, items: cart, total }),
//     });

//     if (!res.ok) return alert("Order failed");

//     alert("Order placed successfully!");
//     setCart([]);
//     setTableNo("");
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="page">
//       {/* HEADER */}
//       <header className="header">
//         <h1>🍵 Café Sourabh</h1>
//         <p>Japanese Style Menu</p>
//       </header>

//       {/* TABLE INPUT */}
//       <div className="table-input">
//         <input
//           placeholder="Table No"
//           value={tableNo}
//           onChange={(e) => setTableNo(e.target.value)}
//         />
//       </div>

//       <div className="layout">
//         {/* MENU */}
//         <div>
//           {Object.keys(groupedMenu).map((category) => (
//             <section key={category} className="category-section">
//               <h2 className="category-title">
//                 {category}
//               </h2>

//               <div className="menu-grid">
//                 {groupedMenu[category].map((item) => (
//                   <div key={item._id} className="card">
//                     <img
//                       src={item.image || "/placeholder.png"}
//                       alt={item.name}
//                     />
//                     <h3>🍴 {item.name}</h3>
//                     <p className="price">₹{item.price}</p>
//                     <button onClick={() => addToCart(item)}>
//                       Add
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           ))}
//         </div>

//         {/* CART */}
//         <aside className="cart">
//           <h2>🛒 Cart</h2>

//           {cart.length === 0 && (
//             <p className="empty">No items added</p>
//           )}

//           {cart.map((item) => (
//             <div key={item._id} className="cart-row">
//               <span>{item.name}</span>

//               <div className="qty">
//                 <button onClick={() => updateQty(item._id, -1)}>
//                   -
//                 </button>
//                 <span>{item.qty}</span>
//                 <button onClick={() => updateQty(item._id, 1)}>
//                   +
//                 </button>
//               </div>

//               <span>₹{item.price * item.qty}</span>

//               <button
//                 className="remove"
//                 onClick={() => removeFromCart(item._id)}
//               >
//                 ✕
//               </button>
//             </div>
//           ))}

//           <div className="total">
//             Total: ₹{total}
//           </div>

//           <button className="order-btn" onClick={placeOrder}>
//             Place Order
//           </button>
//         </aside>
//       </div>

//       {/* STYLES */}
//       <style jsx>{`
//         .page {
//           background: #f6f4ef;
//           min-height: 100vh;
//           font-family: "Segoe UI", sans-serif;
//         }

//         .header {
//           background: #1f1f1f;
//           color: #fff;
//           padding: 20px;
//           text-align: center;
//         }

//         .table-input {
//           text-align: center;
//           margin: 20px 0;
//         }

//         .table-input input {
//           padding: 10px;
//           width: 160px;
//           border-radius: 6px;
//           border: 1px solid #ccc;
//         }

//         .layout {
//           display: grid;
//           grid-template-columns: 3fr 1.2fr;
//           gap: 20px;
//           padding: 20px;
//           max-width: 1200px;
//           margin: auto;
//         }

//         .category-section {
//           margin-bottom: 40px;
//         }

//         .category-title {
//           font-size: 26px;
//           margin-bottom: 16px;
//           border-left: 6px solid #c0392b;
//           padding-left: 12px;
//           color: #2c2c2c;
//         }

//         .menu-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: 20px;
//         }

//         .card {
//           background: #fff;
//           border-radius: 14px;
//           padding: 14px;
//           text-align: center;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.08);
//         }

//         .card img {
//           width: 100%;
//           height: 140px;
//           object-fit: cover;
//           border-radius: 10px;
//         }

//         .price {
//           color: #c0392b;
//           font-weight: bold;
//         }

//         .card button {
//           margin-top: 10px;
//           padding: 8px 14px;
//           background: #2c2c2c;
//           color: #fff;
//           border-radius: 6px;
//         }

//         .cart {
//           background: #fff;
//           border-radius: 14px;
//           padding: 16px;
//           box-shadow: 0 8px 20px rgba(0,0,0,0.1);
//           position: sticky;
//           top: 20px;
//           height: fit-content;
//         }

//         .cart-row {
//           display: grid;
//           grid-template-columns: 1fr auto auto auto;
//           align-items: center;
//           gap: 6px;
//           margin-bottom: 10px;
//         }

//         .qty button {
//           padding: 4px 8px;
//         }

//         .remove {
//           color: red;
//           font-weight: bold;
//         }

//         .total {
//           font-size: 18px;
//           font-weight: bold;
//           margin: 15px 0;
//         }

//         .order-btn {
//           width: 100%;
//           padding: 12px;
//           background: #000;
//           color: #fff;
//           border-radius: 8px;
//           font-size: 16px;
//         }

//         @media (max-width: 768px) {
//           .layout {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

//=========================================Enhanced Customer Menu Page with Search, Filter, Sort, and Custom Table Option=========================================

"use client";

import { useEffect, useState } from "react";

export default function CustomerMenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNo, setTableNo] = useState("");
  const [customTable, setCustomTable] = useState("");
  const [useCustomTable, setUseCustomTable] = useState(false);
  const [tableError, setTableError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortType, setSortType] = useState("");

  /* ================= LOAD MENU ================= */
  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then(setMenu)
      .catch(() => alert("Failed to load menu"));

    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  /* ================= SAVE CART ================= */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= FILTER + SEARCH + SORT ================= */
  let filteredMenu = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedCategory !== "All") {
    filteredMenu = filteredMenu.filter(
      (item) => item.category === selectedCategory
    );
  }

  if (sortType === "low") {
    filteredMenu.sort((a, b) => a.price - b.price);
  } else if (sortType === "high") {
    filteredMenu.sort((a, b) => b.price - a.price);
  }

  const groupedMenu = filteredMenu.reduce((acc, item) => {
    const cat = item.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categories = ["All", ...new Set(menu.map((i) => i.category))];

  /* ================= CART LOGIC ================= */
  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i._id === item._id);
      if (found) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i._id === id ? { ...i, qty: i.qty + delta } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    const finalTable = useCustomTable ? customTable : tableNo;

    if (!finalTable.trim()) {
      setTableError("Table number required");
      return;
    }

    if (!/^[0-9]+$/.test(finalTable)) {
      setTableError("Only numeric table numbers allowed");
      return;
    }

    if (cart.length === 0) return alert("Cart is empty");

    setTableError("");

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableNo: finalTable, items: cart, total }),
    });

    if (!res.ok) return alert("Order failed");

    alert("Order placed successfully!");
    setCart([]);
    setTableNo("");
    setCustomTable("");
  };

  /* ================= UI ================= */
  return (
    <div className="page">
      <header className="header">
        <h1>🍵 Café Sourabh</h1>
        <span className="cart-badge">🛒 {cart.length}</span>
      </header>

      {/* TABLE SECTION */}
      <div className="table-section">
        <label>Select Table</label>

        <select
          value={useCustomTable ? "custom" : tableNo}
          onChange={(e) => {
            if (e.target.value === "custom") {
              setUseCustomTable(true);
              setTableNo("");
            } else {
              setUseCustomTable(false);
              setTableNo(e.target.value);
            }
          }}
        >
          <option value="">Choose Table</option>
          {[...Array(20)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Table {i + 1}
            </option>
          ))}
          <option value="custom">Custom Table</option>
        </select>

        {useCustomTable && (
          <input
            type="text"
            placeholder="Enter Table Number"
            value={customTable}
            onChange={(e) =>
              setCustomTable(e.target.value.replace(/\D/g, ""))
            }
          />
        )}

        {tableError && (
          <p className="error">{tableError}</p>
        )}
      </div>

      {/* SEARCH + FILTER (unchanged) */}
      <div className="controls">
        <input
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>

      {/* EXISTING LAYOUT UNCHANGED BELOW */}
      <div className="layout">
        <div>
          {Object.keys(groupedMenu).map((category) => (
            <section key={category}>
              <h2 className="category-title">{category}</h2>

              <div className="menu-grid">
                {groupedMenu[category].map((item) => (
                  <div key={item._id} className="card">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                    />
                    <h3>{item.name}</h3>
                    <p className="price">₹{item.price}</p>

                    {item.price > 400 && (
                      <span className="badge">⭐ Popular</span>
                    )}

                    <button onClick={() => addToCart(item)}>
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="cart">
          <h2>Cart</h2>

          {cart.map((item) => (
            <div key={item._id} className="cart-row">
              <span>{item.name}</span>
              <div>
                <button onClick={() => updateQty(item._id, -1)}>-</button>
                {item.qty}
                <button onClick={() => updateQty(item._id, 1)}>+</button>
              </div>
              <span>₹{item.price * item.qty}</span>
              <button onClick={() => removeFromCart(item._id)}>✕</button>
            </div>
          ))}

          <div className="total">Total: ₹{total}</div>

          <button onClick={clearCart}>Clear Cart</button>
          <button className="order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </aside>
      </div>

      <style jsx>{`
        .page { background:#f6f4ef; min-height:100vh; font-family:sans-serif; }
        .header { background:#111; color:#fff; padding:15px; display:flex; justify-content:space-between; }
        .cart-badge { background:red; padding:5px 10px; border-radius:20px; }

        .table-section {
          text-align:center;
          padding:20px;
        }

        .table-section select,
        .table-section input {
          padding:8px;
          margin:5px;
          border-radius:6px;
        }

        .error { color:red; font-size:14px; }

        .controls { display:flex; gap:10px; padding:20px; justify-content:center; flex-wrap:wrap; }
        .controls input, .controls select { padding:8px; border-radius:6px; }

        .layout { display:grid; grid-template-columns:3fr 1.2fr; gap:20px; padding:20px; max-width:1200px; margin:auto; }

        .menu-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:20px; }

        .card { background:#fff; padding:12px; border-radius:12px; text-align:center; box-shadow:0 5px 15px rgba(0,0,0,0.08); position:relative; }
        .card img { width:100%; height:140px; object-fit:cover; border-radius:10px; }

        .badge { position:absolute; top:10px; right:10px; background:gold; padding:4px 8px; border-radius:6px; font-size:12px; }

        .cart { background:#fff; padding:15px; border-radius:12px; position:sticky; top:20px; height:fit-content; }

        .cart-row { display:grid; grid-template-columns:1fr auto auto auto; gap:6px; margin-bottom:8px; align-items:center; }

        .total { font-weight:bold; margin:10px 0; }

        .order-btn { width:100%; padding:10px; background:black; color:white; border-radius:8px; }

        @media(max-width:768px){
          .layout{ grid-template-columns:1fr; }
        }
      `}</style>
    </div>
  );
}
