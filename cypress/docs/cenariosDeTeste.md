# Cenários de Teste

## História 01/02 - Atribuição de Ativos

### CT01 - Cadastrar nova atribuição com sucesso
**Tipo:** Positivo  
**Pré-condição:** Usuário logado e ativo disponível  

**Passos:**
1. Acessar Atribuições
2. Clicar em Nova Atribuição
3. Selecionar Área e Subárea
4. Selecionar Colaborador
5. Preencher Atendente, Modalidade e SO
6. Marcar Pacote Office
7. Informar observação
8. Atribuir ativo
9. Salvar

**Resultado esperado:** Sistema cadastra a atribuição com sucesso.

---

### CT02 - Cancelar cadastro de atribuição
**Tipo:** Positivo  
**Pré-condição:** Usuário logado  

**Passos:**
1. Acessar Atribuições
2. Clicar em Nova Atribuição
3. Preencher os campos obrigatórios
4. Clicar em Cancelar

**Resultado esperado:** Sistema retorna para a tela de Atribuições sem salvar os dados.

---

### CT03 - Editar atribuição existente
**Tipo:** Positivo  
**Pré-condição:** Usuário logado e atribuição previamente cadastrada  

**Passos:**
1. Acessar Atribuições
2. Clicar no ícone de edição
3. Alterar os dados necessários
4. Salvar

**Resultado esperado:** Sistema atualiza a atribuição com sucesso.

---

### CT04 - Substituir ativo com defeito
**Tipo:** Positivo  
**Pré-condição:** Usuário logado e atribuição existente  

**Passos:**
1. Acessar Atribuições
2. Editar uma atribuição existente
3. Marcar o ativo como com defeito
4. Adicionar novo ativo
5. Salvar

**Resultado esperado:** Sistema permite substituir o ativo com sucesso.

---

## História 03 - Geração de Termos

### CT05 - Abrir e fechar modal de geração de termos
**Tipo:** Positivo  
**Pré-condição:** Usuário logado e atribuição selecionada  

**Passos:**
1. Acessar Atribuições
2. Selecionar uma atribuição
3. Clicar em Gerar Termos
4. Fechar o modal

**Resultado esperado:** Modal é aberto e fechado corretamente.

---

### CT06 - Seleção exclusiva de tipo de termo
**Tipo:** Positivo  
**Pré-condição:** Usuário logado e modal aberto  

**Passos:**
1. Acessar Atribuições
2. Selecionar uma atribuição
3. Clicar em Gerar Termos
4. Selecionar Termo de Responsabilidade
5. Selecionar Termo de Empréstimo

**Resultado esperado:** Apenas um tipo de termo permanece selecionado.

---

### CT07 - Gerar termo de responsabilidade em PDF
**Tipo:** Positivo  
**Pré-condição:** Usuário logado e atribuição selecionada  

**Passos:**
1. Acessar Atribuições
2. Selecionar uma atribuição
3. Abrir o modal de geração de termos
4. Selecionar a opção Termo de Responsabilidade
5. Clicar em Gerar

**Resultado esperado:** O sistema deve gerar e exibir um arquivo PDF com o título **"TERMO DE RESPONSABILIDADE"**, contendo de forma completa e correta os dados do colaborador e os ativos vinculados à atribuição selecionada.

---

### CT08 - Gerar termo de empréstimo em PDF
**Tipo:** Positivo  
**Pré-condição:** Usuário logado e atribuição selecionada  

**Passos:**
1. Acessar Atribuições
2. Selecionar uma atribuição
3. Abrir modal de termos
4. Selecionar Termo de Empréstimo
5. Clicar em Gerar

**Resultado esperado:** O sistema deve gerar e exibir um arquivo PDF com o título **"TERMO DE EMPRÉSTIMO"**, contendo de forma completa e correta os dados do colaborador e os ativos vinculados à atribuição selecionada.

---

## História 04 - Relatório de Movimentação

### CT09 - Filtrar movimentações por área e período
**Tipo:** Positivo  
**Pré-condição:** Usuário logado  

**Passos:**
1. Acessar Relatórios
2. Acessar Movimentação de Ativos
3. Selecionar Área
4. Informar período
5. Clicar em Pesquisar

**Resultado esperado:** Sistema exibe movimentações agrupadas por área.

---

### CT10 - Gerar relatório de movimentação em PDF
**Tipo:** Positivo  
**Pré-condição:** Usuário logado e dados existentes  

**Passos:**
1. Acessar Relatórios
2. Acessar Movimentação de Ativos
3. Aplicar filtros
4. Clicar em Gerar Relatório

**Resultado esperado:** PDF contém as informações filtradas.

---

### CT11 - Consultar período sem dados
**Tipo:** Negativo  
**Pré-condição:** Usuário logado  

**Passos:**
1. Acessar Relatórios
2. Informar período sem dados
3. Clicar em Pesquisar

**Resultado esperado:** Sistema informa que não há dados disponíveis.

---

## História 05 - Relatório de Atribuições por Área/Subárea

### CT12 - Filtrar atribuições por área e subárea
**Tipo:** Positivo  
**Pré-condição:** Usuário logado  

**Passos:**
1. Acessar Relatórios
2. Acessar Atribuições por Área/Subárea
3. Selecionar tipo Sintético
4. Selecionar Área e Subárea
5. Clicar em Pesquisar

**Resultado esperado:** Sistema exibe relatório sintético da área selecionada.

---

### CT13 - Gerar relatório analítico em PDF
**Tipo:** Positivo  
**Pré-condição:** Usuário logado e dados existentes  

**Passos:**
1. Acessar Relatórios
2. Acessar Atribuições por Área/Subárea
3. Selecionar tipo Analítico
4. Aplicar filtros
5. Clicar em Gerar Relatório

**Resultado esperado:** PDF contém área e subárea selecionadas.