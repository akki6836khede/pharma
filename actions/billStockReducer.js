"use server"

import { connectToMedicineDB } from "@/lib/medicineDB"
import { getMedicineModel } from "@/models/Medicine"
import { revalidatePath } from "next/cache"

export async function reduceStock(quantities, email) {
  const stockConnection = await connectToMedicineDB()
  const med = getMedicineModel(stockConnection)

  for (const [id, qty] of Object.entries(quantities)) {
    await med.findByIdAndUpdate(
      id,
      { $inc: { productStock: -qty } }, 
      { new: true }
    )
  }

  revalidatePath(`/userpage/${email}`)
  return { success: true }
}
