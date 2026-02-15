// import mongoose from "mongoose";

// const MenuSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Menu ||
//   mongoose.model("Menu", MenuSchema);


// import mongoose from "mongoose";

// const MenuSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Menu ||
//   mongoose.model("Menu", MenuSchema);


import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "General" },
    image: { type: String, default: "" } // optional
  },
  { timestamps: true }
);

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);
