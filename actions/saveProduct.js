"use server"

import { connectToMedicineDB } from "@/lib/medicineDB"
import { getMedicineModel } from "@/models/Medicine"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/User"

import { revalidatePath } from "next/cache"

export async function saveProduct(formData) {
  const medicineConn = await connectToMedicineDB()
  await connectToDB()

  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Not authenticated")

  const email = session.user?.email
  const user = await User.findOne({ email })
  if (!user) throw new Error("User not found")

  const userId = user._id

  const productName = formData.get("productName")
  const productPrice = Number(formData.get("productPrice"))
  const productStock = Number(formData.get("productStock"))

  const Medicine = getMedicineModel(medicineConn)

  await Medicine.create({
    productName,
    productPrice,
    productStock,
    createdBy: userId,
  })
  revalidatePath(`/userpage/${email}`)
  return { success: true }
}


