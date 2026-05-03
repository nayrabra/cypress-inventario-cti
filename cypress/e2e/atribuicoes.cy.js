import atribuicoesPage from "../pages/AtribuicoesPage.js";

beforeEach(() => {
  cy.login();
});

describe("Gestão de Atribuição de Ativos", () => {
  const dados = {
    area: "CTI",
    subarea: "INFORMÀTICA",
    colaborador: "Fernanda Cardoso",
    atendente: "Atendente",
    sistema: "WINDOWS 11 PRO",
    observacao: "Automação Cypress",
    descricaoDefeito: "Defeito detectado via automação",
  };

  const dadosEdicao = {
    area: "7",
    subarea: "53",
    colaborador: "Mariana Oliveira Santos",
    atendente: "Atendente",
    sistema: "UBUNTU 18.04",
    versaoOffice: "OF-NC8J7",
    observacao: "Teste automação Cypress - edição de atribuição",
    descricaoDefeito: "Teste automatizado de dispositivo com defeito",
  };

  function tentarSalvarComAtivoValido(tentativa = 0) {
    const limiteTentativas = 20;

    atribuicoesPage.selecionarNovoTombo(tentativa);
    atribuicoesPage.selecionarStatusAtivo();
    atribuicoesPage.salvar();

    cy.get("body").then(($body) => {
      const texto = $body.text().toLowerCase();

      const erroVinculo =
        texto.includes("já está vinculado") || texto.includes("bond asset");

      if (erroVinculo) {
        if (tentativa >= limiteTentativas) {
          throw new Error("Não foram encontrados ativos disponíveis.");
        }
        cy.log(`O ativo do índice ${tentativa} está ocupado. Tentando o próximo...`);
        tentarSalvarComAtivoValido(tentativa + 1);
      }

      cy.contains(`Ativos vinculados a: ${dados.colaborador} , Parabéns!`).should(
        "be.visible",
      );
    });
  }

  describe("Criação de Atribuições", () => {
    it("deve cadastrar uma nova atribuição com sucesso", () => {
      atribuicoesPage.irParaAtribuicoes();
      atribuicoesPage.irParaNovaAtribuicao();
      atribuicoesPage.preencherAreaESubArea(dados.area, dados.subarea);
      atribuicoesPage.selecionarColaborador(dados.colaborador);
      atribuicoesPage.preencherAtendente(dados.atendente);
      atribuicoesPage.preencherSistema(dados.sistema);
      atribuicoesPage.selecionarModalidadeHomeOffice();
      atribuicoesPage.selecionarPacoteOffice();
      atribuicoesPage.preencherObservacoes(dados.observacao);

      atribuicoesPage.clicarEmAtribuirAtivo();
      // Começa a procurar a partir do índice 5
      tentarSalvarComAtivoValido(5);
    });

    it("deve cancelar o cadastro de uma nova atribuição", () => {
      atribuicoesPage.irParaAtribuicoes();
      atribuicoesPage.irParaNovaAtribuicao();
      atribuicoesPage.preencherAreaESubArea(dados.area, dados.subarea);
      atribuicoesPage.selecionarColaborador(dados.colaborador);
      atribuicoesPage.preencherAtendente(dados.atendente);
      atribuicoesPage.preencherSistema(dados.sistema);
      atribuicoesPage.selecionarModalidadeHomeOffice();
      atribuicoesPage.selecionarPacoteOffice();
      atribuicoesPage.preencherObservacoes(dados.observacao);

      atribuicoesPage.cancelar();

      cy.location("pathname").should("eq", "/portal_service/bonds");
    });
  });

  describe("Edição de atribuição de ativos", () => {
    it("deve editar uma atribuição de ativo já cadastrada", () => {
      atribuicoesPage.irParaAtribuicoes();
      atribuicoesPage.iconeEditarAtivo();

      atribuicoesPage.preencherAreaESubArea(
        dadosEdicao.area,
        dadosEdicao.subarea,
      );

      atribuicoesPage.selecionarColaborador(dadosEdicao.colaborador);
      atribuicoesPage.preencherAtendente(dadosEdicao.atendente);
      atribuicoesPage.preencherSistema(dadosEdicao.sistema);
      atribuicoesPage.selecionarModalidadePresencial();
      atribuicoesPage.selecionarPacoteOffice();
      atribuicoesPage.selecionarVersaoPacoteOffice(dadosEdicao.versaoOffice);
      atribuicoesPage.preencherObservacoes(dadosEdicao.observacao);
      atribuicoesPage.salvar();

      cy.contains(
        `Vinculo de ${dadosEdicao.colaborador}, atualizado com sucesso!`,
      ).should("be.visible");
    });

    it("deve substituir ativo com defeito", () => {
      atribuicoesPage.irParaAtribuicoes();
      atribuicoesPage.iconeEditarAtivo();

      atribuicoesPage.processarDefeito(dadosEdicao.descricaoDefeito);
      atribuicoesPage.selecionarAtivoParaSubstituicao();
      atribuicoesPage.preencherAtendente(dadosEdicao.atendente);
      atribuicoesPage.salvar();
    });

    it("deve substituir ativo e deixar o antigo como disponível", () => {
      atribuicoesPage.irParaAtribuicoes();
      atribuicoesPage.iconeEditarAtivo();

      atribuicoesPage.processarSubstituicao();
      atribuicoesPage.selecionarAtivoParaSubstituicao();
      atribuicoesPage.preencherAtendente(dadosEdicao.atendente);
      atribuicoesPage.salvar();
    });
  });
});
