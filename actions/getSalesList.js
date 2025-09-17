"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/User"

import { connectToCustomerBillDB } from "@/lib/custBill"
import { getCustomerBillModel } from "@/models/CustomerBills"

import { revalidatePath } from "next/cache"

export async function getSalesArray() {
  const billConn = await connectToCustomerBillDB()
  await connectToDB();
  const CustomBill = getCustomerBillModel(billConn)

  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not authenticated");

  const email = session.user?.email;
  const user = await User.findOne({ email }).lean();
  if (!user) throw new Error("User not found");

  const array = await CustomBill.find({ createdBy: user._id }).lean();
  revalidatePath(`/salesPage`)
  return array.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    createdBy: doc.createdBy.toString(),
  }));
}