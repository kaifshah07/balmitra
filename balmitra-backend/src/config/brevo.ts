import { BrevoClient } from "@getbrevo/brevo";

export const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY as string,
});

// ========================================
// OTP EMAIL
// ========================================

export async function sendOtpEmail(
  email: string,
  name: string,
  otp: string
) {
  try {
    console.log("📧 Sending OTP email...");
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("OTP:", otp);

    const result =
      await brevo.transactionalEmails.sendTransacEmail({
        sender: {
          name: "Balmitra",
          email: process.env.BREVO_SENDER_EMAIL as string,
        },

        to: [
          {
            email,
            name,
          },
        ],

        subject: "Balmitra Email Verification OTP",

        htmlContent: `
          <html>
            <body>

              <h2>Welcome to Balmitra</h2>

              <p>Hello ${name},</p>

              <p>Your verification OTP is:</p>

              <h1>${otp}</h1>

              <p>This OTP is valid for 10 minutes.</p>

              <p>
                If you did not request this verification,
                please ignore this email.
              </p>

              <p>Balmitra Team</p>

            </body>
          </html>
        `,
      });

    console.log("✅ OTP email sent successfully");
    console.log("Message ID:", result.messageId);

    return result;

  } catch (error: any) {
    console.error("❌ BREVO ERROR:");
    console.error("Message:", error?.message);
    console.error("Status:", error?.statusCode);
    console.error("Body:", error?.body);
    console.error("Full Error:", error);

    throw new Error(
      error?.message ||
        "Unable to send verification email"
    );
  }
}