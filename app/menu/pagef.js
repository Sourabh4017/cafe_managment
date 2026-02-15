// "use client";

// import { useEffect, useState } from "react";

// export default function CustomerMenu() {
//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     fetch("/api/menu")
//       .then((res) => res.json())
//       .then(setMenu);
//   }, []);

//   const addToCart = (item) => {
//     setCart([...cart, item]);
//   };

//   const total = cart.reduce((sum, item) => sum + item.price, 0);

//   const placeOrder = async () => {
//     await fetch("/api/order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: cart, total }),
//     });

//     alert("Order placed successfully");
//     setCart([]);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Menu</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {menu.map((item) => (
//           <div key={item.id} className="border p-4 rounded shadow">
//             <img
//               src={item.image}
//               className="h-40 w-full object-cover mb-2"
//               alt={item.name}
//             />
//             <h2 className="font-semibold">{item.name}</h2>
//             <p>₹{item.price}</p>
//             <button
//               onClick={() => addToCart(item)}
//               className="mt-2 bg-black text-white px-3 py-1 rounded"
//             >
//               Add to Order
//             </button>
//           </div>
//         ))}
//       </div>

//       {cart.length > 0 && (
//         <div className="mt-8 bg-gray-100 p-4 rounded">
//           <h2 className="text-xl font-bold mb-2">Your Order</h2>

//           <ul>
//             {cart.map((item, i) => (
//               <li key={i}>
//                 {item.name} – ₹{item.price}
//               </li>
//             ))}
//           </ul>

//           <p className="mt-2 font-semibold">Total: ₹{total}</p>

//           <button
//             onClick={placeOrder}
//             className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Place Order
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function CustomerMenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH MENU ---------------- */
  const fetchMenu = async () => {
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.error("Failed to load menu", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>

      {loading && (
        <p className="text-center text-gray-500">Loading menu...</p>
      )}

      {!loading && menu.length === 0 && (
        <p className="text-center text-gray-500">No items available</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menu.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            {/* IMAGE */}
            <div className="h-40 flex items-center justify-center mb-3">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-cover rounded"
                  onError={(e) =>
                    (e.currentTarget.style.display = "none")
                  }
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            {/* NAME */}
            <h2 className="text-xl font-semibold">{item.name}</h2>

            {/* PRICE */}
            <p className="text-lg font-bold text-gray-700 mt-1">
              ₹{item.price}
            </p>

            {/* ADD TO CART (UI ONLY) */}
            <button
              disabled
              className="mt-4 w-full bg-gray-300 text-gray-600 py-2 rounded cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
