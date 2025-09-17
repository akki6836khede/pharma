"use server"

import { connectToMedicineDB } from "@/lib/medicineDB"
import { getMedicineModel } from "@/models/Medicine"
import { revalidatePath } from "next/cache"

export async function changePrice(formData) {
  const _id = formData.get("_id")
  const email = formData.get("email")
  const price = Number(formData.get("price"))

  const stockConnection = await connectToMedicineDB()
  const med = getMedicineModel(stockConnection)

  const updatedStock = await med.findByIdAndUpdate(
    _id,
    { $set: { productPrice: price } },
    { new: true }
  )

  revalidatePath(`/userpage/${email}`)
  return {succes:true}
}