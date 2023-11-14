import User from "@/models/userModel"
import { connectToDatabase } from "@/db/dbConnection"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"

connectToDatabase()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody

    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

    // send a veirification email
    await sendEmail({ email: email, emailType: "VERIFY", userId: newUser._id })

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }
}
