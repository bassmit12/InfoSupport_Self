import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
        notes: {
          type: String, // Change the type accordingly if notes have a specific format
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Cooking", "Served", "Paid"],
      default: "Pending",
    },
    // total cost of the order
    total: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    // You can add more fields if needed, such as payment method, timestamps for each status change, etc.
  },
  {
    timestamps: true, // This will add 'createdAt' and 'updatedAt' timestamps
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
