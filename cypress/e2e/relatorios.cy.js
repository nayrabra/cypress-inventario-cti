import relatoriosPage from "../pages/RelatoriosPage";
import { validarPdfDaPagina } from "../support/utils/pdfHelper";

describe("Relatório de Movimentação de Ativos", () => {
  const filtros = {
    area: "CTI",
    dataInicio: "2026-04-01",
    dataFim: "2026-05-01",
  };

  beforeEach(() => {
    cy.login();
    cy.contains("Logado com sucesso").should("be.visible");
  });

  it("deve filtrar movimentações por área e período", () => {
    relatoriosPage.acessarRelatorioMovimentacao();
    relatoriosPage.validarTitulo("Movimentação de Ativos");

    relatoriosPage.filtrarMovimentacaoPorArea(filtros.area);
    relatoriosPage.filtrarPorPeriodo(filtros.dataInicio, filtros.dataFim);
    relatoriosPage.pesquisar();

    relatoriosPage.validarAreaNaTabela(filtros.area);
    relatoriosPage.validarDadosDoAtivo();
  });

  it("deve gerar relatório de movimentação em PDF", () => {
    relatoriosPage.acessarRelatorioMovimentacao();
    relatoriosPage.validarTitulo("Movimentação de Ativos");

    relatoriosPage.filtrarMovimentacaoPorArea(filtros.area);
    relatoriosPage.filtrarPorPeriodo(filtros.dataInicio, filtros.dataFim);
    relatoriosPage.pesquisar();

    relatoriosPage.gerarRelatorioMovimentacaoPdf();

    cy.url().should("include", "/portal_service/reports/pdf_create");

    validarPdfDaPagina([
      `Movimentações de Ativos para ${filtros.area}`,
    ]);
  });
});

describe("Relatório de movimentação sem dados disponíveis", () => {
  const filtros = {
    area: "GABINETE",
    dataInicio: "1990-04-01",
    dataFim: "1990-05-01",
  };

  beforeEach(() => {
    cy.login();
    cy.contains("Logado com sucesso").should("be.visible");
  });

  it("deve exibir mensagem para dados não disponíveis", () => {
    relatoriosPage.acessarRelatorioMovimentacao();
    relatoriosPage.validarTitulo("Movimentação de Ativos");

    relatoriosPage.filtrarMovimentacaoPorArea(filtros.area);
    relatoriosPage.filtrarPorPeriodo(filtros.dataInicio, filtros.dataFim);
    relatoriosPage.pesquisar();

    relatoriosPage.validarMensagem(`Sem movimentações para: ${filtros.area}`);
  });
});

describe("Relatório de Atribuições por Área/Subárea", () => {
  const filtros = {
    area: "CTI",
    subarea: "INFORMÀTICA",
  };

  beforeEach(() => {
    cy.login();
    cy.contains("Logado com sucesso").should("be.visible");
  });

  it("deve filtrar atribuições por área e subárea", () => {
    relatoriosPage.acessarRelatorioAtribuicoesPorArea();
    relatoriosPage.validarTitulo("Atribuições por Área/Subárea");

    relatoriosPage.selecionarTipoSintetico();
    relatoriosPage.filtrarAtribuicaoPorArea(filtros.area);
    relatoriosPage.filtrarAtribuicaoPorSubarea(filtros.subarea);
    relatoriosPage.pesquisar();

    relatoriosPage.validarMensagem(`Relatório Sintético - ${filtros.area}`);
  });

  it("deve gerar relatório de atribuições por área/subárea em PDF", () => {
    relatoriosPage.acessarRelatorioAtribuicoesPorArea();
    relatoriosPage.validarTitulo("Atribuições por Área/Subárea");

    relatoriosPage.selecionarTipoAnalitico();
    relatoriosPage.filtrarAtribuicaoPorArea(filtros.area);
    relatoriosPage.filtrarAtribuicaoPorSubarea(filtros.subarea);
    relatoriosPage.pesquisar();

    relatoriosPage.gerarRelatorioAtribuicoesPorAreaPdf();

    cy.url().should("include", "/portal_service/reports");

    validarPdfDaPagina([
      filtros.area,
      filtros.subarea,
    ]);
  });
});