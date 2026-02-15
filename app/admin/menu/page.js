

"use client";

import { useEffect, useState } from "react";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("General");
  const [image, setImage] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  /* ================= FETCH MENU ================= */
  const fetchMenu = async () => {
    const res = await fetch("/api/menu");
    setMenu(await res.json());
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  /* ================= ADD ================= */
  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, category, image }),
    });

    setName("");
    setPrice("");
    setCategory("General");
    setImage("");
    fetchMenu();
  };

  /* ================= DELETE ================= */
  const handleDelete = async (_id) => {
    if (!confirm("Delete this menu item?")) return;
    await fetch(`/api/menu/${_id}`, { method: "DELETE" });
    fetchMenu();
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async () => {
    await fetch(`/api/menu/${editingItem._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingItem),
    });
    setEditingItem(null);
    fetchMenu();
  };

  return (
    <div className="page">
      <h1>🌸 Menu Management</h1>
      <p className="subtitle">• Admin Control Panel</p>

      {/* ================= ADD FORM ================= */}
      <form onSubmit={handleAdd} className="form">
        <h2>➕ Add New Item</h2>

        <input
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="General">🍽 General</option>
          <option value="Sushi">🍣 Sushi</option>
          <option value="Ramen">🍜 Ramen</option>
          <option value="Drinks">☕ Drinks</option>
          <option value="Desserts">🍰 Desserts</option>
        </select> */}

        <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="General">🍽 General</option>
  <option value="Starters">🥗 Starters</option>
  <option value="Tandoor">🔥 Tandoor</option>
  <option value="Main Course">🍛 Main Course</option>

  <option value="Rice">🍚 Rice Dishes</option>
  <option value="Breads">🥖 Breads (Roti, Naan)</option>
  <option value="South Indian">🥥 South Indian</option>
  <option value="North Indian">🫓 North Indian</option>
  <option value="Chinese">🥢 Chinese</option>

  <option value="Sushi">🍣 Sushi</option>
  <option value="Ramen">🍜 Ramen</option>
  <option value="Drinks">☕ Drinks</option>
  <option value="Desserts">🍰 Desserts</option>
  <option value="Desserts">🍰 Desserts</option>
  <option value="Italian">🍝 Italian</option>
</select>


        <input
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {image && <img src={image} className="preview" />}

        <button>🌸 Add Item</button>
      </form>

      {/* ================= MENU TABLE ================= */}
      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {menu.map((item) => (
              <tr key={item._id}>
                <td>🍱 {item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>
                  {item.image ? (
                    <img src={item.image} className="thumb" />
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  <button
                    className="edit"
                    onClick={() => setEditingItem({ ...item })}
                  >
                    ✏ Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingItem && (
        <div className="overlay">
          <div className="modal">
            <h2>🌸 Edit Menu Item</h2>

            <input
              value={editingItem.name}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
            />

            <input
              type="number"
              value={editingItem.price}
              onChange={(e) =>
                setEditingItem({ ...editingItem, price: e.target.value })
              }
            />

            <select
              value={editingItem.category}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  category: e.target.value,
                })
              }
            >
             <option value="General">🍽 General</option>
  <option value="Starters">🥗 Starters</option>
  <option value="Tandoor">🔥 Tandoor</option>
  <option value="Main Course">🍛 Main Course</option>

  <option value="Rice">🍚 Rice Dishes</option>
  <option value="Breads">🥖 Breads (Roti, Naan)</option>
  <option value="South Indian">🥥 South Indian</option>
  <option value="North Indian">🫓 North Indian</option>
  <option value="Chinese">🥢 Chinese</option>

  <option value="Sushi">🍣 Sushi</option>
  <option value="Ramen">🍜 Ramen</option>
  <option value="Drinks">☕ Drinks</option>
  <option value="Desserts">🍰 Desserts</option>
  <option value="Italian">🍝 Italian</option>
            </select>

            <input
              value={editingItem.image || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, image: e.target.value })
              }
            />

            {editingItem.image && (
              <img src={editingItem.image} className="preview" />
            )}

            <div className="actions">
              <button onClick={() => setEditingItem(null)}>Cancel</button>
              <button className="save" onClick={handleUpdate}>
                🌸 Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .page {
          min-height: 100vh;
          padding: 30px;
          background: linear-gradient(135deg, #1a1a1a, #2a0f1f);
          color: #fdf2f8;
          font-family: "Georgia", serif;
        }

        h1 {
          font-size: 32px;
        }

        .subtitle {
          color: #fbcfe8;
          margin-bottom: 25px;
        }

        .form {
          background: #fff;
          color: #000;
          padding: 20px;
          border-radius: 14px;
          max-width: 420px;
          margin-bottom: 30px;
        }

        input,
        select {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border-radius: 6px;
          border: 1px solid #ccc;
        }

        .preview {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 10px;
          margin-top: 10px;
        }

        button {
          padding: 10px 16px;
          background: #881337;
          color: #fff;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }

        .tableWrap {
          background: #fff;
          border-radius: 14px;
          padding: 20px;
          color: #000;
        }

        .thumb {
          height: 40px;
          border-radius: 4px;
        }

        .edit {
          background: #2563eb;
          margin-right: 6px;
        }

        .delete {
          background: #dc2626;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: #fff;
          padding: 25px;
          width: 380px;
          border-radius: 14px;
        }

        .save {
          background: #16a34a;
        }
      `}</style>
    </div>
  );
}
