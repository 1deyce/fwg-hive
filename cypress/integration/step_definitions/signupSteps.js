import { Given, When, Then } from "cypress-cucumber-preprocessor";

Given("I am on the signup page", () => {
    cy.visit("/signup");
});

When("I enter my name {string}, email {string} and password {string}", (name, email, password) => {
    cy.get("#nameField").type(name);
    cy.get("#emailField").type(email);
    cy.get("#passwordField").type(password);
});

When('I click the "Sign Up" button', () => {
    cy.get("#signUpButton").click();
});

Then("I should see a message {string}", (expectedMessage) => {
    cy.get("#messageBox").should("contain.text", expectedMessage);
});

Then("I should be redirected to {string}", (expectedUrl) => {
    cy.url().should("eq", Cypress.config().baseUrl + expectedUrl);
});