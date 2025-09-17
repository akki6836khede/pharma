import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

const CustomerBillSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  billAmount: { type: Number, required: true },
  billObject: { type: [billSchema], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export function getCustomerBillModel(connection) {
  return connection.models.CustomerBill || connection.model("CustomerBill", CustomerBillSchema);
}
