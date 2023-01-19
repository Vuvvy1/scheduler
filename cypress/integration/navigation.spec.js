describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.contains('[data-cy="day"]', "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
    // cy.visit("/");
    // cy.get("li").contains("Tuesday").click();
    // cy.contains("li", "Tuesday")
    //     .should("have.css", "background-color", "rgb(242, 242, 242)");
  });

});
