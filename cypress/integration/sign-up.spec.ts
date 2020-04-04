// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

context("Sign up", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:3001");
  });

  describe("sign up button", () => {
    it("is disabled if no values are entered", () => {
      cy.get('input[type="submit"]').should("be.disabled");
    });

    it("is disabled if only email is entered", () => {
      cy.get('input[type="email"]').type("ike18t@gmail.com");

      cy.get('input[type="submit"]').should("be.disabled");
    });

    it("is disabled if email is not present but passwords are valid", () => {
      cy.get(".password").type("password");
      cy.get(".confirmPassword").type("password");

      cy.get('input[type="submit"]').should("be.disabled");
    });

    it("is disabled if passwords do not match", () => {
      cy.get('input[type="email"]').type("ike18t@gmail.com");
      cy.get(".password").type("password");
      cy.get(".confirmPassword").type("password1");

      cy.get('input[type="submit"]').should("be.disabled");
    });
  });

  it("does not sign the user up if email is invalid", () => {
    cy.get('input[type="email"]').type("ike18t");
    cy.get(".password").type("password");
    cy.get(".confirmPassword").type("password");
    cy.get('input[type="submit"]').click();

    cy.get(".ReactModalPortal").should("not.contain.text");
  });

  it("successfully signs up the user", () => {
    cy.get('input[type="email"]').type("ike18t@gmail.com");
    cy.get(".password").type("password");
    cy.get(".confirmPassword").type("password");
    cy.get('input[type="submit"]').click();

    cy.get(".ReactModalPortal").should(
      "contain.text",
      "You are now registered!"
    );
  });
});
