import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";

const app = express();


app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/uploads", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
