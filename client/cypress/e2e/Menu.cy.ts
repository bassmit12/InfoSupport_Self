describe("Menu Page Functionality", () => {
  it("should display menu items", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000/");
    cy.get(".rounded-md").click();
    cy.get(":nth-child(1) > .bg-gray-50").clear("A");
    cy.get(":nth-child(1) > .bg-gray-50").type("Admin");
    cy.get(":nth-child(2) > .bg-gray-50").clear("A");
    cy.get(":nth-child(2) > .bg-gray-50").type("Admin");
    /* ==== End Cypress Studio ==== */
  });

  it("should add items to cart", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000/Menu");
    cy.get(":nth-child(1) > .bg-gray-50").clear("A");
    cy.get(":nth-child(1) > .bg-gray-50").type("Admin");
    cy.get(":nth-child(2) > .bg-gray-50").clear("A");
    cy.get(":nth-child(2) > .bg-gray-50").type("Admin");
    cy.get(".text-white").click();
    cy.contains("Logged in successfully").should("exist");
    cy.get(
      '[href="/item/6543bc890e2b2c0c77d38d46"] > .bg-white > .w-64'
    ).click();
    cy.get(".mt-8 > .bg-primary > h1").click();
    /* ==== End Cypress Studio ==== */
  });

  it("should change quantity and add notes", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000/Auth");
    cy.get(":nth-child(1) > .bg-gray-50").clear("A");
    cy.get(":nth-child(1) > .bg-gray-50").type("Admin");
    cy.get(".p-6 > .space-y-4 > :nth-child(2)").click();
    cy.get(":nth-child(2) > .bg-gray-50").clear("A");
    cy.get(":nth-child(2) > .bg-gray-50").type("Admin");
    cy.get(".text-white").click();
    cy.get(
      '[href="/item/6543bc890e2b2c0c77d38d46"] > .bg-white > .w-64'
    ).click();
    cy.get(".border-gray-100 > :nth-child(3)").click();
    cy.get(".border-gray-100 > :nth-child(3)").click();
    cy.get(".text-xl").should("have.text", "3");
    cy.get(".px-5").click();
    cy.get("#message").click();
    cy.get(".mt-8 > .bg-primary > h1").click();
    /* ==== End Cypress Studio ==== */
  });

  it("should change tab", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/Auth');
    cy.get(':nth-child(1) > .bg-gray-50').clear('A');
    cy.get(':nth-child(1) > .bg-gray-50').type('Admin');
    cy.get(':nth-child(2) > .bg-gray-50').clear('A');
    cy.get(':nth-child(2) > .bg-gray-50').type('Admin');
    cy.get('.text-white').click();
    cy.get('.space-x-6 > :nth-child(2)').click();
    cy.get('.active_menu_tab').should('have.class', 'active_menu_tab');
    /* ==== End Cypress Studio ==== */
  });
  // Add more tests as needed
});
