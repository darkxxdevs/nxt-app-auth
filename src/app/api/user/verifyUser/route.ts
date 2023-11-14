import { connectToDatabase } from "@/db/dbConnection"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/helpers/mailer"

connectToDatabase()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const user = await User.findOne({
      email: email,
    })

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found!",
          success: false,
        },
        { status: 404 }
      )
    }
    const mailresponse = await sendEmail({
      email: email,
      emailType: "RESET",
      userId: user._id,
    })

    return NextResponse.json({
      message: "mail sent sucessfully!",
      details: mailresponse,
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({
      error: "Error in password reseting",
      success: false,
    })
  }
}
