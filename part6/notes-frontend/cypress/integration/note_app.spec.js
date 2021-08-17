describe("Note app", function () {
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

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2021"
    );
  });

  it("user can login with good credentials", function () {
    cy.contains("log in").click();
    cy.get("#username").type("username5");
    cy.get("#password").type("password5");
    cy.get("#login-button").click();

    cy.contains("logged in as user5");
  });

  it("login fails with wrong password", function () {
    cy.contains("log in").click();
    cy.get("#username").type("username5");
    cy.get("#password").type("wrongpassword");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");

    cy.get("html").should("not.contain", "logged in as user5");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "username5", password: "password5" });
    });

    it("a new note can be created", function () {
      cy.contains("New note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      describe("and several notes exist", function () {
        beforeEach(function () {
          cy.createNote({ content: "first note", important: false });
          cy.createNote({ content: "second note", important: false });
          cy.createNote({ content: "third note", important: false });
        });

        it("one of those can be made important", function () {
          cy.contains("second note").parent().find("button").as("theButton");
          cy.get("@theButton").click();
          cy.get("@theButton").should("contain", "Select as not important");
        });
      });
    });
  });
});
