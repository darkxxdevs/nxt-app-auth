import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer"
import User from "@/models/userModel"

export const sendEmail = async ({ email, emailtype, userId }: any) => {
  try {
    // hashed token creation
    const hashedToken = bcryptjs.hash(userId.toString(), 10)

    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailtype === "RESET") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    }

    const transport = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    })

    const mailOptions = {
      from: "",
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
