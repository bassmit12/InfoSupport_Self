describe("Menu Page Functionality", () => {
  it("should display menu items", () => {
    // Visit the Menu page
    cy.visit("http://localhost:3000/Menu");

    // Verify that the header is present
    cy.get("nav").should("exist");
    cy.get("img[src*='Menu_Masters_Logo.png']").should("exist");

    // Verify that menu items are displayed
    cy.get("section").should("exist");
    cy.get("h1").contains("Menu").should("exist");
    cy.get(".menu_tab").should("have.length", 3); // Assuming there are three menu tabs

    // Click on a menu tab
    cy.get(".menu_tab").first().click();

    // Wait for menu items to load
    cy.wait(2000); // Adjust the wait time based on your application's actual behavior

    // Verify that menu items are displayed
    cy.get(".grid").should("exist");
    cy.get(".grid [data-cy='menu-item']").should("have.length.greaterThan", 0); // Assuming data-cy attribute is used on menu items

    // Optionally, you can click on a menu item and check if it navigates to the item's page
    cy.get(".grid [data-cy='menu-item']").first().click();
    cy.url().should("include", "/item/"); // Assuming the URL pattern for an item page

    // You can add more assertions based on your application's behavior
  });

  // Add more tests as needed
});
