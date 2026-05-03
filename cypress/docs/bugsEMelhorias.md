# Bugs e Melhorias

---

# Bugs

## Bug 01 - Seleção de ativo já vinculado no cadastro de atribuição

### Descrição

Durante o cadastro de uma nova atribuição, o sistema exibe na lista de seleção ativos que já estão vinculados a outros colaboradores.

---

### Passos para reproduzir

1. Acessar o menu: Atribuições
2. Clicar em **"Nova Atribuição"**
3. Preencher Área e Subárea
4. Selecionar um Colaborador
5. Clicar em **"Atribuir Ativo"**
6. Selecionar um ativo da lista exibida
7. Clicar em **"Salvar"**

---

### Resultado atual

O sistema permite selecionar o ativo normalmente, porém ao salvar exibe erro informando que o ativo já está vinculado.

Exemplo de mensagem:
Este Ativo já está vinculado!

---

### Resultado esperado

O sistema deve:

- Exibir apenas ativos disponíveis para vínculo  
  **ou**
- Indicar previamente na listagem que o ativo já está vinculado (ex: desabilitado no status)

---

### Impacto

- Gera erro apenas após o envio do formulário
- Compromete a experiência do usuário
- Aumenta o retrabalho na operação
- Afeta a estabilidade dos testes automatizados

---

### Severidade

Média

---

### Observação

O problema indica falha de validação no momento da listagem dos ativos, permitindo seleção de dados inválidos que só são tratados na etapa de persistência.

## Bug 02 - Falha ao gerar relatório sintético por Área/Subárea

### Descrição

Ao selecionar o tipo de relatório **Sintético** e clicar em **"Gerar Relatório"**, o sistema apresenta erro e não gera o PDF.

---

### Passos para reproduzir

1. Acessar o menu: Relatórios → Atribuições por Área
2. Selecionar o tipo **Sintético**
3. Informar os filtros de Área/Subárea (opcional)
4. Clicar no botão **"Gerar Relatório"**

---

### Resultado atual

O sistema exibe a mensagem:
Erro. Falha ao carregar documento PDF.

O relatório não é gerado.

---

### Resultado esperado

O sistema deve gerar o relatório em PDF conforme o tipo selecionado (**Sintético**), exibindo os dados filtrados.

---

### Impacto

- Impede a geração de relatórios no formato sintético
- Compromete a funcionalidade principal do módulo de relatórios
- Pode afetar a tomada de decisão do usuário gestor

---

### Severidade

Alta

---

### Observação

O problema ocorre apenas para o tipo **Sintético**, enquanto o tipo **Analítico** funciona corretamente.

---

## Bug 03 - Permissão de seleção de período futuro

### Descrição

O sistema permite a seleção de datas futuras nos filtros de período para geração de relatórios.

---

### Passos para reproduzir

1. Acessar o menu: Relatórios
2. Informar uma data futura no campo de período (data inicial e/ou final)
3. Clicar em **"Pesquisar"** ou **"Gerar Relatório"**

---

### Resultado atual

O sistema aceita a data informada e prossegue com a busca/geração do relatório.

---

### Resultado esperado

O sistema deve impedir a seleção de datas futuras ou apresentar uma mensagem de validação informando que o período é inválido.

---

### Impacto

- Pode gerar consultas sem sentido ou sem retorno
- Compromete a validação dos dados exibidos
- Afeta a confiabilidade das informações apresentadas

---

### Severidade

Média

---

### Observação

A validação de datas deve ocorrer tanto no frontend quanto no backend para garantir consistência.

---

## Bug 04 - Data inicial maior que data final

### Descrição

O sistema permite informar uma data inicial maior que a data final nos filtros de período.

---

### Passos para reproduzir

1. Acessar o menu: Relatórios → Movimentação de Ativos
2. Informar uma data inicial maior que a data final
3. Clicar em **"Pesquisar"** ou **"Gerar Relatório"**

---

### Resultado atual

O sistema aceita o período informado sem apresentar erro de validação.

---

### Resultado esperado

O sistema deve validar o período informado, impedindo a busca e exibindo mensagem como:

"Data inicial não pode ser maior que a data final"

---

### Impacto

- Pode gerar resultados inconsistentes
- Compromete a lógica de filtragem do sistema

---

### Severidade

Média

---

### Observação

Validação de intervalo de datas é regra básica de negócio e deve ser tratada antes da execução da consulta.

---

## Bug 05 - Erro ao informar apenas data inicial no filtro de período

### Descrição

Ao informar apenas a **data inicial** no filtro de período e realizar a busca ou geração de relatório, o sistema apresenta erro inesperado e não trata corretamente a entrada de dados.

---

### Passos para reproduzir

1. Acessar o menu: Relatórios → Movimentação de Ativos
2. Informar apenas a **data inicial** no campo de período
3. Deixar o campo de data final em branco
4. Clicar em **"Pesquisar"** ou **"Gerar Relatório"**

---

### Resultado atual

O sistema exibe a seguinte mensagem de erro:
We're sorry, but something went wrong.
If you are the application owner check the logs for more information.

---

A aplicação não retorna resultado e não orienta o usuário sobre o problema, tendo que voltar a página.

---

### Resultado esperado

O sistema deve:

- Validar o preenchimento dos campos antes da execução
- Exibir uma mensagem amigável informando que a **data final é obrigatória**  
  **ou**
- Permitir a busca considerando apenas a data inicial (regra de negócio definida)

---

### Impacto

- Interrompe fluxo do usuário
- Exibe erro técnico não tratado

---

### Severidade

Alta

---

### Observação

Indica ausência de validação de entrada e tratamento de erro no backend.

---

# Melhorias

## Melhoria 01 - Uso de identificadores estáveis para automação (`data-cy`)

### Descrição

Os testes automatizados utilizam seletores baseados em atributos como `id`, `class`, `text` e estrutura do DOM, que podem sofrer alterações frequentes durante mudanças na interface.

Exemplos de seletores frágeis:

- Classes CSS que podem mudar
- Textos que podem ser alterados
- Estrutura do DOM (ex: `div > span > button`)

---

### Problema

- Alta manutenção
- Quebra de testes com mudanças visuais
- Maior fragilidade em mudanças de layout ou refatoração de código

---

### Proposta de melhoria

Adicionar atributos exclusivos e estáveis como `data-cy` (ou `data-testid`) nos principais elementos da aplicação, como:

- Botões
- Inputs
- Selects
- Mensagens
- Links

Esses identificadores não devem sofrer alterações com mudanças visuais, garantindo maior estabilidade nos testes.

---

### Exemplo de implementação

```html
<button data-cy="btn-salvar-atribuicao">Salvar</button>
<input data-cy="input-colaborador" />
<select data-cy="select-area"></select>
```

---

### Uso no Cypress

```javascript
cy.get('[data-cy="btn-salvar-atribuicao"]').click();
```

---

## Melhoria 02 - Massa de dados controlada

### Descrição

Os testes automatizados dependem da disponibilidade dinâmica de ativos no ambiente, o que pode gerar instabilidade (ex: ativos já vinculados).

---

### Problema

O teste precisa buscar um ativo disponível em tempo de execução, o que:

- Torna o teste não determinístico
- Pode gerar falsos negativos
- Aumenta a complexidade do código (loops/tentativas)

---

### Proposta de melhoria

Criar uma massa de dados fixa e controlada para automação, com ativos previamente cadastrados e garantidamente disponíveis para uso nos testes.

---

### Exemplo de implementação

```javascript
// fixtures/dadosTeste.js
export const dadosTeste = {
  tomboTeste: "TESTE-900",
  descricaoTeste: "DESKTOP TESTE",
  statusTeste: "TESTE",
};
```

---

## Melhoria 03 - Erro de escrita em Subárea

### Descrição

Foram identificados erros de grafia na descrição da subárea vinculada à área de CTI.

---

### Local

Menu: Atribuições → Nova Atribuição  
Campo: Subárea

---

### Problema

O sistema apresenta os textos:
INFORMÀTICA
FABRICA
DEPOSITO SERVICE DESK

---

### Correção esperada

Os textos corretos devem ser:
INFORMÁTICA
FÁBRICA
DEPÓSITO SERVICE DESK

---

### Impacto

- Afeta a padronização dos dados exibidos
- Pode gerar inconsistência em relatórios e filtros
- Compromete a qualidade visual e credibilidade do sistema

---

### Severidade

Baixa

---

### Observação

Tratam-se de erros de acentuação que podem ser corrigidos diretamente na base de dados ou na camada de exibição.

---

## Melhoria 04 - Ausência de indicação de campos obrigatórios (Colaborador e SO)

### Descrição

Os campos **Colaborador** e **Sistema Operacional (SO)** são obrigatórios no cadastro de uma nova atribuição, porém não possuem indicação visual (asterisco vermelho) que informe essa obrigatoriedade ao usuário.

---

### Local

Menu: Atribuições → Nova Atribuição  
Campos: Colaborador e Sistema Operacional (SO)

---

### Problema

- Os campos permitem interação sem indicar que são obrigatórios
- A validação ocorre apenas no momento do envio do formulário
- O usuário só percebe a obrigatoriedade após erro de submissão

---

### Resultado atual

O usuário consegue tentar salvar o formulário sem preencher os campos, recebendo erro apenas após a tentativa de envio.

---

### Resultado esperado

Os campos obrigatórios devem ser claramente identificados na interface, por exemplo:

- Uso de asterisco vermelho (\*)
- Mensagem indicativa de obrigatoriedade
- Feedback visual imediato ao usuário

---

### Impacto

- Prejudica a usabilidade do sistema
- Aumenta a chance de erro do usuário
- Gera retrabalho no preenchimento do formulário
- Afeta a experiência do usuário (UX)

---

### Severidade

Baixa

---

### Observação

A adoção de padrões visuais para campos obrigatórios melhora a experiência do usuário e reduz erros operacionais, sendo uma prática recomendada de UX.

---

## Melhoria 05 - Falha na exibição de opções ao selecionar Pacote Office

### Descrição

Ao marcar o checkbox **"Utilizará Pacote Office?"** e clicar no campo **"Selecione..."**, o sistema não apresenta opções para seleção.

---

### Local

Menu: Atribuições → Nova Atribuição  
Campo: Utilizará Pacote Office?

---

### Problema

- O checkbox pode ser marcado normalmente
- O campo de seleção é exibido
- Ao clicar em **"Selecione..."**, nenhuma opção é carregada ou apresentada ao usuário

---

### Resultado atual

O sistema não retorna opções no campo de seleção do Pacote Office após o checkbox ser marcado.

---

### Resultado esperado

Ao marcar o checkbox **"Utilizará Pacote Office?"**, o sistema deve exibir corretamente as opções disponíveis para seleção do pacote/versão do Office.

---

### Impacto

- Impede o preenchimento correto da informação de Pacote Office
- Pode bloquear ou prejudicar o cadastro/edição da atribuição
- Afeta a experiência do usuário no formulário

---

### Severidade

Média

---

### Observação

Recomenda-se verificar se as opções estão sendo carregadas corretamente após a marcação do checkbox e se o campo está habilitado para interação.
