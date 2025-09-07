export async function POST(request) {
  try {
    const { email, university } = await request.json()

    // Validate required fields
    if (!email || !university) {
      return Response.json({ error: "Email and university are required" }, { status: 400 })
    }

    // Validate .edu email
    if (!email.endsWith(".edu")) {
      return Response.json({ error: "Please use your .edu email address" }, { status: 400 })
    }

    // Google Sheets Web App URL - replace with your actual URL
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL || "https://script.google.com/macros/s/AKfycbwubJtC7E4L9gl_RocsEbT4yJA1uYdc5v8zSf_4-U7N95FqJKfclDu5tUefAGUQYv4s/exec"

    // Send data to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        university,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit to Google Sheets")
    }

    return Response.json({ success: true, message: "Successfully joined waitlist" })
  } catch (error) {
    console.error("Waitlist submission error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
