import Menu from "@/models/Menu";
import connectDB from "@/lib/db";

export async function POST(req) {
  await connectDB();

  const { name, price, image, category } = await req.json();

  if (!name || !price) {
    return Response.json(
      { message: "Name and price required" },
      { status: 400 }
    );
  }

  const item = await Menu.create({
    name,
    price,
    image: image || "", // ✅ EXPLICITLY SET
    category: category || "General",
  });

  return Response.json(item, { status: 201 });
}
