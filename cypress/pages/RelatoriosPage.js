class RelatoriosPage {
  seletores = {
    menuRelatorios: '[data-target="#collapseTwo"]',

    submenuMovimentacaoAtivos: 'a[href="/portal_service/reports/index"]',
    submenuAtribuicoesPorArea:
      'a[href="/portal_service/reports/assignments_by_area"]',

    radioSintetico: "#type_syntetic",
    radioAnalitico: "#type_analytic",

    campoAreaMovimentacao: "#area_name",
    campoAreaAtribuicao: "#search_area",
    campoSubareaAtribuicao: "#search_subarea",
    campoDataInicio: "#initial_date",
    campoDataFim: "#final_date",

    botaoPesquisar: 'input[value="Pesquisar"]',
    botaoGerarRelatorioMovimentacao: 'a[href*="pdf_create"]',
    botaoGerarRelatorioPorArea: 'a[href*="assignments_by_area_pdf"]',

    tabelaResultados: "table",
    textoInformativoRelatorio: ".text-success",
  };

  acessarRelatorioMovimentacao() {
    cy.get(this.seletores.menuRelatorios).click();
    cy.get(this.seletores.submenuMovimentacaoAtivos).click();
  }

  acessarRelatorioAtribuicoesPorArea() {
    cy.get(this.seletores.menuRelatorios).click();
    cy.get(this.seletores.submenuAtribuicoesPorArea).click();
  }

  validarTitulo(titulo) {
    cy.contains("h1", titulo).should("be.visible");
  }

  selecionarTipoSintetico() {
    cy.get(this.seletores.radioSintetico)
      .check()
      .should("be.checked");
  }

  selecionarTipoAnalitico() {
    cy.get(this.seletores.radioAnalitico)
      .check()
      .should("be.checked");
  }

  filtrarMovimentacaoPorArea(area) {
    cy.get(this.seletores.campoAreaMovimentacao).select(area);
  }

  filtrarAtribuicaoPorArea(area) {
    cy.get(this.seletores.campoAreaAtribuicao).select(area);
  }

  filtrarAtribuicaoPorSubarea(subarea) {
    cy.get(this.seletores.campoSubareaAtribuicao).select(subarea);
  }

  filtrarPorPeriodo(dataInicio, dataFim) {
    cy.get(this.seletores.campoDataInicio).clear().type(dataInicio);
    cy.get(this.seletores.campoDataFim).clear().type(dataFim);
  }

  pesquisar() {
    cy.get(this.seletores.botaoPesquisar).click();
  }

  validarAreaNaTabela(area) {
    cy.get(this.seletores.tabelaResultados)
      .contains("td", area)
      .should("be.visible");
  }

  validarDadosDoAtivo() {
    const colunas = [
      "Tombo",
      "Nº de Série",
      "Descrição",
      "Lotação Anterior",
      "Lotação Atual",
      "Colaborador",
    ];

    colunas.forEach((coluna) => {
      cy.contains(coluna).should("be.visible");
    });
  }

  validarMensagem(mensagem) {
    cy.get(this.seletores.textoInformativoRelatorio)
      .should("be.visible")
      .and("contain", mensagem);
  }

  gerarRelatorioMovimentacaoPdf() {
    cy.get(this.seletores.botaoGerarRelatorioMovimentacao)
      .contains("Gerar Relatório")
      .click();
  }

  gerarRelatorioAtribuicoesPorAreaPdf() {
    cy.get(this.seletores.botaoGerarRelatorioPorArea)
      .contains("Gerar Relatório")
      .click();
  }
}

export default new RelatoriosPage();