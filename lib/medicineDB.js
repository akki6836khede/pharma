import mongoose from "mongoose"

const MEDICINE_DB_URI = process.env.MEDICINE_DB_URI

if (!MEDICINE_DB_URI) {
  throw new Error("Please define the MEDICINE_DB_URI environment variable")
}

let cached = global.medicineConn
if (!cached) {
  cached = global.medicineConn = { conn: null, promise: null }
}

export async function connectToMedicineDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const conn = mongoose.createConnection(MEDICINE_DB_URI, {
      bufferCommands: false,
    })

    cached.promise = conn.asPromise()
  }

  cached.conn = await cached.promise
  return cached.conn
}
