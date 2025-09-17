"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/User"

import { revalidatePath } from "next/cache"

import { connectToCustomerBillDB } from "@/lib/custBill"
import { getCustomerBillModel } from "@/models/CustomerBills"

export async function saveBillData(customerName, billAmount, billObject) {
    const billConn = await connectToCustomerBillDB()
    await connectToDB()

    const session = await getServerSession(authOptions)
    if (!session) throw new Error("Not authenticated")

    const email = session.user?.email
    const user = await User.findOne({ email })
    if (!user) throw new Error("User not found")


    const userId = user._id

    const CustomBill = getCustomerBillModel(billConn)

    await CustomBill.create({
        customerName: customerName,
        billAmount: billAmount,
        billObject: billObject,
        createdBy: userId,
    })
    revalidatePath(`/salesPage`)
    return { success: true }
}