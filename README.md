# Inventário CTI

Projeto de automação E2E desenvolvido com Cypress para validação dos principais fluxos do sistema Inventário CTI.

---

## Estrutura do Projeto

```
cypress-inventario-cti/
├── cypress/
│   ├── docs/
│   │   ├── bugsEMelhorias.md
│   │   ├── cenariosDeTeste.md
│   │   ├── evidencias.md
│   │   ├── execucaoDeTestes.md
│   │   └── planoDeTeste.md
│   ├── e2e/
│   │   ├── atribuicoes.cy.js
│   │   ├── termos.cy.js
│   │   └── relatorios.cy.js
│   ├── pages/
│   │   ├── AtribuicoesPage.js
│   │   ├── TermosPage.js
│   │   └── RelatoriosPage.js
│   ├── support/
│   │   ├── commands
│   │   │   ├── loginCommands.js
│   │   └── utils/
│   │   │   └── pdfHelper.js
│   │   ├── e2e.js
├── cypress.config.js
├── package.json
└── README.md
```

---

## Documentação

- Plano de Teste: `docs/planoDeTeste.md`
- Cenários de Teste: `docs/cenariosDeTeste.md`
- Execução dos Testes: `docs/execucaoDeTestes.md`
- Bugs e Melhorias: `docs/bugsEMelhorias.md`
- Evidências: `docs/evidencias.md`

---

## Funcionalidades Testadas

- Cadastro de atribuição de ativos  
- Edição de atribuição  
- Cancelamento de cadastro  
- Substituição de ativos  
- Geração de termos em PDF 
- Validação de conteúdo em PDF  
- Relatório de movimentação de ativos  
- Relatório de atribuições por área/subárea 

---

## Tecnologias Utilizadas
- Cypress  
- JavaScript  
- Node.js  
- pdf-parse  
- Page Object Pattern  

---

## Organização do Projeto
- `cypress/e2e`: cenários automatizados  
- `cypress/pages`: abstração da interface (Page Objects)  
- `cypress/support`: comandos customizados e utilitários  
- `docs`: documentação completa do processo de teste  

---

## Configuração

Crie um arquivo `cypress.env.json` baseado no exemplo:

```json
{
  "emailAdmin": "seu_email",
  "senhaAdmin": "sua_senha"
}
```

---

## Instalação

```bash
npm install
npm install cypress --save-dev

# leitura do pdf
npm install pdf-parse
```

## Execução dos Testes
```bash
npx cypress open
```
ou

```bash
npx cypress run
```
---

## Observações

Alguns testes dependem da disponibilidade de dados no ambiente (ex: ativos livres para vínculo).
Foi identificada a necessidade de massa de dados controlada para maior estabilidade dos testes.
A validação de PDFs é realizada utilizando a biblioteca pdf-parse.

---

## Observações Técnicas da Automação

Durante a implementação dos testes automatizados com Cypress, foram adotadas algumas estratégias para garantir maior confiabilidade e cobertura dos cenários.

### Tratamento de ativos já vinculados

Durante os testes de atribuição de ativos, foi identificado que o sistema permite a seleção de ativos já vinculados, retornando erro apenas no momento do salvamento.

Para contornar essa limitação e garantir a execução do teste, foi implementada uma lógica condicional utilizando verificação do conteúdo da página após a tentativa de cadastro.

Caso fosse identificada mensagem de erro relacionada a ativo já vinculado, o teste automaticamente tentava selecionar um novo ativo disponível, repetindo o processo até encontrar um válido.

Essa abordagem tornou o teste mais resiliente frente à inconsistência de dados no ambiente.

### Validação de PDFs

Para validar a geração de documentos em PDF, foi utilizada a interceptação da abertura de uma nova aba (`window.open`). A partir disso, a URL do PDF foi capturada e processada via requisição (`cy.request`), permitindo a leitura do conteúdo utilizando a biblioteca `pdf-parse`.

Com essa abordagem, foi possível validar diretamente o conteúdo textual do PDF, garantindo que as informações geradas estavam corretas, como títulos e dados do relatório/termo.

---

### Conclusão

As soluções adotadas permitiram aumentar a robustez dos testes automatizados, reduzindo falhas intermitentes e garantindo maior confiabilidade na validação dos fluxos críticos do sistema.

---

## Melhorias Futuras
- Implementação de massa de dados controlada
- Criação de dados via API
- Execução em pipeline CI/CD


