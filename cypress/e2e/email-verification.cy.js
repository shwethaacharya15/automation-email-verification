
describe('User Signup and Email Verification Flow', () => {
  let testInbox;// This will hold our temporary email inbox details

  // Before each test, create a new temporary email address
  beforeEach(() => {
    cy.createInbox().then(inbox => {
      testInbox = inbox;
      cy.log(`Created new email inbox: ${testInbox.emailAddress}`);
    });
  });

  it('should allow a user to sign up and verify their email on MailSlurp Playground', () => {
    //Visit the website and fill out the signup form
    cy.visit('/'); // Goes to the baseUrl we set in cypress.config.js 

    // Click the Create Account link to go to the signup form
    cy.get('[data-test="sign-in-create-account-link"]').click();

    // Type the email address from our temporary inbox
    cy.get(':nth-child(1) > [data-test="sign-up-non-phone-number-input"]').type(testInbox.emailAddress);

    // Type a password
    const userPassword = 'MySecretPassword123!';
    cy.get(':nth-child(2) > [data-test="sign-up-non-phone-number-input"]').type(userPassword);

    // Click the Create Account button
    cy.get('[data-test="sign-up-create-account-button"]').click();


     // Wait for and read the verification email
    cy.waitForLatestEmail(testInbox.id, 60000).then(email => { 
      cy.log(`Received email with subject: ${email.subject}`);
      cy.log(`FULL EMAIL BODY: ${email.body}`); 
      cy.wrap(email).as('verificationEmail'); // Save the email for later use
    });

      // Extract the verification code and enter it
    cy.get('@verificationEmail').then(email => {
     //email body
      const regex = /Your Demo verification code is\s*(\d{6})/; 
      const match = email.body.match(regex);

      if (match && match[1]) {
        const verificationCode = match[1];
        cy.log(`Extracted verification code: ${verificationCode}`);

        // The playground usually redirects to a page where you enter the code
        cy.get('[data-test="confirm-sign-up-confirmation-code-input"]').type(verificationCode);
       cy.get('[data-test="confirm-sign-up-confirm-button"]').click();

      } else {
        throw new Error('Verification code not found in the email body. (Regex mismatch)'); 
      }
    });

  })
})