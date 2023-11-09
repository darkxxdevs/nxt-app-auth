import mongoose from "mongoose"

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!)
    const connection = mongoose.connection

    connection.on("connected", () => {
      console.log("Connected to Database")
    })

    connection.on("error", (err) => {
      console.log(
        "Error in dbConnection ! Please make sure mongodb is running " + err
      )
      process.exit(1)
    })
  } catch (error) {
    console.log("Something went wrong!", error)
  }
}
