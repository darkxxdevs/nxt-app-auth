import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getTokenData"
import { connectToDatabase } from "@/db/dbConnection"

connectToDatabase()

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request)

    const user = await User.findOne({ _id: userID }).select("-password")

    if (user) {
      return NextResponse.json({
        message: "success",
        userData: user,
      })
    } else {
      return NextResponse.json(
        {
          message: "User not found!",
        },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred",
      },
      { status: 500 }
    )
  }
}
