Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedNoteAppUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createNote", ({ content, important }) => {
  cy.request({
    url: "http://localhost:3003/api/notes",
    method: "POST",
    body: { content, important },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedNoteAppUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:3000");
});
