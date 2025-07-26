import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log("Database Connected Sucesfully!")
  } catch (error) {
    console.error(`MongoDb Connection error`,error)
    process.exit(1)
  }
}