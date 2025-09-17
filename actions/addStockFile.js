"use server"

import { connectToMedicineDB } from "@/lib/medicineDB"
import { getMedicineModel } from "@/models/Medicine"
import { revalidatePath } from "next/cache"

export async function updateStock(formData) {
  const _id = formData.get("_id")
  const email = formData.get("email")
  const currStock = Number(formData.get("currStock"))
  const addedStock = Number(formData.get("stock"))

  const newStock = currStock + addedStock

  const stockConnection = await connectToMedicineDB()
  const med = getMedicineModel(stockConnection)

  const updatedStock = await med.findByIdAndUpdate(
    _id,
    { $set: { productStock: newStock } },
    { new: true }
  )

  revalidatePath(`/userpage/${email}`)
  return {succes:true}
}
