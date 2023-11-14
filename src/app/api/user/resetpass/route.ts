import User from "@/models/userModel"
import { connectToDatabase } from "@/db/dbConnection"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connectToDatabase()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { token, password } = reqBody

    const hashPassword = await bcryptjs.hash(password, 10)

    const user = await User.findOneAndUpdate(
      {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      },
      {
        $set: {
          password: hashPassword,
        },
      },
      { new: true }
    )

    if (!user) {
      return NextResponse.json({
        error: "invalid token",
        success: false,
      })
    }

    user.forgotPasswordToken = undefined
    user.forgotPasswordTokenExpiry = undefined

    await user.save()

    return NextResponse.json({
      message: "password reset successfully",
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "error resetting password!",
        success: false,
      },
      { status: 505 }
    )
  }
}
