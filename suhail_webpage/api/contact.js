export default async function handler(req, res) {
  // Only allow POST requests for this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { fullName, email, phone, location, service, html_message } = req.body;

    // We fetch these from the server environment (e.g., Vercel dashboard or .env.local)
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
    const RECEIVER_EMAIL = process.env.BREVO_RECEIVER_EMAIL;

    if (!BREVO_API_KEY || !SENDER_EMAIL || !RECEIVER_EMAIL) {
      console.error('Missing Brevo credentials strictly required for sending emails.');
      return res.status(500).json({ message: 'Server configuration error: Missing Brevo API keys or email addresses' });
    }

    // Structure the payload exactly as Brevo v3 API requires
    const payload = {
      sender: { name: fullName || "Website Contact Form", email: SENDER_EMAIL },
      to: [{ email: RECEIVER_EMAIL }],
      subject: `New Service Inquiry: ${service || "General"}`,
      htmlContent: html_message,
      replyTo: { email: email, name: fullName }
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      return res.status(response.status).json({ message: 'Failed to send email via Brevo', details: errorData });
    }

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Internal API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
