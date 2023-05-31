const { describe } = require("mocha");

describe("Juice-Shop", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#/");
    cy.get(".cc-btn").click();
    cy.get('[aria-label="Close Welcome Banner"]').click();
    // Click Account
    cy.get('#navbarAccount').click();
    // Click Login
    cy.get('#navbarLoginButton').click();
    // Email Field
    cy.get('#email').type('demo');
    // Password field
    cy.get('#password').type('demo');
    // Login button
    cy.get('#loginButton').click();
    
  });

  it("Search Lemon", () => {
    // Type Lemmon in search bar, click enter
    cy.get("#searchQuery").click();
    cy.get("#mat-input-0").type('Lemon Juice {enter}');
    // Validate that we can see box with -> Lemon Juice (500ml)
    cy.get('.item-name').should('have.text', ' Lemon Juice (500ml) ');
  });

  it("Search 500ml", () => {
    // Type 500ml in search bar, click enter
    cy.get(".mat-search_icon-search").click();
    cy.get("#mat-input-0").type('500ml {enter}');
    // Validate that we can see the folowing boxes:
    // 1.Eggfruit Juice (500ml)
    // 2.Lemon Juice (500ml)
    // 3.Strawberry Juice (500ml)
    cy.get('.item-name').should("contain.text", "Eggfruit Juice (500ml)");
    cy.get('.item-name').should("contain.text", "Lemon Juice (500ml)");
    cy.get('.item-name').should("contain.text", "Strawberry Juice (500ml)");
  });

  it.only("Items per page scenario", () => {
    // Select 12 items per page
    cy.get(".mat-select-value").click();
    cy.get(".mat-option-text").contains("12").click({ force: true });
    // validate that we see 12 boxes
    cy.get(".product").should("have.length", 12);
    // Select 12 items per page
    cy.get(".mat-select-value").click();
    cy.get(".mat-option-text").contains("12").click({ force: true });
    // validate that we see 12 boxes
    cy.get(".product").should("have.length", 12);
    // Select 36 items per page
    cy.get(".mat-select-value").click();
    cy.get(".mat-option-text").contains("36").click({ force: true });
    // Validate that we see 35 boxes
    cy.get(".product").should("have.length", 35);
  });

});

describe("Juice-Shop without login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".cc-btn").click();
    cy.get('[aria-label="Close Welcome Banner"]').click();
  })
})

it.only("Register a new user", () => {
  // Click account
  cy.get('#navbarAccount').click();
  // Click login
  cy.get('#navbarLoginButton').click();
  // Click Not yet a customer?
  cy.get("#newCustomerLink").click();
  // Input email
  cy.get('#email').type('demo@demo.com');
  // Input password
  cy.get('#password').type('demo');
  // Input repeat password
  cy.get('#repeatPasswordControl').type('demo1');
  // Input Security Question - Your favorite movie?
  cy.get('.mat-from-field-infix').type('demo1');
  cy.get('.mat-optional-text').contains('Your favorite movie').click();
  // Input Answer to security question
  cy.get('#securityAnswerControl').type('demo1');
  // Click Register
  cy.get("#registerButton").click();
  // Validate that we on login page - we email and password field should be visible
  cy.get('#email').should('be.visible');
});