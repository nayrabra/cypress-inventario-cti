class TermosPage {
  seletores = {
    menuAtribuicoes: 'a[href="/portal_service/bonds"]',
    checkboxAtribuicoes: '[id^="bonds_ids_"]',
    botaoGerarTermos: '[data-target="#generate_term"]',
    modalGerarTermo: "#generate_term",
    radioResponsabilidade: "#term_type_liability",
    radioEmprestimo: "#term_type_loan",
    botaoGerar: "#btn-termo",
    botaoFecharModal: '#generate_term [data-dismiss="modal"]',
  };

  acessarAtribuicoes() {
    cy.get(this.seletores.menuAtribuicoes).click();
  }

  selecionarPrimeiraAtribuicao() {
    cy.get(this.seletores.checkboxAtribuicoes)
      .first()
      .check({ force: true })
      .should("be.checked");
  }

  abrirModalGerarTermos() {
    cy.get(this.seletores.botaoGerarTermos).click();

    cy.get(this.seletores.modalGerarTermo)
      .should("be.visible")
      .and("have.class", "show");
  }

  selecionarTermoResponsabilidade() {
    cy.get(this.seletores.radioResponsabilidade).check().should("be.checked");

    cy.get(this.seletores.radioEmprestimo).should("not.be.checked");
  }

  selecionarTermoEmprestimo() {
    cy.get(this.seletores.radioEmprestimo).check().should("be.checked");

    cy.get(this.seletores.radioResponsabilidade).should("not.be.checked");
  }

  gerarTermo() {
    cy.get(this.seletores.botaoGerar).should("be.visible").click();
  }

  fecharModal() {
    cy.get(this.seletores.botaoFecharModal, { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });
  }
}

export default new TermosPage();
