import mongoose from "mongoose"

const MedicineSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  productStock: Number,
  createdBy: mongoose.Schema.Types.ObjectId,
})

export function getMedicineModel(connection) {
  return connection.models.Medicine || connection.model("Medicine", MedicineSchema)
}
