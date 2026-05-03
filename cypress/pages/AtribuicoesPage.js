class AtribuicoesPage {
  seletores = {
    menuAtribuicoes: 'a[href="/portal_service/bonds"]',
    botaoNovaAtribuicao: 'a[href="/portal_service/bonds/new"]',

    campoSelecaoArea: "#set_area",
    campoSelecaoSubArea: "#resp_subarea",
    checkColaborador: "#bond_employee_type_colaborador",
    campoColaborador: "#select2-collaborators-container",
    opcaoSelect2: ".select2-results__option",

    campoAtendente: "#attended",
    checkHomeOffice: "#bond_modality_home_office",
    checkPresencial: "#bond_modality_presencial",
    campoSO: "#so",
    checkPacoteOffice: "#check_office",
    selectPacoteOffice: "#key.form-control",
    campoObservacoes: "#bond_observation",

    botaoAtribuirAtivo: "#btn_asset",
    campoTombo: "#select2-set_tombo-container",
    opcaoAtivoDinamico: '[id^="select2-set_tombo-result"]',
    statusAtivo: "#set_status",
    statusEdicaoAtivo: "select#set_status",
    statusGeral: 'select[id$="status"]',
    campoDefeito: "#bond_bond_asset_attributes_0_observation",
    botaoRemover: ".remove_fields",

    iconeEditar: ".fa-edit",
    botaoSalvar: 'input[value="Salvar"]',
    botaoCancelar: 'a[href="/portal_service/bonds"] button',
  };

  irParaAtribuicoes() {
    cy.get(this.seletores.menuAtribuicoes).click();
  }

  irParaNovaAtribuicao() {
    cy.get(this.seletores.botaoNovaAtribuicao).click();
  }

  iconeEditarAtivo() {
    cy.get(this.seletores.iconeEditar).first().click();
  }

  preencherAreaESubArea(area, subarea) {
    cy.get(this.seletores.campoSelecaoArea).should("be.visible").select(area);

    cy.get(this.seletores.campoSelecaoSubArea)
      .should("be.visible")
      .select(subarea);
  }

  selecionarColaborador(nome) {
    cy.get(this.seletores.checkColaborador).check().should("be.checked");

    cy.get(this.seletores.campoColaborador).click();

    cy.contains(this.seletores.opcaoSelect2, nome).should("be.visible").click();
  }

  preencherAtendente(atendente) {
    cy.get(this.seletores.campoAtendente).select(atendente);
  }

  preencherSistema(sistema) {
    cy.get(this.seletores.campoSO).select(sistema);
  }

  selecionarModalidadeHomeOffice() {
    cy.get(this.seletores.checkHomeOffice).check().should("be.checked");
  }

  selecionarModalidadePresencial() {
    cy.get(this.seletores.checkPresencial).check().should("be.checked");
  }

  selecionarPacoteOffice() {
    cy.get(this.seletores.checkPacoteOffice).check().should("be.checked");
  }

  selecionarVersaoPacoteOffice(versaoOffice) {
    cy.get(this.seletores.selectPacoteOffice).select(versaoOffice);
  }

  preencherObservacoes(observacao) {
    cy.get(this.seletores.campoObservacoes).clear().type(observacao);
  }

  clicarEmAtribuirAtivo() {
    cy.get(this.seletores.botaoAtribuirAtivo).should("be.visible").click();
  }

  selecionarNovoTombo(indice = 0) {
    cy.get(this.seletores.campoTombo).should("be.visible").click();

    cy.get(this.seletores.opcaoAtivoDinamico, { timeout: 10000 }).should(
      "be.visible",
    );

    // Valida se o índice solicitado existe na lista atual antes de clicar
    cy.get(this.seletores.opcaoAtivoDinamico)
      .filter(":visible")
      .then(($opcoes) => {
        if (indice < $opcoes.length) {
          cy.wrap($opcoes).eq(indice).scrollIntoView().click();
        } else {
          throw new Error(
            `Índice ${indice} não encontrado. A lista só possui ${$opcoes.length} ativos disponíveis.`,
          );
        }
      });
  }

  selecionarStatusAtivo() {
    cy.get(this.seletores.statusGeral)
      .filter(":visible")
      .last()
      .select("VÍNCULADO");
  }

  selecionarOpcaoAtivoVisivel() {
    cy.get(this.seletores.opcaoAtivoDinamico)
      .filter(":visible")
      .first()
      .click();
  }

  selecionarAtivoParaSubstituicao() {
    cy.get(this.seletores.campoTombo).should("be.visible").click();

    this.selecionarOpcaoAtivoVisivel();

    cy.get(this.seletores.statusGeral)
      .filter(":visible")
      .last()
      .select("VÍNCULADO");
  }

  processarDefeito(descricaoDefeito) {
    cy.get(this.seletores.statusGeral)
      .filter(":visible")
      .first()
      .select("COM DEFEITO");

    cy.get(this.seletores.campoDefeito).clear().type(descricaoDefeito);

    cy.get(this.seletores.botaoRemover).filter(":visible").first().click();
  }

  processarSubstituicao() {
    cy.get(this.seletores.statusGeral)
      .filter(":visible")
      .first()
      .select("DISPONÍVEL");

    cy.get(this.seletores.botaoRemover).filter(":visible").first().click();
  }

  salvar() {
    cy.get(this.seletores.botaoSalvar).should("be.visible").click();
  }

  cancelar() {
    cy.get(this.seletores.botaoCancelar).should("be.visible").click();
  }
}

export default new AtribuicoesPage();
