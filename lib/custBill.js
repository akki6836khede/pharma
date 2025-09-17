import mongoose from "mongoose"

const CUSTOMER_BILL_URI = process.env.CUSTOMER_BILL_URI

if (!CUSTOMER_BILL_URI) {
  throw new Error("Please define the CUSTOMER_BILL_URI environment variable")
}

let cached = global.customerConn
if (!cached) {
  cached = global.customerConn = { conn: null, promise: null }
}

export async function connectToCustomerBillDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const conn = mongoose.createConnection(CUSTOMER_BILL_URI, {
      bufferCommands: false,
    })

    cached.promise = conn.asPromise()
  }

  cached.conn = await cached.promise
  return cached.conn
}