// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import 'cypress-iframe';


import { MailSlurp } from 'mailslurp-client';

// Command to create a new temporary email inbox
Cypress.Commands.add('createInbox', () => {
  const mailslurp = new MailSlurp({ apiKey: Cypress.env('MAILSLURP_API_KEY') });
  return mailslurp.createInbox();
});

// Command to wait for the latest email in an inbox
Cypress.Commands.add('waitForLatestEmail', (inboxId, timeout = 30000) => {
  const mailslurp = new MailSlurp({ apiKey: Cypress.env('MAILSLURP_API_KEY') });
  return mailslurp.waitForLatestEmail(inboxId, timeout);
});