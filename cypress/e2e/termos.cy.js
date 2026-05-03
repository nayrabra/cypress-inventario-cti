import termosPage from "../pages/TermosPage";
import { validarPdfPorUrl } from "../support/utils/pdfHelper";

describe("Geração de Termos", () => {
  beforeEach(() => {
    cy.login();
    cy.contains("Logado com sucesso").should("be.visible");
  });

  function prepararGeracaoDeTermo() {
    termosPage.acessarAtribuicoes();
    termosPage.selecionarPrimeiraAtribuicao();
    termosPage.abrirModalGerarTermos();
  }

  function validarPdfGerado(tipoTermo, tituloPdf) {
    cy.window().then((win) => {
      cy.stub(win, "open").as("novaAba");
    });
    termosPage.gerarTermo();
    cy.get("@novaAba")
      .should("have.been.called")
      .its("firstCall.args.0")
      .then((pdfUrl) => {
        expect(pdfUrl).to.include("term_responsibility_asset");
        expect(pdfUrl).to.include(`term_type=${tipoTermo}`);
        validarPdfPorUrl(pdfUrl, [tituloPdf]);
      });
  }

  it("deve abrir e fechar o modal de geração de termos", () => {
    prepararGeracaoDeTermo();
    termosPage.fecharModal();
  });

  it("deve permitir selecionar apenas um tipo de termo por vez", () => {
    prepararGeracaoDeTermo();

    termosPage.selecionarTermoResponsabilidade();
    termosPage.selecionarTermoEmprestimo();
    termosPage.fecharModal();
  });

  it("deve gerar termo de responsabilidade em PDF", () => {
    prepararGeracaoDeTermo();

    termosPage.selecionarTermoResponsabilidade();

    validarPdfGerado("liability", "TERMO DE RESPONSABILIDADE");
  });

  it("deve gerar termo de empréstimo em PDF", () => {
    prepararGeracaoDeTermo();

    termosPage.selecionarTermoEmprestimo();

    validarPdfGerado("loan", "TERMO DE EMPRÉSTIMO");
  });
});
