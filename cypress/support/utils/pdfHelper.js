function normalizarUrl(url) {
  return url.startsWith("http") ? url : `${Cypress.config("baseUrl")}${url}`;
}

// Valida o conteúdo de um PDF a partir de uma URL informada (ex: termos)
export function validarPdfPorUrl(url, textosEsperados) {
  const urlCompleta = normalizarUrl(url);

  cy.request({
    url: urlCompleta,
    encoding: "binary",
  }).then((response) => {
    cy.task("lerPdf", response.body).then((textoPdf) => {
      textosEsperados.forEach((texto) => {
        expect(textoPdf).to.include(texto);
      });
    });
  });
}

// Valida o conteúdo de um PDF aberto na aba atual (ex: relatórios)
export function validarPdfDaPagina(textosEsperados) {
  cy.url().then((urlAtual) => {
    validarPdfPorUrl(urlAtual, textosEsperados);
  });
}
