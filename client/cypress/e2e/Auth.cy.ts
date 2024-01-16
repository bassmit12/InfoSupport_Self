describe("Login Functionality", () => {
  it("should login with valid credentials", () => {
    cy.visit("http://127.0.0.1:3000/auth", { timeout: 10000 });

    // Fill in the login form
    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="••••••••"]').type("Admin");

    // Click the login button
    cy.get('button[type="button"]').click();

    // Wait for the redirection to occur
    // You may want to wait for a specific element on the next page to appear
    // before asserting that the redirection is successful
    cy.url().should("include", "http://localhost:3000/Menu", {
      timeout: 10000,
    }); // Assuming successful login redirects to the home page

    // Verify the login success
    cy.contains("Logged in successfully").should("exist");

    // Optionally, you can also wait for an element on the next page to appear
    // before proceeding with further tests
  });
});
