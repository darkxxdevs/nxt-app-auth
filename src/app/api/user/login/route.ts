import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import User from "@/models/userModel"
import { connectToDatabase } from "@/db/dbConnection"
import { NextRequest, NextResponse } from "next/server"

connectToDatabase()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { email, password } = reqBody

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exists!" },
        { status: 400 }
      )
    }

    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json({ error: "invaild password!" })
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    })

    const response = NextResponse.json({
      message: "login sucessful",
      success: true,
    })

    response.cookies.set("token", token, {
      httpOnly: true,
    })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
