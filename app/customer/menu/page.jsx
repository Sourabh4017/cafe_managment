"use client";

import { useEffect, useState } from "react";

export default function CustomerMenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [tableNo, setTableNo] = useState("");

  /* ==========================
     LOAD MENU FROM BACKEND
  ========================== */
  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(() => alert("Failed to load menu"));
  }, []);

  /* ==========================
     ADD TO CART
  ========================== */
  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
    setTotal(prev => prev + Number(item.price));
  };

  /* ==========================
     PLACE ORDER
  ========================== */
  const placeOrder = async () => {
    if (!tableNo.trim()) {
      alert("Table number required");
      return;
    }

    if (cart.length === 0) {
      alert("Add at least one item");
      return;
    }

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNo,
          items: cart,
          total,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Order failed");
        return;
      }

      alert("Order placed successfully");
      setCart([]);
      setTotal(0);
      setTableNo("");

    } catch {
      alert("Server error");
    }
  };

  /* ==========================
     UI
  ========================== */
  return (
    <div style={{ padding: 20 }}>
      <h1>Café Menu</h1>

      <label><strong>Table No:</strong></label>
      <input
        value={tableNo}
        onChange={(e) => setTableNo(e.target.value)}
        placeholder="Enter table number"
        style={{ marginLeft: 10 }}
      />

      <hr />

      {menu.map(item => (
        <div
          key={item._id}
          style={{
            background: "#fff",
            padding: 12,
            marginBottom: 10,
            borderRadius: 5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <strong>{item.name}</strong><br />
            ₹{item.price}
          </div>

          <button onClick={() => addToCart(item)}>
            Add
          </button>
        </div>
      ))}

      <hr />

      <h3>Total: ₹{total}</h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
