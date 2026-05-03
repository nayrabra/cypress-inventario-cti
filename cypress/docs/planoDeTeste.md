# Plano de Teste - Inventário CTI

---

## Objetivo

Validar os principais fluxos do sistema **Inventário CTI**, garantindo que as funcionalidades de atribuição de ativos, geração de termos e relatórios funcionem corretamente conforme os critérios de aceitação definidos.

---

## Escopo

### Em escopo

- Cadastro de nova atribuição  
- Cancelamento de cadastro  
- Edição de atribuição  
- Substituição de ativo  
- Registro de ativo com defeito  
- Geração de termo de responsabilidade  
- Geração de termo de empréstimo  
- Consulta de relatório de movimentação  
- Geração de relatório em PDF  
- Consulta de atribuições por área/subárea  

---

### Fora de escopo

- Testes de performance  
- Testes de segurança  
- Testes cross-browser  
- Validação visual detalhada (UI/UX)  
- Testes de API  

---

## Estratégia de Teste

A estratégia adotada foi baseada em **testes funcionais End-to-End (E2E)** utilizando Cypress, simulando o comportamento do usuário final.

Foram contemplados:

- Fluxos principais (happy path)  
- Cenários negativos (validação de erros e inconsistências)  
- Testes exploratórios manuais para identificação de bugs  
- Automação dos fluxos críticos para garantir regressão  

Além disso, foram aplicadas validações específicas como:

- Verificação de mensagens de sucesso e erro  
- Validação de conteúdo de arquivos PDF gerados  
- Tratamento de dados inconsistentes no ambiente (ex: ativos já vinculados)

---

## Tipos de Teste

- Teste funcional  
- Teste End-to-End (E2E)  
- Testes positivos  
- Testes negativos  
- Testes exploratórios  
- Validação de documentos (PDF)  

---

## Ambiente de Teste

- Ambiente: Homologação  
- URL: http://testeqa.pge.ce.gov.br  
- Usuário: Administrador  
- Navegador: Chrome  
- Sistema operacional: macOS  

---

## Massa de Dados

Os testes dependem de dados existentes no ambiente, como:

- Colaboradores cadastrados  
- Áreas e Subáreas  
- Ativos disponíveis  

Foi identificado que a ausência de massa de dados controlada pode impactar a estabilidade dos testes, sendo sugerida melhoria para criação de dados fixos.

---

## Critérios de Entrada

- Ambiente de teste disponível  
- Sistema acessível  
- Usuário válido para autenticação  
- Massa de dados mínima existente  
- Cypress configurado corretamente  
- Dependências instaladas  

---

## Critérios de Saída

- Cenários de teste executados  
- Fluxos principais validados  
- Evidências registradas (vídeos e prints)  
- Bugs e melhorias documentados  
- Resultados consolidados disponíveis  

---

## Riscos e Limitações

- Dependência de dados dinâmicos do ambiente (ativos já vinculados)  
- Instabilidade do ambiente de testes  
- Falta de validações no sistema (identificadas como bugs)  
- Possibilidade de falsos negativos devido à inconsistência de dados  

---

## Ferramentas Utilizadas

- Cypress  
- JavaScript  
- Node.js  
- pdf-parse  
- GitHub  

---

## Entregáveis

- Scripts automatizados (Cypress)  
- Plano de teste  
- Cenários de teste  
- Relatório de execução  
- Evidências (Loom)  
- Documentação de bugs e melhorias  