✅ User Signup and Email Verification Automation using Cypress + MailSlurp
🔹 Objective
This project automates and validates the user signup and email verification flow on the MailSlurp Playground, using temporary email addresses generated via the MailSlurp API.

The goal is to:

Test the complete signup flow including email verification

Use temporary inboxes for each test run (no real emails required)

Demonstrate integration of MailSlurp API with Cypress

🧪 Test Flow Overview
Create a new MailSlurp inbox using the API

Use the generated email address to sign up

Wait for the verification email

Extract the verification code from the email body using RegEx

Enter the code into the UI to complete verification

🔧 Tech Stack
Cypress – Frontend test automation

MailSlurp API – Temporary email generation & email retrieval

JavaScript – Scripting language

Regex – For extracting verification code from the email

🔐 Setup Instructions
Clone this repository

bash
Copy
Edit
git clone https://github.com/your-username/automation-email-verification.git
cd automation-email-verification
Install dependencies

bash
Copy
Edit
npm install
Get a MailSlurp API Key

Sign up at MailSlurp

Go to your dashboard → API Key

Add your MailSlurp API key to cypress.config.js

js
Copy
Edit
env: {
  MAILSLURP_API_KEY: "your-api-key-here"
}
Run the tests

bash
Copy
Edit
npx cypress open
# OR
npx cypress run
📁 Folder Structure
lua
Copy
Edit
📦 automation-email-verification
┣ 📁 cypress
┃ ┣ 📁 e2e
┃ ┃ ┗ 📜 email_verification.cy.js  --> Main test file
┃ ┣ 📁 support
┃ ┃ ┣ 📜 commands.js               --> Custom commands for MailSlurp
┃ ┃ ┗ 📜 e2e.js
┣ 📜 cypress.config.js             --> Cypress configuration
┣ 📜 package.json
┣ 📜 README.md
🔎 Important Concepts
✅ Custom Command: createInbox
js
Copy
Edit
Cypress.Commands.add('createInbox', () => {
  const mailslurp = new MailSlurp({ apiKey: Cypress.env('MAILSLURP_API_KEY') });
  return mailslurp.createInbox();
});
Creates a disposable email inbox.

✅ Custom Command: waitForLatestEmail
js
Copy
Edit
Cypress.Commands.add('waitForLatestEmail', (inboxId, timeout = 30000) => {
  const mailslurp = new MailSlurp({ apiKey: Cypress.env('MAILSLURP_API_KEY') });
  return mailslurp.waitForLatestEmail(inboxId, timeout);
});
Waits for a verification email in the generated inbox.

🧠 Why match[1] is used?
We extract a 6-digit verification code from the email body using this RegEx:

js
Copy
Edit
const regex = /Your Demo verification code is\s*(\d{6})/;
Then:

js
Copy
Edit
const match = email.body.match(regex);
const verificationCode = match[1];
match[0]: entire matched string (e.g. Your Demo verification code is 123456)

match[1]: only the 6-digit code (123456) → ✅ this is what we want

🎯 Demo Highlights
Uses real email-based verification flow with no manual work

Shows end-to-end test of user registration

Integrates external API (MailSlurp) with Cypress automation

Demonstrates usage of Regex, error handling, and async email polling

✅ Example Screenshot
(Add a screenshot of the test run here if available)

✨ Author
Shwetha Acharya
📧 shwethaacharya829@gmail.com
