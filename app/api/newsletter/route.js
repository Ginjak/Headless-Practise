import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter with Yahoo email service
const transporter = nodemailer.createTransport({
  service: "Yahoo",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Newsletter Subscription",
      text: `Email: ${email}`,
    };

    // Send the email and log the response
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);

    return NextResponse.json(
      { message: "Email sent successfully", info: info },
      { status: 200 }
    );
  } catch (error) {
    // Log the error if something goes wrong
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
