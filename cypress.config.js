const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://testeqa.pge.ce.gov.br",

    setupNodeEvents(on, config) {
      on("task", {
        async lerPdf(buffer) {
          const { PDFParse } = await import("pdf-parse");

          const parser = new PDFParse({
            data: Buffer.from(buffer, "binary"),
          });

          const result = await parser.getText();
          await parser.destroy();

          return result.text;
        },
      });

      return config;
    },
  },
});