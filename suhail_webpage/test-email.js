import 'dotenv/config';

async function testEmail() {
  console.log("Starting automated email test...");

  // Force loading from .env.local for testing
  import('dotenv').then(dotenv => {
    dotenv.config({ path: '.env.local' });
    runTest();
  });
}

async function runTest() {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
  const RECEIVER_EMAIL = process.env.BREVO_RECEIVER_EMAIL;

  console.log("Checking API Keys...");
  console.log("Sender Email:", SENDER_EMAIL);
  console.log("Receiver Email:", RECEIVER_EMAIL);

  if (!BREVO_API_KEY) {
    console.error("❌ ERROR: BREVO_API_KEY is missing in .env.local");
    return;
  }
  if (!SENDER_EMAIL || !RECEIVER_EMAIL) {
    console.error("❌ ERROR: SENDER_EMAIL or RECEIVER_EMAIL is missing in .env.local");
    return;
  }

  const payload = {
    sender: { name: "Automated Tester", email: SENDER_EMAIL },
    to: [{ email: RECEIVER_EMAIL }],
    subject: "Automated Test Email from Suhail Webpage",
    htmlContent: "<h2>Success!</h2><p>This automated test confirms that your Brevo API is working perfectly!</p>",
    replyTo: { email: "test@example.com", name: "Tester" }
  };

  try {
    console.log(`Sending ping to Brevo API...`);
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
      console.error('❌ Brevo API Error:', JSON.stringify(errorData, null, 2));
      console.error('This means Brevo rejected the email (usually because the sender is unverified).');
      return;
    }

    console.log("✅ SUCCESS! The email was sent via Brevo.");
    console.log(`Check your inbox at: ${RECEIVER_EMAIL}!`);
  } catch (error) {
    console.error('❌ Network Error:', error.message);
  }
}

testEmail();
