"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/order");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Table No</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border">
              <td className="p-2 border text-center">
                {order.tableNo}
              </td>
              <td className="p-2 border">
                {JSON.parse(order.items).map((item, i) => (
                  <div key={i}>
                    {item.name} – ₹{item.price}
                  </div>
                ))}
              </td>
              <td className="p-2 border text-center">
                ₹{order.total}
              </td>
              <td className="p-2 border text-center">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
