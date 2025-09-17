"use server";

import { connectToMedicineDB } from "@/lib/medicineDB";
import { getMedicineModel } from "@/models/Medicine";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { connectToDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function getArray() {
  const medicineConn = await connectToMedicineDB();
  await connectToDB();
  const Medicine = getMedicineModel(medicineConn);

  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not authenticated");

  const email = session.user?.email;
  const user = await User.findOne({ email }).lean();
  if (!user) throw new Error("User not found");

  const array = await Medicine.find({ createdBy: user._id }).lean();

  return array.map(doc => ({
    ...doc,
    _id: doc._id.toString(),
    createdBy: doc.createdBy.toString(),
  }));
}
