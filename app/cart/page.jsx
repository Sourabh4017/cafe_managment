"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    if (!tableNumber) {
      alert("Enter table number");
      return;
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tableNumber,
        items: cart,
        total
      })
    });

    if (res.ok) {
      localStorage.removeItem("cart");
      router.push("/order-status");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.map((item, i) => (
        <div key={i} className="flex justify-between border-b py-2">
          <span>{item.name}</span>
          <span>₹{item.price}</span>
        </div>
      ))}

      <p className="font-bold mt-4">Total: ₹{total}</p>

      <input
        type="number"
        placeholder="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        className="border p-2 w-full mt-4"
      />

      <button
        onClick={placeOrder}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
