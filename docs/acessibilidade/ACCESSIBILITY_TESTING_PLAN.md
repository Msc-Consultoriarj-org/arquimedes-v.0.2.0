# Plano de Testes de Acessibilidade - Arquimedes v0.2.0

**Autor:** Manus AI  
**Data:** 23 de dezembro de 2024  
**Versão:** 1.0  
**Objetivo:** Garantir conformidade com WCAG 2.1 nível AA e acessibilidade universal para a plataforma educacional Arquimedes

---

## 1. Introdução

A acessibilidade digital é um direito fundamental que garante que todas as pessoas, independentemente de suas capacidades físicas, sensoriais ou cognitivas, possam acessar e utilizar aplicações web. Este documento estabelece um plano de testes abrangente para avaliar e garantir a acessibilidade da plataforma Arquimedes, focando especialmente em usuários com deficiência visual, motora e cognitiva.

O plano segue as diretrizes internacionais estabelecidas pelas Web Content Accessibility Guidelines (WCAG) 2.1 em seu nível de conformidade AA, que é o padrão recomendado para aplicações educacionais e governamentais. A conformidade com WCAG 2.1 AA não apenas melhora a experiência de usuários com deficiência, mas também beneficia todos os usuários ao tornar a interface mais clara, navegável e robusta.

### 1.1 Escopo do Projeto

A plataforma Arquimedes é uma aplicação educacional de matemática voltada para adultos, composta por múltiplas interfaces interativas incluindo sistema de autenticação, dashboard personalizado, páginas de aula com conteúdo rico em LaTeX, exercícios interativos, vídeos educacionais do YouTube, sistema de gamificação (XP, níveis, conquistas), e navegação hierárquica por disciplinas e módulos.

### 1.2 Público-Alvo Prioritário

O plano de testes considera especialmente as necessidades de:

**Usuários com deficiência visual** que utilizam leitores de tela como NVDA (Windows), JAWS (Windows) ou VoiceOver (macOS/iOS) para navegar pela interface. Estes usuários dependem de marcação semântica correta, ARIA labels descritivos e estrutura lógica de conteúdo.

**Usuários com deficiência motora** que navegam exclusivamente por teclado sem uso de mouse, utilizando teclas Tab, Enter, Escape e setas direcionais. A navegação deve ser lógica, eficiente e sem armadilhas de foco.

**Usuários com baixa visão** que dependem de ampliação de tela (zoom até 200% ou mais) e necessitam de contraste adequado entre texto e fundo para leitura confortável.

**Usuários com deficiência cognitiva** que se beneficiam de interfaces consistentes, feedback claro, e tempo adequado para completar tarefas sem pressão temporal.

---

## 2. Princípios WCAG 2.1 e Critérios de Sucesso

As WCAG 2.1 organizam-se em torno de quatro princípios fundamentais conhecidos como POUR: Perceptível, Operável, Compreensível e Robusto. Cada princípio contém diretrizes específicas, e cada diretriz possui critérios de sucesso mensuráveis classificados em três níveis: A (básico), AA (intermediário) e AAA (avançado).

### 2.1 Princípio 1: Perceptível

O conteúdo deve ser apresentado de forma que os usuários possam percebê-lo através de pelo menos um dos seus sentidos. Para a plataforma Arquimedes, isso significa garantir que todas as informações visuais tenham alternativas textuais ou auditivas.

**Critérios de Sucesso Aplicáveis (Nível AA):**

| Critério | Descrição | Aplicação no Arquimedes |
|----------|-----------|-------------------------|
| **1.1.1 Conteúdo Não Textual (A)** | Todas as imagens, ícones e gráficos devem ter texto alternativo descritivo | Ícones de módulos matemáticos (adição, subtração, multiplicação, divisão) devem ter `alt` text descritivo. Componentes visuais como `NumberLine` e `MultiplicationMatrix` devem ter `aria-label` explicando o conteúdo visual. |
| **1.2.1 Apenas Áudio e Apenas Vídeo (A)** | Conteúdo pré-gravado de áudio/vídeo deve ter alternativa textual | Vídeos do YouTube embutidos devem ter legendas em português disponíveis. Considerar adicionar transcrições textuais para vídeos educacionais. |
| **1.2.2 Legendas (A)** | Vídeos devem ter legendas sincronizadas | Verificar que todos os 86 vídeos educacionais do YouTube possuem legendas em português. Priorizar vídeos com legendas oficiais do canal. |
| **1.3.1 Informação e Relações (A)** | Estrutura semântica deve ser preservada programaticamente | Usar tags HTML5 semânticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`). Hierarquia de títulos (`<h1>` a `<h6>`) deve ser lógica e sequencial. |
| **1.3.2 Sequência Significativa (A)** | Ordem de leitura deve ser lógica | Ordem DOM deve corresponder à ordem visual. Leitores de tela devem navegar na sequência: cabeçalho → navegação → conteúdo principal → sidebar → rodapé. |
| **1.4.3 Contraste (AA)** | Contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande | Validar contraste de todas as combinações de cores: texto sobre fundo, botões, badges, cards. Usar ferramentas como WebAIM Contrast Checker. |
| **1.4.4 Redimensionamento de Texto (AA)** | Texto deve ser ampliável até 200% sem perda de conteúdo | Testar zoom do navegador em 200%. Verificar que não há overflow horizontal, texto cortado ou sobreposição de elementos. |
| **1.4.5 Imagens de Texto (AA)** | Evitar texto em imagens quando possível | Preferir texto HTML estilizado com CSS. Equações matemáticas devem usar LaTeX renderizado (já implementado com KaTeX). |
| **1.4.10 Reflow (AA)** | Conteúdo deve se adaptar a 320px de largura sem scroll horizontal | Testar em viewport de 320x568px (iPhone SE). Layout deve ser responsivo com elementos empilhados verticalmente. |
| **1.4.11 Contraste Não Textual (AA)** | Contraste de 3:1 para componentes de interface e gráficos | Ícones, bordas de campos de formulário, indicadores de foco devem ter contraste adequado. |

### 2.2 Princípio 2: Operável

Os usuários devem conseguir operar todos os componentes da interface, independentemente do dispositivo de entrada utilizado. A navegação por teclado é especialmente crítica para usuários com deficiência motora ou visual.

**Critérios de Sucesso Aplicáveis (Nível AA):**

| Critério | Descrição | Aplicação no Arquimedes |
|----------|-----------|-------------------------|
| **2.1.1 Teclado (A)** | Toda funcionalidade deve ser acessível via teclado | Todos os botões, links, campos de formulário, tabs, modais e menus devem ser operáveis com Tab, Enter, Escape e setas. |
| **2.1.2 Sem Armadilha de Teclado (A)** | Foco não deve ficar preso em nenhum componente | Modais (OnboardingModal, MobileNav Sheet) devem permitir fechar com Escape. Foco deve retornar ao elemento que abriu o modal. |
| **2.1.4 Atalhos de Teclado de Caractere Único (A)** | Atalhos de uma tecla devem ser desativados ou remapeados | Se implementar atalhos (ex: "E" para exercícios), permitir desativar nas configurações ou exigir modificador (Ctrl/Alt). |
| **2.4.1 Ignorar Blocos (A)** | Fornecer mecanismo para pular blocos repetitivos | Adicionar link "Pular para conteúdo principal" no topo da página, visível ao receber foco do teclado. |
| **2.4.2 Página com Título (A)** | Cada página deve ter título descritivo único | Tag `<title>` deve refletir contexto: "Dashboard - Arquimedes", "Adição e Subtração - Aritmética - Arquimedes". |
| **2.4.3 Ordem do Foco (A)** | Ordem de navegação por Tab deve ser lógica | Foco deve seguir ordem visual: topo → esquerda → direita → baixo. Evitar `tabindex` positivo. |
| **2.4.4 Finalidade do Link (A)** | Texto do link deve descrever seu destino | Evitar "Clique aqui" ou "Saiba mais". Preferir "Explorar módulo de Adição e Subtração" ou "Ver próxima aula". |
| **2.4.5 Várias Formas (AA)** | Múltiplas formas de localizar páginas | Fornecer navegação hierárquica (breadcrumb), busca global (futuro), menu lateral e mapa do site. |
| **2.4.6 Cabeçalhos e Rótulos (AA)** | Cabeçalhos e labels devem ser descritivos | Títulos de seções devem ser claros. Labels de formulários devem explicar o que é esperado. |
| **2.4.7 Foco Visível (AA)** | Indicador de foco deve ser claramente visível | Outline padrão do navegador ou estilo customizado com contraste adequado. Nunca usar `outline: none` sem alternativa. |
| **2.5.1 Gestos de Ponteiro (A)** | Funcionalidades multi-toque devem ter alternativa | Drag-and-drop (se implementado) deve ter botões alternativos. Pinch-to-zoom não deve ser bloqueado. |
| **2.5.2 Cancelamento de Ponteiro (A)** | Ações devem ocorrer no `mouseup`, não `mousedown` | Botões devem usar evento `click` padrão. Usuário deve poder cancelar arrastando para fora do botão. |
| **2.5.3 Rótulo no Nome (A)** | Nome acessível deve incluir texto visível | Se botão mostra "Enviar Resposta", `aria-label` não deve ser completamente diferente como "Submeter exercício". |

### 2.3 Princípio 3: Compreensível

O conteúdo e a operação da interface devem ser compreensíveis para todos os usuários, incluindo aqueles com deficiências cognitivas ou de aprendizagem.

**Critérios de Sucesso Aplicáveis (Nível AA):**

| Critério | Descrição | Aplicação no Arquimedes |
|----------|-----------|-------------------------|
| **3.1.1 Idioma da Página (A)** | Idioma principal deve ser declarado | Tag `<html lang="pt-BR">` deve estar presente. |
| **3.1.2 Idioma de Partes (AA)** | Mudanças de idioma devem ser marcadas | Se houver termos em inglês, usar `<span lang="en">`. Nomes próprios não precisam. |
| **3.2.1 Em Foco (A)** | Foco não deve causar mudanças de contexto | Focar em campo não deve submeter formulário. Focar em menu não deve abrir automaticamente. |
| **3.2.2 Em Entrada (A)** | Entrada de dados não deve causar mudanças inesperadas | Mudar valor de select não deve submeter formulário sem confirmação. |
| **3.2.3 Navegação Consistente (AA)** | Mecanismos de navegação devem ser consistentes | Menu lateral (Sidebar) deve manter mesma ordem em todas as páginas. Breadcrumb deve seguir mesmo padrão. |
| **3.2.4 Identificação Consistente (AA)** | Componentes com mesma função devem ter mesma identificação | Botão "Sair" deve ter mesmo ícone e texto em todas as páginas. Ícones de disciplinas devem ser consistentes. |
| **3.3.1 Identificação de Erro (A)** | Erros devem ser identificados e descritos | Validação de formulários deve mostrar mensagens claras: "Campo obrigatório" ou "Resposta incorreta, tente novamente". |
| **3.3.2 Rótulos ou Instruções (A)** | Campos de entrada devem ter labels ou instruções | Todos os `<input>` devem ter `<label>` associado ou `aria-label`. Placeholders não substituem labels. |
| **3.3.3 Sugestão de Erro (AA)** | Sugestões devem ser fornecidas quando possível | Se resposta de exercício está errada, mostrar hint progressivo após 2 tentativas (já implementado). |
| **3.3.4 Prevenção de Erro (AA)** | Ações importantes devem ser reversíveis ou confirmáveis | Logout deve pedir confirmação. Submissão de exercício deve permitir revisar antes de enviar. |

### 2.4 Princípio 4: Robusto

O conteúdo deve ser robusto o suficiente para ser interpretado por uma ampla variedade de agentes de usuário, incluindo tecnologias assistivas.

**Critérios de Sucesso Aplicáveis (Nível AA):**

| Critério | Descrição | Aplicação no Arquimedes |
|----------|-----------|-------------------------|
| **4.1.1 Análise (A)** | HTML deve ser válido e bem formado | Validar com W3C Markup Validator. Corrigir tags não fechadas, IDs duplicados, atributos inválidos. |
| **4.1.2 Nome, Função, Valor (A)** | Componentes devem expor nome, função e valor para APIs de acessibilidade | Componentes customizados devem usar ARIA roles apropriados. Botões devem ser `<button>`, não `<div onclick>`. |
| **4.1.3 Mensagens de Status (AA)** | Mensagens dinâmicas devem ser anunciadas | Toasts de sucesso/erro devem usar `role="status"` ou `role="alert"`. Mudanças de pontuação devem ser anunciadas. |

---

## 3. Navegação por Teclado: Especificações Técnicas

A navegação por teclado é um dos pilares da acessibilidade web. Usuários que não podem ou não utilizam mouse dependem exclusivamente do teclado para interagir com aplicações web. Este capítulo detalha os padrões de navegação esperados para cada componente da plataforma Arquimedes.

### 3.1 Teclas Padrão e Comportamentos Esperados

A tabela abaixo resume as teclas padrão utilizadas para navegação e suas funções esperadas:

| Tecla | Função | Contexto de Uso |
|-------|--------|-----------------|
| **Tab** | Mover foco para o próximo elemento interativo | Navegação sequencial forward através de links, botões, campos de formulário |
| **Shift + Tab** | Mover foco para o elemento interativo anterior | Navegação sequencial backward |
| **Enter** | Ativar elemento focado | Clicar em botões, seguir links, submeter formulários, expandir/colapsar accordions |
| **Espaço** | Ativar elemento focado (alternativa) | Clicar em botões, marcar checkboxes, ativar toggles |
| **Escape** | Fechar overlay ou cancelar ação | Fechar modais, menus dropdown, tooltips; cancelar edição |
| **Seta ↑** | Navegar para item anterior em lista vertical | Menus, listas de opções, tabs verticais |
| **Seta ↓** | Navegar para próximo item em lista vertical | Menus, listas de opções, tabs verticais |
| **Seta ←** | Navegar para item anterior em lista horizontal | Tabs horizontais, carrosséis, sliders |
| **Seta →** | Navegar para próximo item em lista horizontal | Tabs horizontais, carrosséis, sliders |
| **Home** | Ir para primeiro item da lista | Menus, listas, campos de texto (início da linha) |
| **End** | Ir para último item da lista | Menus, listas, campos de texto (fim da linha) |
| **Page Up** | Rolar página para cima | Conteúdo longo, listas extensas |
| **Page Down** | Rolar página para baixo | Conteúdo longo, listas extensas |

### 3.2 Ordem de Foco (Focus Order)

A ordem de foco deve seguir a ordem visual de leitura (topo → baixo, esquerda → direita para idiomas LTR). A estrutura DOM deve refletir essa ordem lógica para garantir navegação intuitiva.

**Ordem de Foco Esperada na Página Principal (Dashboard):**

1. Link "Pular para conteúdo principal" (visível apenas ao receber foco)
2. Logo "Arquimedes" (link para home)
3. Botão de menu hambúrguer (mobile) ou itens do menu lateral (desktop)
4. Itens da Sidebar: Dashboard → Perfil → Desafio do Dia → Sala de Exercícios → Sala de Vídeos → Minhas Disciplinas
5. Botão "Sair" (rodapé da Sidebar)
6. Conteúdo principal: Cards de estatísticas (XP, Logins, Sequência, Aulas)
7. Card "Pontos Acumulados"
8. Seção "Continuar Aprendendo" → Link para próxima aula
9. Grid de disciplinas → Botões "Explorar Disciplina"
10. Botão de toggle de som (canto inferior direito)

**Regras de Implementação:**

- Nunca usar `tabindex` com valores positivos (1, 2, 3...), pois isso quebra a ordem natural e dificulta manutenção.
- Usar `tabindex="0"` para tornar elementos não-interativos focáveis (ex: divs customizadas com role="button").
- Usar `tabindex="-1"` para remover elementos da ordem de foco, mas permitir foco programático (útil para gerenciar foco em modais).
- Elementos nativamente focáveis (`<a>`, `<button>`, `<input>`, `<select>`, `<textarea>`) não precisam de `tabindex`.

### 3.3 Indicadores de Foco (Focus Indicators)

Todos os elementos interativos devem ter um indicador visual claro quando recebem foco do teclado. O indicador padrão do navegador (outline azul) é aceitável, mas pode ser customizado para melhor integração visual.

**Requisitos Mínimos:**

- Contraste de pelo menos 3:1 entre o indicador de foco e o fundo adjacente.
- Espessura mínima de 2px para o outline.
- Indicador deve envolver completamente o elemento ou ser claramente visível em pelo menos dois lados.

**Implementação Recomendada (CSS):**

```css
/* Estilo global de foco */
*:focus-visible {
  outline: 2px solid #2563eb; /* Azul primário do Arquimedes */
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remover outline padrão apenas quando usar :focus-visible */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Foco em botões primários */
button.primary:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.5);
}
```

**Importante:** Nunca usar `outline: none` ou `outline: 0` sem fornecer um indicador de foco alternativo igualmente visível.

### 3.4 Componentes Específicos e Padrões de Navegação

#### 3.4.1 Sidebar (Menu Lateral)

**Comportamento Esperado:**

- **Tab:** Navega sequencialmente pelos itens do menu (Dashboard → Perfil → Desafio do Dia → etc.).
- **Enter ou Espaço:** Ativa o item focado, navegando para a página correspondente.
- **Seta ↑/↓:** (Opcional) Navega entre itens do menu como alternativa ao Tab.

**Implementação ARIA:**

```html
<nav aria-label="Menu principal">
  <ul role="list">
    <li>
      <a href="/dashboard" aria-current="page">
        <HomeIcon aria-hidden="true" />
        Dashboard
      </a>
    </li>
    <li>
      <a href="/perfil">
        <UserIcon aria-hidden="true" />
        Perfil
      </a>
    </li>
    <!-- Mais itens -->
  </ul>
</nav>
```

**Notas:**
- Usar `aria-current="page"` no item ativo para indicar a página atual.
- Ícones devem ter `aria-hidden="true"` pois são decorativos (texto já descreve a função).

#### 3.4.2 Tabs (Módulos na Sala de Exercícios/Vídeos)

**Comportamento Esperado:**

- **Tab:** Move foco para o grupo de tabs (primeira tab) ou para fora do grupo (próximo elemento focável).
- **Seta ←/→:** Navega entre as tabs horizontalmente.
- **Home:** Foca na primeira tab.
- **End:** Foca na última tab.
- **Enter ou Espaço:** Ativa a tab focada, exibindo o painel correspondente.

**Implementação ARIA (padrão WAI-ARIA):**

```html
<div role="tablist" aria-label="Módulos de Aritmética">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1" tabindex="0">
    Adição e Subtração (64)
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">
    Multiplicação (27)
  </button>
  <!-- Mais tabs -->
</div>

<div role="tabpanel" aria-labelledby="tab-1" id="panel-1" tabindex="0">
  <!-- Conteúdo do painel -->
</div>
```

**Notas:**
- Apenas a tab ativa deve ter `tabindex="0"`, as demais devem ter `tabindex="-1"`.
- Navegação entre tabs deve ser gerenciada via JavaScript (setas ←/→).
- O painel ativo deve ter `tabindex="0"` para permitir que leitores de tela o alcancem.

#### 3.4.3 Modais (OnboardingModal, Confirmações)

**Comportamento Esperado:**

- **Ao abrir:** Foco deve mover automaticamente para o primeiro elemento focável dentro do modal (geralmente o título ou primeiro botão).
- **Tab:** Navega apenas entre elementos dentro do modal (foco não deve escapar).
- **Shift + Tab:** Navega para trás dentro do modal, retornando ao último elemento ao chegar no primeiro (loop).
- **Escape:** Fecha o modal e retorna foco ao elemento que o abriu.

**Implementação ARIA:**

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Bem-vindo ao Arquimedes!</h2>
  <p>Escolha seu nome para começar...</p>
  <input type="text" aria-label="Seu nome" />
  <button>Próximo</button>
  <button aria-label="Fechar modal">×</button>
</div>
```

**Notas:**
- `aria-modal="true"` indica que o conteúdo fora do modal está inerte.
- Implementar "focus trap" para manter foco dentro do modal.
- Ao fechar, retornar foco ao elemento que abriu o modal (geralmente um botão).

#### 3.4.4 Formulários (Exercícios, Perfil)

**Comportamento Esperado:**

- **Tab:** Navega entre campos de formulário na ordem lógica.
- **Enter:** Submete o formulário (se focado em botão submit) ou move para próximo campo (se campo de texto de linha única).
- **Espaço:** Marca/desmarca checkboxes e radio buttons.

**Implementação ARIA:**

```html
<form>
  <label for="answer">Digite sua resposta:</label>
  <input type="number" id="answer" aria-required="true" aria-describedby="hint" />
  <p id="hint" role="status">Dica: Some os dois números</p>
  
  <button type="submit">Enviar Resposta</button>
</form>
```

**Notas:**
- Sempre usar `<label>` associado ao campo via atributo `for`.
- Usar `aria-required="true"` para campos obrigatórios.
- Usar `aria-describedby` para associar hints ou mensagens de erro ao campo.
- Mensagens de erro devem ter `role="alert"` para serem anunciadas imediatamente.

#### 3.4.5 Botões e Links

**Comportamento Esperado:**

- **Enter:** Ativa botões e links.
- **Espaço:** Ativa apenas botões (não links, por padrão do navegador).

**Implementação:**

```html
<!-- Botão semântico -->
<button type="button" aria-label="Explorar módulo de Adição e Subtração">
  Explorar Disciplina
</button>

<!-- Link semântico -->
<a href="/aritmetica/adicao-subtracao">
  Adição e Subtração
</a>

<!-- Evitar: div com onclick -->
<div onclick="navigate()">Clique aqui</div> <!-- ❌ Não acessível -->
```

**Notas:**
- Sempre usar elementos semânticos (`<button>`, `<a>`) em vez de `<div>` ou `<span>` com event handlers.
- Se absolutamente necessário usar elemento não-semântico, adicionar `role="button"` e `tabindex="0"`, e implementar handlers para Enter e Espaço.

---

## 4. ARIA Labels e Atributos: Guia de Implementação

ARIA (Accessible Rich Internet Applications) é um conjunto de atributos que podem ser adicionados ao HTML para melhorar a acessibilidade de componentes dinâmicos e interativos. ARIA não altera o comportamento ou aparência visual dos elementos, mas fornece informações semânticas adicionais para tecnologias assistivas.

### 4.1 Princípios Fundamentais de ARIA

**Primeira Regra de ARIA:** Não use ARIA se um elemento HTML semântico nativo já fornece a funcionalidade necessária. Por exemplo, use `<button>` em vez de `<div role="button">`.

**Segunda Regra de ARIA:** Não mude a semântica nativa de elementos HTML a menos que seja absolutamente necessário. Por exemplo, não use `<h1 role="button">` - isso confunde tecnologias assistivas.

**Terceira Regra de ARIA:** Todos os controles interativos ARIA devem ser operáveis por teclado. Adicionar `role="button"` a um `<div>` não o torna automaticamente acessível - você deve implementar handlers de teclado.

**Quarta Regra de ARIA:** Não use `role="presentation"` ou `aria-hidden="true"` em elementos focáveis. Isso cria inconsistências onde o elemento pode receber foco mas é invisível para leitores de tela.

**Quinta Regra de ARIA:** Todos os elementos interativos devem ter um nome acessível. Use `aria-label`, `aria-labelledby` ou elementos `<label>` associados.

### 4.2 Categorias de Atributos ARIA

ARIA divide-se em três categorias principais:

**Roles (Funções):** Definem o tipo de elemento ou widget (ex: `role="button"`, `role="navigation"`, `role="dialog"`).

**Properties (Propriedades):** Definem características do elemento que raramente mudam (ex: `aria-label`, `aria-required`, `aria-labelledby`).

**States (Estados):** Definem características que mudam frequentemente via JavaScript (ex: `aria-expanded`, `aria-selected`, `aria-checked`).

### 4.3 Auditoria de Componentes Arquimedes

A tabela abaixo mapeia os principais componentes da plataforma Arquimedes e os atributos ARIA recomendados para cada um:

| Componente | Localização | ARIA Recomendados | Justificativa |
|------------|-------------|-------------------|---------------|
| **Logo Arquimedes** | Sidebar, Header | `<a href="/dashboard" aria-label="Arquimedes - Ir para página inicial">` | Link contém apenas imagem/ícone, precisa de label descritivo |
| **Botão Menu Hambúrguer** | MobileNav | `<button aria-label="Abrir menu de navegação" aria-expanded="false">` | Botão sem texto visível, estado de expansão deve ser anunciado |
| **Sidebar Navigation** | Sidebar | `<nav aria-label="Menu principal">` | Distingue de outras navegações (breadcrumb, footer) |
| **Item de Menu Ativo** | Sidebar | `<a href="/dashboard" aria-current="page">Dashboard</a>` | Indica página atual para leitores de tela |
| **Tabs de Módulos** | ExerciseRoomPage, VideoRoomPage | `<div role="tablist" aria-label="Módulos de Aritmética">` + `<button role="tab" aria-selected="true">` | Padrão WAI-ARIA para tabs |
| **Painel de Tab** | ExerciseRoomPage, VideoRoomPage | `<div role="tabpanel" aria-labelledby="tab-1" id="panel-1">` | Associa painel à tab correspondente |
| **Cards de Estatísticas** | Dashboard | `<div role="region" aria-labelledby="xp-title"><h3 id="xp-title">XP & Nível</h3>` | Agrupa informações relacionadas como região |
| **Barra de Progresso XP** | XPDisplay | `<div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso de XP: 0 de 100">` | Anuncia progresso para leitores de tela |
| **Ícone de Fogo (Streak)** | StreakDisplay | `<span aria-label="Sequência de 0 dias consecutivos">🔥 0</span>` | Emoji precisa de descrição textual |
| **Campo de Resposta** | ExerciseCard | `<label for="answer-1">Digite sua resposta:</label><input id="answer-1" type="number" aria-required="true" aria-describedby="hint-1">` | Associa label, marca obrigatório, conecta hint |
| **Mensagem de Hint** | ExerciseCard | `<p id="hint-1" role="status">Dica: Some os dois números</p>` | Anuncia hint quando aparece dinamicamente |
| **Toast de Sucesso** | Sistema global | `<div role="status" aria-live="polite">Resposta correta! +10 pontos</div>` | Anuncia mensagem sem interromper leitor de tela |
| **Toast de Erro** | Sistema global | `<div role="alert" aria-live="assertive">Erro ao salvar. Tente novamente.</div>` | Anuncia erro imediatamente, interrompendo leitor de tela |
| **Modal de Onboarding** | OnboardingModal | `<div role="dialog" aria-modal="true" aria-labelledby="modal-title">` | Identifica modal e seu título |
| **Botão Fechar Modal** | OnboardingModal | `<button aria-label="Fechar modal">×</button>` | Botão com apenas símbolo precisa de label |
| **Botão de Toggle Som** | SoundToggle | `<button aria-label="Desativar som" aria-pressed="false">` | Indica estado do toggle (ligado/desligado) |
| **Player YouTube** | YouTubeEmbed | `<iframe title="Vídeo: Adição e Subtração - Conceitos Básicos">` | Iframe precisa de título descritivo |
| **Ícones Decorativos** | Diversos | `<svg aria-hidden="true" focusable="false">` | Oculta ícones puramente decorativos |
| **Ícones Informativos** | Badges, Indicadores | `<svg role="img" aria-label="Dificuldade fácil">` | Ícones com significado precisam de label |
| **Link "Pular para Conteúdo"** | Layout principal | `<a href="#main-content" class="sr-only sr-only-focusable">Pular para conteúdo principal</a>` | Permite pular navegação repetitiva |
| **Breadcrumb** | LessonPage | `<nav aria-label="Breadcrumb"><ol>...</ol></nav>` | Identifica navegação de localização |
| **Botão "Anterior/Próximo"** | LessonPage | `<button aria-label="Ir para aula anterior: O que é Adicionar">Anterior</button>` | Descreve destino específico, não apenas "Anterior" |
| **Lista de Exercícios** | ExerciseRoomPage | `<ul role="list" aria-label="Exercícios de Adição e Subtração">` | Identifica lista e seu contexto |
| **Badge de Dificuldade** | ExerciseCard | `<span class="badge" aria-label="Dificuldade: Fácil, 5 pontos">Fácil</span>` | Descreve dificuldade e pontuação |

### 4.4 Estados Dinâmicos e Live Regions

Componentes que mudam dinamicamente devem comunicar essas mudanças para tecnologias assistivas usando ARIA live regions.

**Atributos de Live Region:**

- `aria-live="polite"`: Anuncia mudanças quando o leitor de tela estiver ocioso (não interrompe).
- `aria-live="assertive"`: Anuncia mudanças imediatamente, interrompendo o leitor de tela (usar apenas para erros críticos).
- `aria-live="off"`: Não anuncia mudanças (padrão).

**Roles Especiais:**

- `role="status"`: Equivalente a `aria-live="polite"`. Usado para mensagens de status não urgentes.
- `role="alert"`: Equivalente a `aria-live="assertive"`. Usado para erros e avisos urgentes.

**Exemplos de Implementação:**

```html
<!-- Contador de pontos que atualiza dinamicamente -->
<div role="status" aria-live="polite" aria-atomic="true">
  Pontos hoje: <span id="points-today">10</span>
</div>

<!-- Mensagem de erro em formulário -->
<div role="alert" aria-live="assertive">
  Campo obrigatório: Por favor, digite sua resposta.
</div>

<!-- Progresso de carregamento -->
<div role="status" aria-live="polite">
  Carregando exercícios... <span id="progress">50%</span>
</div>
```

**Nota:** `aria-atomic="true"` indica que toda a região deve ser anunciada, não apenas o texto que mudou.

### 4.5 Nomes Acessíveis: Hierarquia de Cálculo

Tecnologias assistivas calculam o "nome acessível" de um elemento seguindo esta hierarquia (do mais prioritário ao menos):

1. **`aria-labelledby`**: Referencia ID(s) de outros elementos cujo texto será usado como label.
2. **`aria-label`**: Fornece label textual diretamente no atributo.
3. **Elemento `<label>` associado**: Via atributo `for` (apenas para campos de formulário).
4. **Conteúdo textual do elemento**: Texto visível dentro do elemento.
5. **Atributo `title`**: Último recurso, geralmente exibido como tooltip.
6. **Placeholder**: Não deve ser usado como label principal (não é acessível).

**Exemplo de Hierarquia:**

```html
<!-- aria-labelledby tem prioridade -->
<button aria-labelledby="btn-text" aria-label="Ignorado">
  <span id="btn-text">Enviar</span>
</button>
<!-- Nome acessível: "Enviar" (do aria-labelledby) -->

<!-- aria-label tem prioridade sobre conteúdo textual -->
<button aria-label="Fechar janela">×</button>
<!-- Nome acessível: "Fechar janela" (do aria-label) -->

<!-- Conteúdo textual é usado se não houver ARIA -->
<button>Salvar</button>
<!-- Nome acessível: "Salvar" (do conteúdo textual) -->
```

---

## 5. Checklist de Auditoria de Acessibilidade

Este checklist fornece uma lista verificável de todos os pontos de acessibilidade que devem ser testados na plataforma Arquimedes. Cada item deve ser marcado como **Conforme**, **Não Conforme** ou **Não Aplicável**.

### 5.1 Estrutura e Semântica HTML

- [ ] **HTML5 Semântico**: Página usa tags semânticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) em vez de `<div>` genéricos.
- [ ] **Hierarquia de Títulos**: Títulos seguem ordem lógica (h1 → h2 → h3) sem pular níveis. Apenas um `<h1>` por página.
- [ ] **Idioma Declarado**: Tag `<html lang="pt-BR">` está presente.
- [ ] **Título da Página**: Cada página tem `<title>` único e descritivo.
- [ ] **Landmarks ARIA**: Regiões principais têm roles apropriados (`role="navigation"`, `role="main"`, `role="complementary"`).
- [ ] **Listas Semânticas**: Listas de itens usam `<ul>`/`<ol>` + `<li>`, não `<div>` estilizados.
- [ ] **Tabelas Acessíveis**: Tabelas de dados usam `<table>`, `<th>`, `<caption>` e `scope` apropriados.
- [ ] **Validação HTML**: Código passa no W3C Markup Validator sem erros críticos.

### 5.2 Navegação por Teclado

- [ ] **Todos os Elementos Interativos Focáveis**: Links, botões, campos de formulário, tabs, menus podem receber foco via Tab.
- [ ] **Ordem de Foco Lógica**: Ordem de navegação por Tab segue ordem visual (topo → baixo, esquerda → direita).
- [ ] **Sem Armadilha de Foco**: Foco não fica preso em nenhum componente. Modais podem ser fechados com Escape.
- [ ] **Indicador de Foco Visível**: Todos os elementos focáveis têm outline ou indicador visual claro (contraste 3:1).
- [ ] **Link "Pular para Conteúdo"**: Presente no topo da página, visível ao receber foco.
- [ ] **Tabs Navegáveis por Setas**: Tabs horizontais podem ser navegadas com setas ←/→.
- [ ] **Modais Gerenciam Foco**: Ao abrir modal, foco move para dentro. Ao fechar, foco retorna ao elemento que abriu.
- [ ] **Menus Dropdown Operáveis**: Menus podem ser abertos e navegados apenas com teclado.
- [ ] **Botões Ativados com Enter/Espaço**: Botões respondem a ambas as teclas.
- [ ] **Links Ativados com Enter**: Links respondem a Enter (Espaço não deve ativar links).

### 5.3 ARIA e Nomes Acessíveis

- [ ] **Botões Sem Texto Têm aria-label**: Botões com apenas ícones têm `aria-label` descritivo.
- [ ] **Ícones Decorativos Ocultos**: Ícones puramente decorativos têm `aria-hidden="true"`.
- [ ] **Ícones Informativos Têm role="img"**: Ícones com significado têm `role="img"` e `aria-label`.
- [ ] **Campos de Formulário Têm Labels**: Todos os `<input>`, `<select>`, `<textarea>` têm `<label>` associado.
- [ ] **Campos Obrigatórios Marcados**: Campos obrigatórios têm `aria-required="true"` ou `required`.
- [ ] **Mensagens de Erro Associadas**: Erros de validação usam `aria-describedby` para associar ao campo.
- [ ] **Live Regions para Conteúdo Dinâmico**: Toasts, alertas, contadores usam `role="status"` ou `role="alert"`.
- [ ] **Modais Têm role="dialog"**: Modais usam `role="dialog"` e `aria-modal="true"`.
- [ ] **Tabs Seguem Padrão WAI-ARIA**: Tabs usam `role="tablist"`, `role="tab"`, `role="tabpanel"` com `aria-selected`.
- [ ] **Botões de Toggle Têm aria-pressed**: Botões de toggle (ex: som) usam `aria-pressed="true/false"`.
- [ ] **Accordions Têm aria-expanded**: Accordions usam `aria-expanded="true/false"` para indicar estado.
- [ ] **Iframes Têm Título**: Todos os `<iframe>` (YouTube) têm atributo `title` descritivo.
- [ ] **Imagens Têm Texto Alternativo**: Todas as `<img>` têm atributo `alt` (vazio se decorativa).
- [ ] **Links Descritivos**: Links descrevem seu destino ("Ver módulo de Adição"), não "Clique aqui".

### 5.4 Contraste e Visibilidade

- [ ] **Contraste de Texto Normal**: Texto normal (< 18pt) tem contraste mínimo de 4.5:1 com o fundo.
- [ ] **Contraste de Texto Grande**: Texto grande (≥ 18pt ou ≥ 14pt bold) tem contraste mínimo de 3:1.
- [ ] **Contraste de Componentes UI**: Bordas de campos, ícones, indicadores de foco têm contraste mínimo de 3:1.
- [ ] **Contraste de Estados Hover/Focus**: Estados interativos mantêm contraste adequado.
- [ ] **Texto Não Depende Apenas de Cor**: Informações não são transmitidas apenas por cor (ex: erro vermelho também tem ícone X).
- [ ] **Zoom até 200% Funciona**: Conteúdo permanece legível e funcional em zoom de 200% sem scroll horizontal.
- [ ] **Reflow em 320px**: Layout se adapta a largura de 320px sem scroll horizontal (mobile).
- [ ] **Texto Não em Imagens**: Texto é HTML/CSS, não imagem (exceto logos).

### 5.5 Conteúdo Multimídia

- [ ] **Vídeos Têm Legendas**: Todos os vídeos do YouTube têm legendas em português disponíveis.
- [ ] **Vídeos Têm Controles**: Player de vídeo tem controles acessíveis por teclado (play, pause, volume).
- [ ] **Áudio Não Reproduz Automaticamente**: Áudio/vídeo não inicia automaticamente ao carregar página.
- [ ] **Alternativas para Áudio/Vídeo**: Considerar transcrições textuais para vídeos educacionais (futuro).

### 5.6 Formulários e Interações

- [ ] **Labels Visíveis**: Campos de formulário têm labels visíveis (placeholders não substituem labels).
- [ ] **Instruções Claras**: Campos complexos têm instruções ou exemplos de formato esperado.
- [ ] **Validação Acessível**: Erros de validação são anunciados para leitores de tela (`role="alert"`).
- [ ] **Sugestões de Correção**: Quando possível, sugestões são fornecidas (ex: hints em exercícios).
- [ ] **Confirmação de Ações Importantes**: Logout, exclusão de dados pedem confirmação.
- [ ] **Tempo Suficiente**: Não há limites de tempo para completar tarefas (ou podem ser estendidos).
- [ ] **Prevenção de Erros**: Usuário pode revisar e corrigir antes de submeter (ex: exercícios).

### 5.7 Navegação e Orientação

- [ ] **Múltiplas Formas de Navegação**: Usuário pode navegar por menu, breadcrumb, busca (futuro).
- [ ] **Breadcrumb Presente**: Páginas internas têm breadcrumb mostrando localização na hierarquia.
- [ ] **Página Atual Indicada**: Menu lateral indica página atual com `aria-current="page"`.
- [ ] **Navegação Consistente**: Menu mantém mesma ordem e estrutura em todas as páginas.
- [ ] **Identificação Consistente**: Componentes com mesma função têm mesmo label/ícone em toda aplicação.

### 5.8 Compatibilidade com Tecnologias Assistivas

- [ ] **Testado com NVDA (Windows)**: Navegação completa funciona com leitor de tela NVDA.
- [ ] **Testado com JAWS (Windows)**: Navegação completa funciona com leitor de tela JAWS (se disponível).
- [ ] **Testado com VoiceOver (macOS/iOS)**: Navegação completa funciona com VoiceOver.
- [ ] **Testado com Navegador em Modo Alto Contraste**: Interface permanece usável em modo alto contraste do Windows.
- [ ] **Testado com Extensões de Acessibilidade**: Funciona com extensões como Dark Reader, zoom, etc.

---

## 6. Ferramentas e Metodologia de Teste

Este capítulo descreve as ferramentas recomendadas e a metodologia passo a passo para conduzir testes de acessibilidade na plataforma Arquimedes.

### 6.1 Ferramentas Automatizadas

Ferramentas automatizadas podem detectar aproximadamente 30-40% dos problemas de acessibilidade. Elas são excelentes para identificar problemas técnicos como falta de `alt` text, contraste insuficiente e erros de HTML, mas não substituem testes manuais.

#### 6.1.1 axe DevTools (Extensão de Navegador)

**Descrição:** Extensão gratuita para Chrome, Firefox e Edge que analisa páginas web e identifica problemas de acessibilidade baseados em WCAG 2.1.

**Como Usar:**
1. Instalar extensão axe DevTools do Chrome Web Store ou Firefox Add-ons.
2. Abrir DevTools do navegador (F12).
3. Navegar até a aba "axe DevTools".
4. Clicar em "Scan ALL of my page".
5. Revisar lista de problemas encontrados, organizados por severidade (Critical, Serious, Moderate, Minor).
6. Clicar em cada problema para ver descrição, impacto, elementos afetados e sugestões de correção.

**Páginas a Testar:**
- Login Page (`/`)
- Dashboard (`/dashboard`)
- Página de Disciplina (`/disciplinas`)
- Página de Módulo (`/disciplina/aritmetica/modulo/adicao-subtracao`)
- Página de Aula (`/disciplina/aritmetica/modulo/adicao-subtracao/aula/o-que-e-adicionar`)
- Sala de Exercícios (`/exercicios`)
- Sala de Vídeos (`/videos`)
- Desafio do Dia (`/desafio-do-dia`)
- Perfil (`/perfil`)

#### 6.1.2 WAVE (Web Accessibility Evaluation Tool)

**Descrição:** Ferramenta online e extensão de navegador que fornece feedback visual sobre acessibilidade diretamente na página.

**Como Usar:**
1. Acessar https://wave.webaim.org/ ou instalar extensão WAVE.
2. Inserir URL da página a testar ou clicar no ícone da extensão.
3. Revisar ícones sobrepostos na página indicando erros (vermelho), alertas (amarelo) e features (verde).
4. Clicar em cada ícone para ver detalhes do problema.
5. Usar aba "Structure" para visualizar hierarquia de títulos e landmarks.
6. Usar aba "Contrast" para verificar contraste de todos os textos.

#### 6.1.3 Lighthouse (Integrado ao Chrome DevTools)

**Descrição:** Ferramenta de auditoria automatizada do Google que avalia performance, SEO, PWA e acessibilidade.

**Como Usar:**
1. Abrir DevTools do Chrome (F12).
2. Navegar até aba "Lighthouse".
3. Selecionar categoria "Accessibility".
4. Escolher dispositivo (Mobile ou Desktop).
5. Clicar em "Analyze page load".
6. Revisar pontuação de acessibilidade (0-100) e lista de problemas encontrados.
7. Cada problema inclui descrição, elementos afetados e links para documentação.

**Nota:** Lighthouse fornece pontuação geral, mas não substitui auditoria detalhada com axe ou WAVE.

#### 6.1.4 Color Contrast Analyzer (CCA)

**Descrição:** Aplicativo desktop gratuito (Windows/macOS) para verificar contraste de cores conforme WCAG.

**Como Usar:**
1. Baixar e instalar CCA de https://www.tpgi.com/color-contrast-checker/.
2. Usar ferramenta eyedropper para selecionar cor de texto e cor de fundo.
3. Verificar se passa nos critérios WCAG AA (4.5:1 para texto normal, 3:1 para texto grande).
4. Se não passar, ajustar cores até atingir contraste adequado.

**Alternativa Online:** WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)

### 6.2 Testes Manuais com Teclado

Testes manuais de navegação por teclado são essenciais e devem ser realizados em todas as páginas principais.

#### 6.2.1 Procedimento de Teste de Teclado

**Passo 1: Preparação**
- Fechar ou desconectar mouse para forçar uso exclusivo do teclado.
- Abrir página a ser testada.
- Posicionar foco no topo da página (recarregar página ou pressionar Ctrl+Home).

**Passo 2: Navegação Sequencial**
- Pressionar **Tab** repetidamente para navegar por todos os elementos interativos.
- Verificar que:
  - Todos os links, botões, campos de formulário são alcançáveis.
  - Ordem de foco é lógica e segue ordem visual.
  - Indicador de foco é claramente visível em cada elemento.
  - Nenhum elemento invisível recebe foco.
  - Foco não pula elementos importantes.

**Passo 3: Navegação Reversa**
- Pressionar **Shift + Tab** para navegar para trás.
- Verificar que ordem reversa funciona corretamente.

**Passo 4: Ativação de Elementos**
- Focar em cada botão e pressionar **Enter** e **Espaço**.
- Verificar que ambas as teclas ativam o botão.
- Focar em cada link e pressionar **Enter**.
- Verificar que link é ativado (Espaço não deve ativar links).

**Passo 5: Componentes Especiais**
- **Tabs:** Verificar que setas ←/→ navegam entre tabs.
- **Modais:** Verificar que Escape fecha modal e foco retorna ao elemento que abriu.
- **Menus Dropdown:** Verificar que podem ser abertos e navegados com teclado.
- **Accordions:** Verificar que Enter/Espaço expande/colapsa.

**Passo 6: Armadilhas de Foco**
- Verificar que foco nunca fica preso em um componente.
- Verificar que sempre é possível navegar para fora de qualquer área.

**Passo 7: Documentação**
- Documentar qualquer problema encontrado com screenshot e descrição.
- Classificar severidade: Crítico (bloqueia uso), Alto (dificulta muito), Médio (inconveniente), Baixo (melhoria).

#### 6.2.2 Checklist Rápido de Teclado

- [ ] Posso alcançar todos os links com Tab?
- [ ] Posso alcançar todos os botões com Tab?
- [ ] Posso alcançar todos os campos de formulário com Tab?
- [ ] Ordem de Tab é lógica?
- [ ] Indicador de foco é visível em todos os elementos?
- [ ] Enter ativa botões e links?
- [ ] Espaço ativa botões (mas não links)?
- [ ] Escape fecha modais?
- [ ] Setas navegam em tabs/menus?
- [ ] Foco nunca fica preso?

### 6.3 Testes com Leitores de Tela

Leitores de tela são a principal tecnologia assistiva para usuários cegos ou com baixa visão. Testar com leitores de tela é essencial para garantir acessibilidade completa.

#### 6.3.1 NVDA (Windows) - Gratuito

**Instalação:**
1. Baixar NVDA de https://www.nvaccess.org/download/.
2. Instalar e reiniciar computador.
3. NVDA iniciará automaticamente ao fazer login.

**Comandos Básicos:**
- **Ctrl:** Parar fala temporariamente.
- **NVDA + Q:** Sair do NVDA.
- **NVDA + N:** Abrir menu do NVDA.
- **Insert:** Tecla modificadora NVDA (pode ser Insert ou Caps Lock).
- **NVDA + Seta ↓:** Modo de navegação (ler página como documento).
- **NVDA + Espaço:** Alternar entre modo de navegação e modo de foco.

**Navegação em Páginas Web:**
- **Seta ↓:** Ler próxima linha.
- **Seta ↑:** Ler linha anterior.
- **Tab:** Pular para próximo elemento interativo.
- **H:** Pular para próximo título (Shift+H para anterior).
- **K:** Pular para próximo link (Shift+K para anterior).
- **B:** Pular para próximo botão (Shift+B para anterior).
- **F:** Pular para próximo campo de formulário (Shift+F para anterior).
- **D:** Pular para próximo landmark (Shift+D para anterior).

**Procedimento de Teste:**
1. Abrir página no navegador (Chrome ou Firefox).
2. Iniciar NVDA (Ctrl+Alt+N se não estiver rodando).
3. Pressionar NVDA + Espaço para entrar em modo de navegação.
4. Pressionar Seta ↓ para ouvir página linha por linha.
5. Verificar que:
   - Estrutura da página é anunciada (landmarks, regiões).
   - Títulos são anunciados com nível correto (Título nível 1, Título nível 2).
   - Links são anunciados com texto descritivo.
   - Botões são anunciados como "botão".
   - Campos de formulário são anunciados com labels corretos.
   - Imagens decorativas são ignoradas.
   - Imagens informativas são anunciadas com alt text.
   - Estados de componentes são anunciados (expandido, colapsado, selecionado).
6. Navegar usando teclas de atalho (H, K, B, F, D) para verificar que elementos são alcançáveis.
7. Preencher formulários e verificar que validação é anunciada.
8. Documentar qualquer informação faltante ou confusa.

#### 6.3.2 JAWS (Windows) - Pago

**Descrição:** JAWS (Job Access With Speech) é o leitor de tela mais popular entre usuários profissionais, mas é pago (aproximadamente $1000 USD). Versão de teste de 40 minutos disponível.

**Comandos Básicos (similares ao NVDA):**
- **Ctrl:** Parar fala.
- **Insert + F4:** Sair do JAWS.
- **Insert:** Tecla modificadora JAWS.
- **Seta ↓:** Ler próxima linha.
- **H:** Pular para próximo título.
- **Tab:** Pular para próximo elemento interativo.

**Nota:** Se JAWS não estiver disponível, testes com NVDA são suficientes para maioria dos casos, pois ambos seguem padrões similares.

#### 6.3.3 VoiceOver (macOS/iOS) - Integrado

**Ativação:**
- **macOS:** Cmd + F5 ou Cmd + Fn + F5 (em teclados sem teclas de função dedicadas).
- **iOS:** Configurações → Acessibilidade → VoiceOver → Ativar.

**Comandos Básicos (macOS):**
- **VO:** Teclas modificadoras VoiceOver (Control + Option).
- **VO + A:** Iniciar leitura.
- **VO + Seta →:** Próximo item.
- **VO + Seta ←:** Item anterior.
- **VO + Espaço:** Ativar item.
- **VO + H:** Próximo título.
- **VO + Cmd + H:** Menu de títulos.

**Comandos Básicos (iOS):**
- **Deslizar para direita:** Próximo item.
- **Deslizar para esquerda:** Item anterior.
- **Toque duplo:** Ativar item.
- **Rotor (girar dois dedos):** Mudar modo de navegação (títulos, links, formulários).

**Procedimento de Teste (macOS):**
1. Abrir Safari (VoiceOver funciona melhor com Safari no macOS).
2. Ativar VoiceOver (Cmd + F5).
3. Pressionar VO + A para iniciar leitura automática.
4. Usar VO + Seta → para navegar item por item.
5. Verificar anúncios de estrutura, labels e estados.
6. Usar VO + H para navegar por títulos.
7. Usar VO + Cmd + H para ver lista de todos os títulos.
8. Documentar problemas encontrados.

### 6.4 Testes de Contraste de Cores

Contraste adequado é essencial para usuários com baixa visão ou daltonismo.

**Procedimento:**
1. Identificar todas as combinações de texto/fundo na interface:
   - Texto de corpo sobre fundo branco/cinza.
   - Texto em botões primários (branco sobre azul).
   - Texto em botões secundários (azul sobre branco).
   - Texto em badges (verde, amarelo, vermelho).
   - Texto em cards de estatísticas.
   - Links (azul sobre branco).
   - Texto de placeholder em campos de formulário.
2. Para cada combinação, usar WebAIM Contrast Checker:
   - Acessar https://webaim.org/resources/contrastchecker/.
   - Inserir cor de texto (hex) e cor de fundo (hex).
   - Verificar se passa em WCAG AA:
     - Texto normal: 4.5:1 mínimo.
     - Texto grande (≥18pt ou ≥14pt bold): 3:1 mínimo.
3. Documentar combinações que não passam.
4. Ajustar cores até atingir contraste adequado.

**Ferramenta Alternativa:** Usar extensão axe DevTools e clicar em "Contrast" para verificar automaticamente todos os textos da página.

### 6.5 Testes de Zoom e Reflow

**Teste de Zoom 200%:**
1. Abrir página no navegador.
2. Pressionar Ctrl + (ou Cmd + no macOS) até atingir 200% de zoom.
3. Verificar que:
   - Todo o conteúdo permanece visível.
   - Não há scroll horizontal.
   - Texto não é cortado ou sobreposto.
   - Botões e links permanecem clicáveis.
   - Imagens não ficam pixeladas (se possível usar SVG).
4. Testar em diferentes resoluções (1920x1080, 1366x768).

**Teste de Reflow 320px:**
1. Abrir DevTools (F12).
2. Ativar modo de dispositivo móvel (Ctrl+Shift+M).
3. Definir largura para 320px (iPhone SE).
4. Verificar que:
   - Layout se adapta sem scroll horizontal.
   - Elementos são empilhados verticalmente.
   - Texto permanece legível.
   - Botões têm tamanho adequado para toque (mínimo 44x44px).
5. Testar navegação e interações em viewport estreito.

### 6.6 Metodologia de Teste Completo

**Fase 1: Auditoria Automatizada (1-2 horas)**
1. Executar axe DevTools em todas as páginas principais.
2. Executar WAVE em todas as páginas principais.
3. Executar Lighthouse em todas as páginas principais.
4. Compilar lista de problemas encontrados.
5. Priorizar problemas por severidade.

**Fase 2: Testes Manuais de Teclado (2-3 horas)**
1. Testar navegação por teclado em todas as páginas.
2. Verificar ordem de foco, indicadores visuais, ativação de elementos.
3. Testar componentes especiais (tabs, modais, menus).
4. Documentar problemas encontrados.

**Fase 3: Testes com Leitores de Tela (3-4 horas)**
1. Testar com NVDA (Windows) em todas as páginas principais.
2. Testar com VoiceOver (macOS/iOS) se disponível.
3. Verificar anúncios de estrutura, labels, estados.
4. Testar preenchimento de formulários e interações.
5. Documentar problemas encontrados.

**Fase 4: Testes de Contraste e Zoom (1 hora)**
1. Verificar contraste de todas as combinações de cores.
2. Testar zoom em 200%.
3. Testar reflow em 320px.
4. Documentar problemas encontrados.

**Fase 5: Correções e Reteste (variável)**
1. Corrigir problemas encontrados por ordem de prioridade.
2. Retestar cada correção.
3. Executar auditoria automatizada novamente para confirmar correções.
4. Documentar correções aplicadas.

**Fase 6: Relatório Final (1-2 horas)**
1. Compilar relatório de acessibilidade com:
   - Resumo executivo.
   - Lista de problemas encontrados e corrigidos.
   - Lista de problemas pendentes (se houver).
   - Pontuação de acessibilidade (baseada em Lighthouse e axe).
   - Recomendações para manutenção contínua.
2. Apresentar relatório para equipe.

---

## 7. Plano de Correções Prioritárias

Com base na auditoria inicial do código-fonte da plataforma Arquimedes, este capítulo identifica correções prioritárias que devem ser implementadas para melhorar significativamente a acessibilidade.

### 7.1 Correções Críticas (Prioridade Alta)

Estas correções bloqueiam ou dificultam severamente o uso da plataforma por usuários com deficiência.

#### 7.1.1 Adicionar Link "Pular para Conteúdo Principal"

**Problema:** Usuários de leitores de tela precisam ouvir toda a navegação repetitiva (sidebar, menu) em cada página antes de chegar ao conteúdo principal.

**Solução:** Adicionar link invisível no topo da página que se torna visível ao receber foco do teclado.

**Implementação:**

```tsx
// client/src/App.tsx (adicionar no topo do componente)
<a href="#main-content" className="sr-only sr-only-focusable">
  Pular para conteúdo principal
</a>
```

```css
/* client/src/index.css */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  background-color: #2563eb;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.25rem;
  z-index: 9999;
}
```

```tsx
// Adicionar id="main-content" ao elemento <main>
<main id="main-content" className="flex-1">
  {children}
</main>
```

#### 7.1.2 Corrigir ARIA Labels em Botões de Ícone

**Problema:** Botões que contêm apenas ícones (ex: botão de menu hambúrguer, botão de fechar modal) não têm labels descritivos, tornando-os incompreensíveis para leitores de tela.

**Solução:** Adicionar `aria-label` descritivo a todos os botões de ícone.

**Exemplos:**

```tsx
// client/src/components/MobileNav.tsx
<button
  onClick={() => setOpen(true)}
  aria-label="Abrir menu de navegação"
  aria-expanded={open}
  className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg"
>
  <Menu className="h-6 w-6" aria-hidden="true" />
</button>
```

```tsx
// client/src/components/SoundToggle.tsx
<button
  onClick={toggleSound}
  aria-label={isMuted ? "Ativar som" : "Desativar som"}
  aria-pressed={!isMuted}
  className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
>
  {isMuted ? <VolumeX size={24} aria-hidden="true" /> : <Volume2 size={24} aria-hidden="true" />}
</button>
```

```tsx
// client/src/components/OnboardingModal.tsx (botão fechar)
<button
  onClick={onClose}
  aria-label="Fechar modal de onboarding"
  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
>
  <X size={24} aria-hidden="true" />
</button>
```

#### 7.1.3 Adicionar role="dialog" e aria-modal em Modais

**Problema:** Modais não estão marcados semanticamente como diálogos, dificultando compreensão para leitores de tela.

**Solução:** Adicionar `role="dialog"`, `aria-modal="true"` e `aria-labelledby` aos componentes de modal.

**Implementação:**

```tsx
// client/src/components/OnboardingModal.tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="onboarding-title"
  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
>
  <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
    <h2 id="onboarding-title" className="text-2xl font-bold mb-4">
      {/* Título da etapa atual */}
    </h2>
    {/* Conteúdo do modal */}
  </div>
</div>
```

**Nota:** Implementar "focus trap" para manter foco dentro do modal enquanto estiver aberto.

#### 7.1.4 Corrigir Ordem de Foco em Tabs

**Problema:** Componente Tabs (usado em ExerciseRoomPage e VideoRoomPage) não segue padrão WAI-ARIA para navegação por teclado.

**Solução:** Implementar navegação por setas (←/→) entre tabs e gerenciar `tabindex` corretamente.

**Implementação (conceitual - requer modificação no componente shadcn/ui):**

```tsx
// Apenas a tab ativa deve ter tabindex="0"
<button
  role="tab"
  aria-selected={isActive}
  aria-controls={`panel-${id}`}
  id={`tab-${id}`}
  tabindex={isActive ? 0 : -1}
  onKeyDown={handleKeyDown}
>
  {title}
</button>

// Handler de teclado
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') {
    focusNextTab();
  } else if (e.key === 'ArrowLeft') {
    focusPreviousTab();
  } else if (e.key === 'Home') {
    focusFirstTab();
  } else if (e.key === 'End') {
    focusLastTab();
  }
};
```

### 7.2 Correções Importantes (Prioridade Média)

Estas correções melhoram significativamente a experiência, mas não bloqueiam uso completo.

#### 7.2.1 Adicionar aria-live para Mensagens Dinâmicas

**Problema:** Mudanças dinâmicas (pontos atualizados, mensagens de sucesso/erro) não são anunciadas para leitores de tela.

**Solução:** Adicionar `role="status"` ou `role="alert"` a componentes de toast e contadores dinâmicos.

**Implementação:**

```tsx
// Toasts de sucesso (não urgente)
<div role="status" aria-live="polite" className="toast toast-success">
  Resposta correta! +10 pontos
</div>

// Toasts de erro (urgente)
<div role="alert" aria-live="assertive" className="toast toast-error">
  Erro ao salvar. Tente novamente.
</div>

// Contador de pontos (atualização não urgente)
<div role="status" aria-live="polite" aria-atomic="true">
  Pontos hoje: <span id="points-today">{points}</span>
</div>
```

#### 7.2.2 Melhorar Descrições de Links

**Problema:** Alguns links têm texto genérico como "Explorar Disciplina" sem contexto de qual disciplina.

**Solução:** Tornar texto de links mais descritivo ou adicionar `aria-label`.

**Implementação:**

```tsx
// Antes (genérico)
<a href={`/disciplina/${slug}`}>Explorar Disciplina</a>

// Depois (descritivo)
<a href={`/disciplina/${slug}`} aria-label={`Explorar disciplina de ${name}`}>
  Explorar Disciplina
</a>

// Ou melhor ainda (texto descritivo visível)
<a href={`/disciplina/${slug}`}>
  Explorar {name}
</a>
```

#### 7.2.3 Adicionar Títulos Únicos por Página

**Problema:** Tag `<title>` pode não estar sendo atualizada dinamicamente ao navegar entre páginas.

**Solução:** Usar React Helmet ou similar para gerenciar `<title>` dinamicamente.

**Implementação:**

```tsx
// Instalar react-helmet-async
// pnpm add react-helmet-async

// client/src/pages/Dashboard.tsx
import { Helmet } from 'react-helmet-async';

export function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard - Arquimedes</title>
      </Helmet>
      {/* Conteúdo da página */}
    </>
  );
}

// client/src/pages/LessonPage.tsx
<Helmet>
  <title>{pageTitle} - {moduleName} - Arquimedes</title>
</Helmet>
```

#### 7.2.4 Adicionar aria-current="page" ao Item Ativo do Menu

**Problema:** Menu lateral não indica claramente qual é a página atual para leitores de tela.

**Solução:** Adicionar `aria-current="page"` ao link da página ativa.

**Implementação:**

```tsx
// client/src/components/Sidebar.tsx
<a
  href="/dashboard"
  aria-current={location.pathname === '/dashboard' ? 'page' : undefined}
  className={cn(
    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
    location.pathname === '/dashboard' ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
  )}
>
  <Home size={20} aria-hidden="true" />
  Dashboard
</a>
```

### 7.3 Correções Recomendadas (Prioridade Baixa)

Estas correções são melhorias incrementais que polirão a experiência de acessibilidade.

#### 7.3.1 Adicionar Landmarks ARIA Explícitos

**Problema:** Embora tags semânticas estejam sendo usadas, adicionar labels explícitos a landmarks melhora navegação.

**Solução:** Adicionar `aria-label` a elementos `<nav>`, `<aside>`, `<main>`.

**Implementação:**

```tsx
<nav aria-label="Menu principal">
  {/* Sidebar */}
</nav>

<nav aria-label="Breadcrumb">
  {/* Breadcrumb */}
</nav>

<main aria-label="Conteúdo principal">
  {/* Conteúdo */}
</main>

<aside aria-label="Informações complementares">
  {/* Sidebar secundária */}
</aside>
```

#### 7.3.2 Adicionar aria-describedby a Campos de Formulário

**Problema:** Hints e mensagens de erro não estão associados programaticamente aos campos.

**Solução:** Usar `aria-describedby` para conectar campos a suas descrições.

**Implementação:**

```tsx
// client/src/components/ExerciseCard.tsx
<label htmlFor={`answer-${exercise.id}`}>Digite sua resposta:</label>
<input
  id={`answer-${exercise.id}`}
  type="number"
  aria-required="true"
  aria-describedby={showHint ? `hint-${exercise.id}` : undefined}
  aria-invalid={isIncorrect}
/>
{showHint && (
  <p id={`hint-${exercise.id}`} role="status" className="text-sm text-gray-600">
    Dica: {exercise.hint}
  </p>
)}
{isIncorrect && (
  <p role="alert" className="text-sm text-red-600">
    Resposta incorreta. Tente novamente.
  </p>
)}
```

#### 7.3.3 Melhorar Texto Alternativo de Ícones

**Problema:** Alguns ícones podem estar sendo anunciados desnecessariamente ou faltando descrições.

**Solução:** Adicionar `aria-hidden="true"` a ícones decorativos e `aria-label` a ícones informativos.

**Implementação:**

```tsx
// Ícone decorativo (texto adjacente já descreve)
<button>
  <Save size={20} aria-hidden="true" />
  Salvar
</button>

// Ícone informativo (sem texto adjacente)
<button aria-label="Salvar progresso">
  <Save size={20} aria-hidden="true" />
</button>

// Badge com ícone informativo
<span className="badge" aria-label="Dificuldade fácil, 5 pontos">
  <CheckCircle size={16} aria-hidden="true" />
  Fácil
</span>
```

---

## 8. Manutenção Contínua de Acessibilidade

Acessibilidade não é um projeto único, mas um processo contínuo que deve ser integrado ao fluxo de desenvolvimento.

### 8.1 Integração no Processo de Desenvolvimento

**Durante o Design:**
- Considerar acessibilidade desde o início do design de novas features.
- Garantir contraste adequado em mockups e protótipos.
- Planejar ordem de foco e navegação por teclado.
- Incluir estados de foco, hover e disabled em designs.

**Durante o Desenvolvimento:**
- Usar elementos HTML semânticos sempre que possível.
- Testar navegação por teclado durante desenvolvimento.
- Executar axe DevTools antes de commitar código.
- Seguir checklist de acessibilidade para novos componentes.

**Durante Code Review:**
- Revisor deve verificar aspectos básicos de acessibilidade:
  - Elementos interativos são focáveis?
  - Labels estão presentes em campos de formulário?
  - Contraste de cores é adequado?
  - Texto alternativo está presente em imagens?

**Durante QA:**
- Incluir testes de acessibilidade no plano de testes.
- Testar com teclado e leitor de tela antes de release.
- Validar com ferramentas automatizadas (axe, Lighthouse).

### 8.2 Testes Automatizados em CI/CD

Integrar testes de acessibilidade no pipeline de CI/CD para detectar regressões automaticamente.

**Ferramentas Recomendadas:**
- **axe-core:** Biblioteca JavaScript para testes automatizados de acessibilidade.
- **jest-axe:** Integração de axe-core com Jest para testes unitários.
- **cypress-axe:** Integração de axe-core com Cypress para testes E2E.

**Exemplo de Implementação (jest-axe):**

```bash
pnpm add -D jest-axe
```

```typescript
// client/src/components/Button.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

test('Button should not have accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**Exemplo de Implementação (Lighthouse CI):**

```bash
pnpm add -D @lhci/cli
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/dashboard", "http://localhost:3000/exercicios"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

```json
// package.json
{
  "scripts": {
    "lighthouse": "lhci autorun"
  }
}
```

### 8.3 Documentação e Treinamento

**Criar Guia de Acessibilidade Interno:**
- Documentar padrões de acessibilidade específicos do projeto.
- Incluir exemplos de código correto e incorreto.
- Manter lista de componentes acessíveis reutilizáveis.

**Treinar Equipe:**
- Realizar workshop de acessibilidade para desenvolvedores.
- Compartilhar recursos de aprendizado (artigos, vídeos, cursos).
- Incentivar uso de leitores de tela durante desenvolvimento.

**Recursos Recomendados:**
- [WebAIM: Web Accessibility In Mind](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Web Docs: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)

### 8.4 Feedback de Usuários

**Coletar Feedback de Usuários com Deficiência:**
- Incluir pergunta sobre acessibilidade em formulários de feedback.
- Realizar testes de usabilidade com usuários reais de tecnologias assistivas.
- Criar canal dedicado para reportar problemas de acessibilidade.

**Priorizar Correções:**
- Problemas reportados por usuários reais devem ter prioridade alta.
- Manter backlog de melhorias de acessibilidade.
- Revisar e atualizar plano de acessibilidade trimestralmente.

---

## 9. Conclusão

A acessibilidade digital é um compromisso contínuo com a inclusão e a igualdade de acesso à educação. Este plano de testes fornece uma base sólida para avaliar e melhorar a acessibilidade da plataforma Arquimedes, garantindo que todos os usuários, independentemente de suas capacidades, possam aprender matemática de forma eficaz e autônoma.

A implementação das correções prioritárias identificadas neste documento, combinada com testes regulares usando as ferramentas e metodologias descritas, posicionará o Arquimedes como uma plataforma educacional verdadeiramente inclusiva e acessível.

A acessibilidade não é apenas uma conformidade técnica com padrões WCAG, mas uma filosofia de design que beneficia todos os usuários ao criar interfaces mais claras, navegáveis e robustas. Ao investir em acessibilidade, o Arquimedes não apenas cumpre obrigações legais e éticas, mas também amplia seu alcance para um público mais diverso e demonstra compromisso com a educação universal.

---

## Referências

Este documento foi elaborado com base nas seguintes fontes oficiais e recursos reconhecidos pela comunidade de acessibilidade web:

1. [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/) - W3C Recommendation, 5 June 2018
2. [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) - W3C Working Draft
3. [WebAIM: Web Accessibility In Mind](https://webaim.org/) - Center for Persons with Disabilities, Utah State University
4. [MDN Web Docs: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) - Mozilla Developer Network
5. [axe Accessibility Testing Tools](https://www.deque.com/axe/) - Deque Systems
6. [NVDA Screen Reader](https://www.nvaccess.org/) - NV Access
7. [A11y Project](https://www.a11yproject.com/) - Community-driven effort to make digital accessibility easier
8. [Inclusive Components](https://inclusive-components.design/) - Heydon Pickering

---

**Documento preparado por:** Manus AI  
**Data de criação:** 23 de dezembro de 2024  
**Versão:** 1.0  
**Próxima revisão:** Após implementação das correções prioritárias
