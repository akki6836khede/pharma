"use server"

import { connectToDB } from "@/lib/mongodb";
import {User} from "@/models/User";

export async function saveUserToDB({ name, email, image }) {
  await connectToDB();

  const user = await User.findOneAndUpdate(
    { email },
    { name, email, image },
    { new: true, upsert: true }
  );

  return JSON.parse(JSON.stringify(user));
}
