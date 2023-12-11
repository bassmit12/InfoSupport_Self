// Create a Cypress test file, e.g., frontpage_spec.js

describe("FrontPage Component", () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit("http://localhost:3000/");
  });

  it("should render the FrontPage component", () => {
    // Check if the component is rendered
    cy.get(".bg-image").should("exist");
  });

  it("should navigate to the Auth page when button is clicked", () => {
    // Click the button and assert the URL changes to /Menu
    cy.get("button").contains("Discover our Menu").click();
    cy.url().should("include", "/auth");
  });

  // You can add more tests based on your application requirements

  // For example, you might want to check the contents of the component,
  // assert the presence of specific elements, or handle other user interactions.
});
