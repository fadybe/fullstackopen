describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/reset");
    const user = {
      name: "user5",
      username: "username5",
      password: "password5",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to blogs app");
  });

  describe("Login", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/reset");
      const user = {
        name: "user5",
        username: "username5",
        password: "password5",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
    });
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("username5");
      cy.get("#password").type("password5");
      cy.get("#login-submit-button").click();
      cy.contains("logged in as user5");
    });
  });
});
