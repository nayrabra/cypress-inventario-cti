# Execução de Testes

## Objetivo
Registrar os resultados da execução dos cenários de teste automatizados, validando o comportamento do sistema conforme os critérios definidos.

---

## Ambiente de Teste

- URL: http://testeqa.pge.ce.gov.br  
- Navegador: Chrome  
- Ferramenta: Cypress  
- Tipo de Teste: E2E (End-to-End)  

---

## Resultados da Execução

| CT | Descrição | Resultado Esperado | Resultado Obtido | Status |
|----|----------|------------------|------------------|--------|
| CT01 | Cadastrar nova atribuição | Cadastro realizado com sucesso | Cadastro realizado com sucesso | ✅ Passou |
| CT02 | Cancelar cadastro | Retornar para tela de atribuições | Redirecionou corretamente | ✅ Passou |
| CT03 | Editar atribuição | Atualização realizada com sucesso | Atualização realizada com sucesso | ✅ Passou |
| CT04 | Substituir ativo com defeito | Substituição realizada com sucesso | Substituição realizada | ✅ Passou |
| CT05 | Abrir/fechar modal de termos | Modal abre e fecha corretamente | Funcionamento correto | ✅ Passou |
| CT06 | Seleção exclusiva de termo | Apenas um termo selecionado | Funcionamento correto | ✅ Passou |
| CT07 | Gerar termo de responsabilidade | PDF com título correto | PDF gerado corretamente | ✅ Passou |
| CT08 | Gerar termo de empréstimo | PDF com título correto | PDF gerado corretamente | ✅ Passou |
| CT09 | Filtrar movimentações | Dados exibidos corretamente | Dados exibidos corretamente | ✅ Passou |
| CT10 | Gerar relatório PDF | PDF gerado corretamente | Erro ao gerar PDF no tipo Sintético | ❌ Falhou |
| CT11 | Período sem dados | Mensagem informativa exibida | Mensagem exibida corretamente | ✅ Passou |
| CT12 | Filtrar atribuições por área | Dados exibidos corretamente | Dados exibidos corretamente | ✅ Passou |
| CT13 | Gerar relatório analítico | PDF gerado corretamente | PDF gerado corretamente | ✅ Passou |

---

## Defeitos Identificados

Durante a execução dos testes, foram identificados os seguintes problemas:

- Bug 01: Seleção de ativo já vinculado
- Bug 02: Falha ao gerar relatório sintético em PDF
- Bug 03: Permissão de seleção de período futuro
- Bug 04: Data inicial maior que data final
- Bug 05: Erro ao informar apenas data inicial  

Para mais detalhes, incluindo descrição, passos para reprodução, impacto e severidade, consulte o documento completo em:

`docs/bugsEMelhorias.md`

---

## Observações

- Alguns testes dependem de massa de dados disponível (ativos livres), podendo impactar a execução.
- Foi identificada a necessidade de dados controlados para garantir estabilidade dos testes.
- A funcionalidade de relatório sintético apresentou falha crítica.

---

## Conclusão

A maior parte dos fluxos principais do sistema está funcionando corretamente.  
Entretanto, foram identificados problemas relevantes no módulo de relatórios e na validação de dados, que devem ser corrigidos para garantir a confiabilidade do sistema.