// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema(
//   {
//     tableNumber: String,
//     items: Array,
//     total: Number,
//     status: {
//       type: String,
//       default: "Pending"
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Order ||
//   mongoose.model("Order", OrderSchema);

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    tableNumber: String,
    items: [
      {
        name: String,
        price: Number
      }
    ],
    total: Number,
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
