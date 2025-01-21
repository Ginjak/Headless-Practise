import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter with your email service
const transporter = nodemailer.createTransport({
  service: "Yahoo", // Or use a different email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true, // Use 'true' for TLS connection
});

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      property,
      propertySlug,
      name,
      surname,
      phone,
      email,
      postcode,
      message,
      moreDetails,
      viewProperty,
      recipientEmail,
    } = body;

    // Construct the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail, // You can send the email to a different recipient
      subject: `New Contact Form Submission for ${property}`,
      html: `
        <p><strong>Property:</strong> ${property}</p>
        <p><strong>Property link:</strong> <a href="${propertySlug}" target="_blank">${propertySlug}</a></p>
        <p><strong>Name:</strong> ${name} ${surname}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Postcode:</strong> ${postcode}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>More details:</strong> ${
          moreDetails === true ? "Yes" : "No"
        }</p>
        <p><strong>View property:</strong> ${
          viewProperty === true ? "Yes" : "No"
        }</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info);

    // Respond with success
    return NextResponse.json(
      { message: "Email sent successfully", info: info },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
