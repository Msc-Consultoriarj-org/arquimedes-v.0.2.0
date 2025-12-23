# Guia de Testes de Acessibilidade - Arquimedes

Este diretório contém toda a documentação e ferramentas necessárias para testar e garantir a acessibilidade da plataforma Arquimedes.

---

## 📚 Documentos Disponíveis

### 1. Plano de Testes de Acessibilidade (`ACCESSIBILITY_TESTING_PLAN.md`)

Documento técnico completo (60+ páginas) que detalha:

- Princípios WCAG 2.1 e critérios de sucesso aplicáveis
- Especificações técnicas de navegação por teclado
- Guia completo de implementação de ARIA labels
- Metodologia de testes manuais e automatizados
- Ferramentas recomendadas (axe DevTools, WAVE, Lighthouse, NVDA, VoiceOver)
- Plano de correções prioritárias
- Estratégias de manutenção contínua

**Público-alvo:** Desenvolvedores, designers, QA, gerentes de produto

**Quando usar:** Antes de iniciar desenvolvimento de novas features, durante code review, ao planejar correções

### 2. Checklist de Auditoria (`ACCESSIBILITY_AUDIT_CHECKLIST.md`)

Checklist executável para auditorias manuais de acessibilidade, organizado em 10 seções:

1. Estrutura e Semântica HTML
2. Navegação por Teclado
3. ARIA e Nomes Acessíveis
4. Contraste e Visibilidade
5. Conteúdo Multimídia
6. Formulários e Interações
7. Navegação e Orientação
8. Testes com Leitor de Tela
9. Ferramentas Automatizadas
10. Resumo da Auditoria

**Público-alvo:** QA, auditores de acessibilidade, desenvolvedores

**Quando usar:** Ao realizar auditoria completa de acessibilidade, antes de releases importantes, após implementar correções

### 3. Script de Teste Automatizado (`../scripts/test-accessibility.mjs`)

Script Node.js que executa testes automatizados usando axe-core em todas as páginas principais da plataforma.

**Recursos:**
- Testa 7 páginas principais automaticamente
- Detecta problemas de acessibilidade baseados em WCAG 2.1 AA
- Classifica problemas por severidade (crítico, sério, moderado, menor)
- Gera relatório detalhado com estatísticas
- Exit code baseado em problemas críticos (útil para CI/CD)

---

## 🚀 Como Usar

### Passo 1: Ler o Plano de Testes

Antes de iniciar qualquer teste, leia o **Plano de Testes de Acessibilidade** para entender:

- Princípios fundamentais de acessibilidade
- Padrões esperados para cada componente
- Ferramentas disponíveis e como usá-las

```bash
# Abrir documento no editor
code docs/ACCESSIBILITY_TESTING_PLAN.md
```

### Passo 2: Executar Testes Automatizados

Os testes automatizados devem ser executados regularmente para detectar problemas técnicos.

**Pré-requisitos:**

```bash
# Instalar dependências (se ainda não instaladas)
pnpm add -D puppeteer axe-core
```

**Executar testes:**

```bash
# 1. Iniciar servidor de desenvolvimento em um terminal
pnpm dev

# 2. Em outro terminal, executar testes
node scripts/test-accessibility.mjs
```

**Interpretar resultados:**

- **Crítico (🔴):** Bloqueia uso para usuários com deficiência. **Corrigir imediatamente.**
- **Sério (🟠):** Dificulta muito o uso. **Corrigir em até 1 semana.**
- **Moderado (🟡):** Causa inconveniência. **Corrigir em até 1 mês.**
- **Menor (🔵):** Melhoria incremental. **Corrigir quando possível.**

**Adicionar ao CI/CD:**

```json
// package.json
{
  "scripts": {
    "test:a11y": "node scripts/test-accessibility.mjs"
  }
}
```

```yaml
# .github/workflows/ci.yml (exemplo)
- name: Run Accessibility Tests
  run: |
    pnpm dev &
    sleep 10
    pnpm test:a11y
```

### Passo 3: Realizar Auditoria Manual

Testes automatizados detectam apenas 30-40% dos problemas. Auditoria manual é essencial.

**Usar o Checklist:**

```bash
# Abrir checklist
code docs/ACCESSIBILITY_AUDIT_CHECKLIST.md
```

**Processo recomendado:**

1. **Imprimir ou abrir checklist** em tela secundária
2. **Navegar pela página** usando apenas teclado (desconectar mouse)
3. **Marcar cada item** do checklist (✅ Conforme, ❌ Não Conforme, N/A)
4. **Documentar problemas** na seção "Problemas Encontrados"
5. **Testar com leitor de tela** (NVDA no Windows, VoiceOver no macOS)
6. **Executar ferramentas automatizadas** (axe DevTools, WAVE, Lighthouse)
7. **Compilar relatório** com resumo e próximos passos

### Passo 4: Testar com Ferramentas de Navegador

#### axe DevTools (Recomendado)

1. Instalar extensão: [Chrome](https://chrome.google.com/webstore/detail/axe-devtools/lhdoppojpmngadmnindnejefpokejbdd) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)
2. Abrir DevTools (F12)
3. Navegar até aba "axe DevTools"
4. Clicar em "Scan ALL of my page"
5. Revisar problemas encontrados

#### WAVE

1. Instalar extensão: [Chrome](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/)
2. Abrir página a testar
3. Clicar no ícone WAVE na barra de ferramentas
4. Revisar ícones sobrepostos (vermelho = erro, amarelo = alerta)

#### Lighthouse

1. Abrir DevTools (F12)
2. Navegar até aba "Lighthouse"
3. Selecionar categoria "Accessibility"
4. Clicar em "Analyze page load"
5. Revisar pontuação e problemas

### Passo 5: Testar com Leitores de Tela

#### NVDA (Windows - Gratuito)

```bash
# Download: https://www.nvaccess.org/download/
```

**Comandos básicos:**
- `Ctrl`: Parar fala
- `NVDA + Q`: Sair do NVDA
- `Seta ↓`: Ler próxima linha
- `Tab`: Pular para próximo elemento interativo
- `H`: Pular para próximo título
- `K`: Pular para próximo link
- `B`: Pular para próximo botão

**Verificar:**
- Estrutura da página é anunciada?
- Títulos têm níveis corretos?
- Links são descritivos?
- Campos de formulário têm labels?
- Imagens decorativas são ignoradas?
- Estados de componentes são anunciados?

#### VoiceOver (macOS/iOS - Integrado)

**Ativar:**
- macOS: `Cmd + F5`
- iOS: Configurações → Acessibilidade → VoiceOver

**Comandos básicos (macOS):**
- `VO + A`: Iniciar leitura (VO = Control + Option)
- `VO + Seta →`: Próximo item
- `VO + Espaço`: Ativar item
- `VO + H`: Próximo título

### Passo 6: Testar Contraste de Cores

#### WebAIM Contrast Checker (Online)

```bash
# URL: https://webaim.org/resources/contrastchecker/
```

**Processo:**
1. Identificar combinações de texto/fundo
2. Extrair cores (hex) usando DevTools ou Color Picker
3. Inserir no Contrast Checker
4. Verificar se passa WCAG AA:
   - Texto normal: 4.5:1 mínimo
   - Texto grande (≥18pt): 3:1 mínimo
5. Ajustar cores se necessário

#### axe DevTools (Automático)

1. Executar scan com axe DevTools
2. Filtrar por "Contrast"
3. Revisar todos os problemas de contraste
4. Corrigir cores com contraste insuficiente

### Passo 7: Testar Zoom e Responsividade

#### Zoom 200%

```bash
# Atalho: Ctrl + (ou Cmd + no macOS)
```

**Verificar:**
- Todo conteúdo permanece visível?
- Não há scroll horizontal?
- Texto não é cortado?
- Botões permanecem clicáveis?

#### Reflow 320px

```bash
# DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
# Definir largura: 320px
```

**Verificar:**
- Layout se adapta sem scroll horizontal?
- Elementos são empilhados verticalmente?
- Texto permanece legível?
- Botões têm tamanho adequado (mínimo 44x44px)?

---

## 🔧 Correções Prioritárias

Com base na auditoria inicial, estas são as correções mais importantes:

### 🔴 Críticas (Implementar Imediatamente)

1. **Adicionar link "Pular para conteúdo principal"**
   - Arquivo: `client/src/App.tsx`
   - Implementação: Ver seção 7.1.1 do Plano de Testes

2. **Corrigir ARIA labels em botões de ícone**
   - Arquivos: `MobileNav.tsx`, `SoundToggle.tsx`, `OnboardingModal.tsx`
   - Implementação: Ver seção 7.1.2 do Plano de Testes

3. **Adicionar role="dialog" em modais**
   - Arquivo: `OnboardingModal.tsx`
   - Implementação: Ver seção 7.1.3 do Plano de Testes

4. **Corrigir navegação por teclado em Tabs**
   - Arquivos: `ExerciseRoomPage.tsx`, `VideoRoomPage.tsx`
   - Implementação: Ver seção 7.1.4 do Plano de Testes

### 🟠 Importantes (Implementar em 1 Semana)

1. **Adicionar aria-live para mensagens dinâmicas**
   - Implementação: Ver seção 7.2.1 do Plano de Testes

2. **Melhorar descrições de links**
   - Implementação: Ver seção 7.2.2 do Plano de Testes

3. **Adicionar títulos únicos por página**
   - Implementação: Ver seção 7.2.3 do Plano de Testes

4. **Adicionar aria-current="page" ao menu**
   - Arquivo: `Sidebar.tsx`
   - Implementação: Ver seção 7.2.4 do Plano de Testes

---

## 📊 Métricas de Sucesso

### Objetivos de Conformidade

- **Curto Prazo (1 mês):**
  - ✅ 0 problemas críticos
  - ✅ < 5 problemas sérios
  - ✅ Pontuação Lighthouse Accessibility > 85

- **Médio Prazo (3 meses):**
  - ✅ 0 problemas críticos ou sérios
  - ✅ < 10 problemas moderados
  - ✅ Pontuação Lighthouse Accessibility > 90

- **Longo Prazo (6 meses):**
  - ✅ Conformidade total com WCAG 2.1 AA
  - ✅ Pontuação Lighthouse Accessibility > 95
  - ✅ Feedback positivo de usuários de tecnologias assistivas

### Indicadores de Qualidade

- **Testes Automatizados:** Executados em todo commit (CI/CD)
- **Auditoria Manual:** Realizada mensalmente
- **Testes com Usuários:** Realizados trimestralmente
- **Treinamento de Equipe:** Anual

---

## 🎓 Recursos de Aprendizado

### Documentação Oficial

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Referência rápida oficial
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - Padrões de implementação
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - Tutoriais e guias

### Ferramentas

- [axe DevTools](https://www.deque.com/axe/devtools/) - Extensão de navegador
- [WAVE](https://wave.webaim.org/) - Ferramenta de avaliação visual
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoria integrada ao Chrome
- [NVDA](https://www.nvaccess.org/) - Leitor de tela gratuito (Windows)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/) - Verificador de contraste

### Comunidade

- [A11y Project](https://www.a11yproject.com/) - Recursos e checklist
- [WebAIM](https://webaim.org/) - Artigos e tutoriais
- [Inclusive Components](https://inclusive-components.design/) - Padrões de componentes acessíveis
- [Deque University](https://dequeuniversity.com/) - Cursos pagos de acessibilidade

### Cursos Recomendados

- [Web Accessibility by Google (Udacity)](https://www.udacity.com/course/web-accessibility--ud891) - Gratuito
- [Digital Accessibility (W3Cx)](https://www.edx.org/course/web-accessibility-introduction) - Gratuito
- [Accessibility in JavaScript Applications (Frontend Masters)](https://frontendmasters.com/courses/javascript-accessibility/) - Pago

---

## 🤝 Contribuindo

### Reportar Problemas de Acessibilidade

Se você encontrar um problema de acessibilidade:

1. Verificar se já não foi reportado
2. Criar issue com template "Accessibility Issue"
3. Incluir:
   - Descrição do problema
   - Página/componente afetado
   - Critério WCAG violado
   - Severidade (crítico, sério, moderado, menor)
   - Passos para reproduzir
   - Screenshot ou vídeo (se aplicável)
   - Sugestão de correção (se possível)

### Implementar Correções

Ao implementar correções de acessibilidade:

1. Consultar o Plano de Testes para padrões esperados
2. Implementar correção seguindo exemplos de código
3. Testar manualmente com teclado e leitor de tela
4. Executar testes automatizados (`pnpm test:a11y`)
5. Atualizar checklist marcando item como corrigido
6. Criar PR com descrição detalhada da correção

---

## 📞 Suporte

Para dúvidas sobre acessibilidade:

- **Documentação:** Consultar `ACCESSIBILITY_TESTING_PLAN.md`
- **Issues:** Criar issue no repositório com tag `accessibility`
- **Discussões:** Usar Discussions no GitHub para perguntas gerais

---

## 📝 Changelog

### v1.0.0 - 23/12/2024

- ✅ Criado Plano de Testes de Acessibilidade completo
- ✅ Criado Checklist de Auditoria executável
- ✅ Criado script de testes automatizados
- ✅ Documentadas correções prioritárias
- ✅ Estabelecidas métricas de sucesso

---

**Última atualização:** 23 de dezembro de 2024  
**Versão:** 1.0.0  
**Mantido por:** Equipe Arquimedes
