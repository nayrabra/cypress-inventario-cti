const seletores = {
  email: "#admin_email",
  senha: "#admin_password",
  botaoEntrar: ".btn-success",
  logoInventario: '[src*="inventario_cti"]',
};

Cypress.Commands.add("login", () => {
  cy.visit("/");

  cy.get(seletores.logoInventario, { timeout: 10000 }).should("be.visible");

  cy.get(seletores.email).should("be.visible").type(Cypress.env("emailAdmin"));

  cy.get(seletores.senha)
    .should("be.visible")
    .type(Cypress.env("senhaAdmin"), { log: false });

  cy.get(seletores.botaoEntrar).should("be.enabled").click();

  cy.contains("Logado com sucesso", { timeout: 10000 }).should("be.visible");
});
