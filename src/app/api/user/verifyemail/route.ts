import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/db/dbConnection"
import User from "@/models/userModel"

connectToDatabase()

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json()
    const { token } = reqBody
    console.log(token)

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 })
    }

    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
