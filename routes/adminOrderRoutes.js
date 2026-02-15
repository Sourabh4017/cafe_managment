import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

export default router;
