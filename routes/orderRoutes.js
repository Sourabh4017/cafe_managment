import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { tableNo, items, total } = req.body;

  const order = await prisma.order.create({
    data: {
      tableNo,
      items: JSON.stringify(items),
      total,
    },
  });

  res.json({ message: "Order placed", order });
});

export default router;
