# Checklist de Auditoria de Acessibilidade - Arquimedes

**Versão:** 1.0  
**Data:** 23 de dezembro de 2024  
**Auditor:** _______________  
**Data da Auditoria:** _______________

---

## Instruções de Uso

Este checklist deve ser usado para auditar a acessibilidade da plataforma Arquimedes. Para cada item:

- Marque **✅ Conforme** se o critério é atendido
- Marque **❌ Não Conforme** se o critério não é atendido
- Marque **N/A** se o critério não se aplica à página testada
- Adicione **Notas** com detalhes sobre problemas encontrados

---

## Página Testada: _______________

**URL:** _______________  
**Navegador:** _______________  
**Resolução:** _______________

---

## 1. Estrutura e Semântica HTML

| # | Critério | Status | Notas |
|---|----------|--------|-------|
| 1.1 | Página usa tags HTML5 semânticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 1.2 | Hierarquia de títulos é lógica (h1 → h2 → h3) sem pular níveis | ☐ ✅ ☐ ❌ ☐ N/A | |
| 1.3 | Apenas um `<h1>` por página | ☐ ✅ ☐ ❌ ☐ N/A | |
| 1.4 | Tag `<html lang="pt-BR">` está presente | ☐ ✅ ☐ ❌ ☐ N/A | |
| 1.5 | Cada página tem `<title>` único e descritivo | ☐ ✅ ☐ ❌ ☐ N/A | |
| 1.6 | Landmarks ARIA têm labels descritivos (`aria-label`) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 1.7 | Listas usam `<ul>`/`<ol>` + `<li>`, não `<div>` estilizados | ☐ ✅ ☐ ❌ ☐ N/A | |
| 1.8 | Código HTML passa no W3C Validator sem erros críticos | ☐ ✅ ☐ ❌ ☐ N/A | |

**Problemas Encontrados:**

---

## 2. Navegação por Teclado

| # | Critério | Status | Notas |
|---|----------|--------|-------|
| 2.1 | Todos os links são alcançáveis via Tab | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.2 | Todos os botões são alcançáveis via Tab | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.3 | Todos os campos de formulário são alcançáveis via Tab | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.4 | Ordem de foco é lógica e segue ordem visual | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.5 | Indicador de foco é claramente visível em todos os elementos | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.6 | Contraste do indicador de foco é adequado (3:1 mínimo) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.7 | Link "Pular para conteúdo principal" está presente e funcional | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.8 | Foco não fica preso em nenhum componente (sem armadilha) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.9 | Modais podem ser fechados com Escape | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.10 | Foco retorna ao elemento que abriu o modal ao fechar | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.11 | Tabs horizontais podem ser navegadas com setas ←/→ | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.12 | Botões respondem a Enter e Espaço | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.13 | Links respondem a Enter (Espaço não deve ativar) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.14 | Menus dropdown são operáveis apenas com teclado | ☐ ✅ ☐ ❌ ☐ N/A | |
| 2.15 | Nenhum elemento invisível recebe foco | ☐ ✅ ☐ ❌ ☐ N/A | |

**Problemas Encontrados:**

---

## 3. ARIA e Nomes Acessíveis

| # | Critério | Status | Notas |
|---|----------|--------|-------|
| 3.1 | Botões sem texto visível têm `aria-label` descritivo | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.2 | Ícones decorativos têm `aria-hidden="true"` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.3 | Ícones informativos têm `role="img"` e `aria-label` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.4 | Todos os campos de formulário têm `<label>` associado | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.5 | Campos obrigatórios têm `aria-required="true"` ou `required` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.6 | Mensagens de erro usam `aria-describedby` para associar ao campo | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.7 | Toasts de sucesso usam `role="status"` ou `aria-live="polite"` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.8 | Toasts de erro usam `role="alert"` ou `aria-live="assertive"` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.9 | Modais usam `role="dialog"` e `aria-modal="true"` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.10 | Modais têm `aria-labelledby` apontando para o título | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.11 | Tabs usam `role="tablist"`, `role="tab"`, `role="tabpanel"` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.12 | Tab ativa tem `aria-selected="true"` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.13 | Botões de toggle usam `aria-pressed="true/false"` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.14 | Accordions usam `aria-expanded="true/false"` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.15 | Iframes (YouTube) têm atributo `title` descritivo | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.16 | Todas as imagens têm atributo `alt` (vazio se decorativa) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.17 | Links descrevem destino ("Ver módulo X"), não "Clique aqui" | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.18 | Item ativo do menu tem `aria-current="page"` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.19 | Barras de progresso usam `role="progressbar"` com `aria-valuenow` | ☐ ✅ ☐ ❌ ☐ N/A | |
| 3.20 | Navegação principal tem `aria-label="Menu principal"` | ☐ ✅ ☐ ❌ ☐ N/A | |

**Problemas Encontrados:**

---

## 4. Contraste e Visibilidade

| # | Critério | Status | Notas |
|---|----------|--------|-------|
| 4.1 | Texto normal (< 18pt) tem contraste mínimo de 4.5:1 | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.2 | Texto grande (≥ 18pt ou ≥ 14pt bold) tem contraste mínimo de 3:1 | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.3 | Bordas de campos de formulário têm contraste mínimo de 3:1 | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.4 | Ícones e componentes UI têm contraste mínimo de 3:1 | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.5 | Indicadores de foco têm contraste mínimo de 3:1 | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.6 | Estados hover/focus mantêm contraste adequado | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.7 | Informações não dependem apenas de cor (ex: erro tem ícone) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.8 | Conteúdo permanece legível em zoom de 200% | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.9 | Não há scroll horizontal em zoom de 200% | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.10 | Layout se adapta a largura de 320px sem scroll horizontal | ☐ ✅ ☐ ❌ ☐ N/A | |
| 4.11 | Texto é HTML/CSS, não imagem (exceto logos) | ☐ ✅ ☐ ❌ ☐ N/A | |

**Problemas Encontrados:**

**Combinações de Cores Testadas:**

| Elemento | Cor Texto | Cor Fundo | Contraste | Passa? |
|----------|-----------|-----------|-----------|--------|
| Texto corpo | | | | ☐ Sim ☐ Não |
| Botão primário | | | | ☐ Sim ☐ Não |
| Botão secundário | | | | ☐ Sim ☐ Não |
| Link | | | | ☐ Sim ☐ Não |
| Badge verde | | | | ☐ Sim ☐ Não |
| Badge amarelo | | | | ☐ Sim ☐ Não |
| Badge vermelho | | | | ☐ Sim ☐ Não |

---

## 5. Conteúdo Multimídia

| # | Critério | Status | Notas |
|---|----------|--------|-------|
| 5.1 | Vídeos do YouTube têm legendas em português disponíveis | ☐ ✅ ☐ ❌ ☐ N/A | |
| 5.2 | Player de vídeo tem controles acessíveis por teclado | ☐ ✅ ☐ ❌ ☐ N/A | |
| 5.3 | Áudio/vídeo não reproduz automaticamente ao carregar | ☐ ✅ ☐ ❌ ☐ N/A | |
| 5.4 | Vídeos têm transcrições textuais (desejável, não obrigatório) | ☐ ✅ ☐ ❌ ☐ N/A | |

**Problemas Encontrados:**

---

## 6. Formulários e Interações

| # | Critério | Status | Notas |
|---|----------|--------|-------|
| 6.1 | Campos têm labels visíveis (placeholders não substituem) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 6.2 | Campos complexos têm instruções ou exemplos | ☐ ✅ ☐ ❌ ☐ N/A | |
| 6.3 | Erros de validação são anunciados para leitores de tela | ☐ ✅ ☐ ❌ ☐ N/A | |
| 6.4 | Sugestões de correção são fornecidas quando possível | ☐ ✅ ☐ ❌ ☐ N/A | |
| 6.5 | Ações importantes pedem confirmação (logout, exclusão) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 6.6 | Não há limites de tempo para completar tarefas | ☐ ✅ ☐ ❌ ☐ N/A | |
| 6.7 | Usuário pode revisar antes de submeter | ☐ ✅ ☐ ❌ ☐ N/A | |

**Problemas Encontrados:**

---

## 7. Navegação e Orientação

| # | Critério | Status | Notas |
|---|----------|--------|-------|
| 7.1 | Múltiplas formas de navegação disponíveis (menu, breadcrumb) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 7.2 | Breadcrumb presente em páginas internas | ☐ ✅ ☐ ❌ ☐ N/A | |
| 7.3 | Página atual indicada no menu (`aria-current="page"`) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 7.4 | Navegação mantém mesma ordem em todas as páginas | ☐ ✅ ☐ ❌ ☐ N/A | |
| 7.5 | Componentes com mesma função têm mesmo label/ícone | ☐ ✅ ☐ ❌ ☐ N/A | |

**Problemas Encontrados:**

---

## 8. Testes com Leitor de Tela

**Leitor de Tela Usado:** ☐ NVDA ☐ JAWS ☐ VoiceOver  
**Navegador:** _______________

| # | Critério | Status | Notas |
|---|----------|--------|-------|
| 8.1 | Estrutura da página é anunciada (landmarks, regiões) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.2 | Títulos são anunciados com nível correto | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.3 | Links são anunciados com texto descritivo | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.4 | Botões são anunciados como "botão" | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.5 | Campos de formulário são anunciados com labels corretos | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.6 | Imagens decorativas são ignoradas | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.7 | Imagens informativas são anunciadas com alt text | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.8 | Estados de componentes são anunciados (expandido, selecionado) | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.9 | Mensagens dinâmicas (toasts) são anunciadas | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.10 | Navegação por atalhos (H, K, B, F) funciona corretamente | ☐ ✅ ☐ ❌ ☐ N/A | |
| 8.11 | Conteúdo é compreensível sem contexto visual | ☐ ✅ ☐ ❌ ☐ N/A | |

**Problemas Encontrados:**

---

## 9. Ferramentas Automatizadas

### 9.1 axe DevTools

**Data do Teste:** _______________  
**Versão:** _______________

| Severidade | Quantidade | Principais Problemas |
|------------|------------|----------------------|
| Critical | | |
| Serious | | |
| Moderate | | |
| Minor | | |

**Detalhes:**

### 9.2 WAVE

**Data do Teste:** _______________

| Tipo | Quantidade | Principais Problemas |
|------|------------|----------------------|
| Errors | | |
| Alerts | | |
| Features | | |
| Structural Elements | | |
| Contrast Errors | | |

**Detalhes:**

### 9.3 Lighthouse

**Data do Teste:** _______________

**Pontuação de Acessibilidade:** _____ / 100

**Principais Problemas:**

---

## 10. Resumo da Auditoria

### Conformidade Geral

- **Total de Critérios Testados:** _____
- **Critérios Conformes:** _____
- **Critérios Não Conformes:** _____
- **Critérios Não Aplicáveis:** _____
- **Taxa de Conformidade:** _____% 

### Problemas Críticos (Prioridade Alta)

1. 
2. 
3. 

### Problemas Importantes (Prioridade Média)

1. 
2. 
3. 

### Melhorias Recomendadas (Prioridade Baixa)

1. 
2. 
3. 

### Próximos Passos

1. 
2. 
3. 

---

## Assinaturas

**Auditor:** _______________  
**Data:** _______________  

**Revisado por:** _______________  
**Data:** _______________
