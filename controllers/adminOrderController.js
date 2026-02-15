import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await prisma.order.update({
    where: { id: Number(id) },
    data: { status },
  });

  res.json({ message: "Order status updated" });
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  await prisma.order.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Order deleted" });
};
