# 🗄️ Guia do Banco de Dados - Arquimedes

Este documento fornece informações detalhadas sobre o banco de dados do projeto Arquimedes, incluindo schema, queries comuns, e procedimentos de manutenção.

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Schema Completo](#schema-completo)
3. [Relacionamentos](#relacionamentos)
4. [Acesso ao Banco](#acesso-ao-banco)
5. [Queries Úteis](#queries-úteis)
6. [Migrations](#migrations)
7. [Backup e Restore](#backup-e-restore)
8. [Performance](#performance)

---

## 🎯 Visão Geral

### Tecnologia

- **SGBD**: MySQL 8.0+ ou TiDB
- **ORM**: Drizzle ORM
- **Migrations**: Drizzle Kit
- **Charset**: utf8mb4 (suporte completo a Unicode)

### Estrutura

O banco de dados é organizado em **8 tabelas principais**:

1. **users** - Usuários autenticados
2. **disciplines** - Disciplinas (ex: Matemática Básica)
3. **modules** - Módulos dentro de disciplinas
4. **pages** - Páginas/aulas com conteúdo educacional
5. **exercises** - Exercícios fixos vinculados a páginas
6. **exerciseAttempts** - Tentativas de resolução de exercícios
7. **pageProgress** - Progresso do usuário por página
8. **achievements** - Conquistas dos usuários
9. **generatedExercises** - Exercícios gerados por IA

---

## 📊 Schema Completo

### Tabela: `users`

Armazena informações dos usuários autenticados via Manus OAuth.

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  loginMethod VARCHAR(64),
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lastSignedIn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**
- `id`: Identificador único interno
- `openId`: ID do Manus OAuth (único)
- `role`: Papel do usuário (user ou admin)

---

### Tabela: `disciplines`

Disciplinas disponíveis na plataforma.

```sql
CREATE TABLE disciplines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  `order` INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Exemplo:**
```sql
INSERT INTO disciplines (name, slug, description, `order`) 
VALUES ('Matemática Básica', 'matematica-basica', 'Fundamentos de matemática para adultos', 1);
```

---

### Tabela: `modules`

Módulos dentro de cada disciplina.

```sql
CREATE TABLE modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  disciplineId INT NOT NULL,
  name TEXT NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  `order` INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (disciplineId) REFERENCES disciplines(id) ON DELETE CASCADE,
  INDEX idx_modules_discipline (disciplineId)
);
```

**Relacionamento:**
- `disciplineId` → `disciplines.id`

---

### Tabela: `pages`

Páginas/aulas com conteúdo educacional.

```sql
CREATE TABLE pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  moduleId INT NOT NULL,
  title TEXT NOT NULL,
  slug VARCHAR(255) NOT NULL,
  `order` INT NOT NULL DEFAULT 0,
  mainText LONGTEXT,
  conceptSummary TEXT,
  videoUrl TEXT,
  estimatedMinutes INT NOT NULL DEFAULT 30,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (moduleId) REFERENCES modules(id) ON DELETE CASCADE,
  INDEX idx_pages_module (moduleId)
);
```

**Campos importantes:**
- `mainText`: Conteúdo principal da aula (suporta LaTeX)
- `conceptSummary`: Resumo dos conceitos aprendidos
- `estimatedMinutes`: Tempo estimado de estudo

---

### Tabela: `exercises`

Exercícios fixos vinculados a páginas.

```sql
CREATE TABLE exercises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pageId INT NOT NULL,
  `order` INT NOT NULL DEFAULT 0,
  type ENUM('simple_input', 'practical_problem', 'multiple_choice') NOT NULL,
  question TEXT NOT NULL,
  description TEXT,
  expectedAnswer TEXT NOT NULL,
  alternativeAnswers JSON,
  hints JSON,
  options JSON,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pageId) REFERENCES pages(id) ON DELETE CASCADE,
  INDEX idx_exercises_page (pageId)
);
```

**Campos JSON:**
- `alternativeAnswers`: Array de respostas aceitas como corretas
- `hints`: Array de dicas progressivas
- `options`: Opções para exercícios de múltipla escolha

**Exemplo:**
```sql
INSERT INTO exercises (pageId, `order`, type, question, expectedAnswer, alternativeAnswers)
VALUES (
  1, 
  1, 
  'simple_input', 
  'Complete: $7 + ___ = 15$', 
  '8',
  '["oito"]'
);
```

---

### Tabela: `exerciseAttempts`

Registra todas as tentativas de resolução de exercícios.

```sql
CREATE TABLE exerciseAttempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  exerciseId INT NOT NULL,
  answer TEXT NOT NULL,
  isCorrect BOOLEAN NOT NULL,
  attemptNumber INT NOT NULL DEFAULT 1,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (exerciseId) REFERENCES exercises(id) ON DELETE CASCADE,
  INDEX idx_attempts_user_exercise (userId, exerciseId),
  INDEX idx_attempts_created (createdAt)
);
```

**Uso:**
- Histórico completo de tentativas
- Análise de padrões de erro
- Métricas de aprendizado

---

### Tabela: `pageProgress`

Rastreia o progresso do usuário em cada página.

```sql
CREATE TABLE pageProgress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  pageId INT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  score INT NOT NULL DEFAULT 0,
  lastAccessedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (pageId) REFERENCES pages(id) ON DELETE CASCADE,
  UNIQUE INDEX idx_progress_user_page (userId, pageId),
  INDEX idx_progress_user (userId)
);
```

**Campos:**
- `completed`: Página foi marcada como concluída
- `score`: Pontuação de 0-100 baseada nos exercícios

---

### Tabela: `achievements`

Conquistas desbloqueadas pelos usuários.

```sql
CREATE TABLE achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  type VARCHAR(50) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  relatedId INT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_achievements_user (userId),
  INDEX idx_achievements_type (type)
);
```

**Tipos de conquistas:**
- `module_completed`: Módulo completo
- `perfect_score`: 100% em uma página
- `streak`: Sequência de dias estudando

---

### Tabela: `generatedExercises`

Exercícios personalizados gerados por IA.

```sql
CREATE TABLE generatedExercises (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  pageId INT NOT NULL,
  question TEXT NOT NULL,
  expectedAnswer TEXT NOT NULL,
  difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (pageId) REFERENCES pages(id) ON DELETE CASCADE,
  INDEX idx_generated_user (userId),
  INDEX idx_generated_page (pageId)
);
```

---

## 🔗 Relacionamentos

### Diagrama ER

```
users
  ├─→ exerciseAttempts (1:N)
  ├─→ pageProgress (1:N)
  ├─→ achievements (1:N)
  └─→ generatedExercises (1:N)

disciplines
  └─→ modules (1:N)
      └─→ pages (1:N)
          ├─→ exercises (1:N)
          ├─→ pageProgress (1:N)
          └─→ generatedExercises (1:N)

exercises
  └─→ exerciseAttempts (1:N)
```

### Cascade Delete

- Deletar uma **discipline** remove todos os módulos, páginas e exercícios relacionados
- Deletar um **user** remove todo seu progresso e tentativas
- Deletar uma **page** remove exercícios e progresso relacionados

---

## 🔌 Acesso ao Banco

### Via Aplicação

```typescript
import { getDb } from "./server/db";

const db = await getDb();
const disciplines = await db.select().from(disciplines);
```

### Via CLI (MySQL)

```bash
# Conexão local
mysql -h localhost -u root -p arquimedes

# Conexão remota
mysql -h <host> -u <user> -p<password> <database>

# Com SSL (TiDB Cloud)
mysql -h <host> -u <user> -p<password> --ssl-mode=VERIFY_IDENTITY --ssl-ca=/path/to/ca.pem <database>
```

### Via GUI

**Recomendações:**
- **TablePlus** (Mac/Windows/Linux)
- **DBeaver** (Open source, multiplataforma)
- **MySQL Workbench** (Oficial MySQL)

**String de conexão:**
```
mysql://user:password@host:port/database?ssl={"rejectUnauthorized":true}
```

---

## 🔍 Queries Úteis

### Estatísticas Gerais

```sql
-- Total de usuários
SELECT COUNT(*) as total_users FROM users;

-- Total de aulas
SELECT COUNT(*) as total_pages FROM pages;

-- Total de exercícios resolvidos
SELECT COUNT(*) as total_attempts FROM exerciseAttempts WHERE isCorrect = TRUE;
```

### Progresso de um Usuário

```sql
-- Páginas completadas por um usuário
SELECT 
  d.name as discipline,
  m.name as module,
  p.title as page,
  pp.score,
  pp.lastAccessedAt
FROM pageProgress pp
JOIN pages p ON pp.pageId = p.id
JOIN modules m ON p.moduleId = m.id
JOIN disciplines d ON m.disciplineId = d.id
WHERE pp.userId = 1 AND pp.completed = TRUE
ORDER BY pp.lastAccessedAt DESC;
```

### Exercícios mais Difíceis

```sql
-- Exercícios com menor taxa de acerto
SELECT 
  e.id,
  e.question,
  COUNT(*) as total_attempts,
  SUM(CASE WHEN ea.isCorrect THEN 1 ELSE 0 END) as correct_attempts,
  ROUND(SUM(CASE WHEN ea.isCorrect THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as success_rate
FROM exercises e
JOIN exerciseAttempts ea ON e.id = ea.exerciseId
GROUP BY e.id
HAVING total_attempts >= 10
ORDER BY success_rate ASC
LIMIT 10;
```

### Usuários Mais Ativos

```sql
-- Top 10 usuários por páginas completadas
SELECT 
  u.name,
  u.email,
  COUNT(pp.id) as pages_completed,
  AVG(pp.score) as avg_score
FROM users u
JOIN pageProgress pp ON u.id = pp.userId
WHERE pp.completed = TRUE
GROUP BY u.id
ORDER BY pages_completed DESC
LIMIT 10;
```

### Análise de Tentativas

```sql
-- Média de tentativas até acertar por exercício
SELECT 
  e.question,
  AVG(ea.attemptNumber) as avg_attempts,
  COUNT(DISTINCT ea.userId) as unique_users
FROM exercises e
JOIN exerciseAttempts ea ON e.id = ea.exerciseId
WHERE ea.isCorrect = TRUE
GROUP BY e.id
ORDER BY avg_attempts DESC;
```

---

## 🔄 Migrations

### Gerar Migration

```bash
# Após alterar drizzle/schema.ts
pnpm drizzle-kit generate
```

### Aplicar Migrations

```bash
# Aplica todas as migrations pendentes
pnpm db:push

# Ou manualmente
pnpm drizzle-kit migrate
```

### Rollback

```bash
# Drizzle não tem rollback automático
# Para reverter, crie uma nova migration com as alterações inversas
```

### Histórico de Migrations

```sql
-- Tabela de controle de migrations (criada automaticamente)
SELECT * FROM __drizzle_migrations;
```

---

## 💾 Backup e Restore

### Backup Completo

```bash
# Dump de todo o banco
mysqldump -h <host> -u <user> -p<password> arquimedes > backup_$(date +%Y%m%d).sql

# Com compressão
mysqldump -h <host> -u <user> -p<password> arquimedes | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Backup de Tabelas Específicas

```bash
# Apenas dados de usuários e progresso
mysqldump -h <host> -u <user> -p<password> arquimedes users pageProgress exerciseAttempts > user_data_backup.sql
```

### Restore

```bash
# Restaurar de backup
mysql -h <host> -u <user> -p<password> arquimedes < backup_20241223.sql

# Restaurar de backup comprimido
gunzip < backup_20241223.sql.gz | mysql -h <host> -u <user> -p<password> arquimedes
```

### Backup Automatizado

```bash
# Cron job para backup diário às 2h da manhã
0 2 * * * /usr/bin/mysqldump -h <host> -u <user> -p<password> arquimedes | gzip > /backups/arquimedes_$(date +\%Y\%m\%d).sql.gz
```

---

## ⚡ Performance

### Índices Existentes

```sql
-- Listar todos os índices
SELECT 
  TABLE_NAME,
  INDEX_NAME,
  GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) as COLUMNS
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'arquimedes'
GROUP BY TABLE_NAME, INDEX_NAME;
```

### Análise de Queries Lentas

```sql
-- Habilitar log de queries lentas
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2; -- 2 segundos

-- Ver queries lentas
SELECT * FROM mysql.slow_log ORDER BY query_time DESC LIMIT 10;
```

### EXPLAIN de Queries

```sql
-- Analisar plano de execução
EXPLAIN SELECT 
  p.title, 
  COUNT(e.id) as exercise_count
FROM pages p
LEFT JOIN exercises e ON p.id = e.pageId
WHERE p.moduleId = 1
GROUP BY p.id;
```

### Otimizações Recomendadas

1. **Índices Compostos** para queries frequentes:
```sql
CREATE INDEX idx_progress_user_completed ON pageProgress(userId, completed);
CREATE INDEX idx_attempts_exercise_correct ON exerciseAttempts(exerciseId, isCorrect);
```

2. **Particionamento** para tabelas grandes (futuro):
```sql
-- Particionar exerciseAttempts por data
ALTER TABLE exerciseAttempts
PARTITION BY RANGE (YEAR(createdAt)) (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

3. **Cache de Queries** (Redis - futuro):
```typescript
// Cache de disciplinas (raramente mudam)
const disciplines = await redis.get('disciplines:all') 
  || await db.select().from(disciplines);
```

---

## 🔧 Manutenção

### Verificar Integridade

```sql
-- Verificar integridade das tabelas
CHECK TABLE users, disciplines, modules, pages, exercises;

-- Reparar tabelas (se necessário)
REPAIR TABLE users;
```

### Otimizar Tabelas

```sql
-- Otimizar todas as tabelas
OPTIMIZE TABLE users, disciplines, modules, pages, exercises, 
                exerciseAttempts, pageProgress, achievements;
```

### Limpar Dados Antigos

```sql
-- Remover tentativas de exercícios com mais de 1 ano
DELETE FROM exerciseAttempts 
WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 YEAR);

-- Remover exercícios gerados não utilizados
DELETE FROM generatedExercises 
WHERE id NOT IN (SELECT DISTINCT exerciseId FROM exerciseAttempts)
  AND createdAt < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

### Monitoramento

```sql
-- Tamanho das tabelas
SELECT 
  TABLE_NAME,
  ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) AS size_mb
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'arquimedes'
ORDER BY size_mb DESC;

-- Contagem de registros
SELECT 
  TABLE_NAME,
  TABLE_ROWS
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'arquimedes';
```

---

## 📚 Referências

- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [TiDB Documentation](https://docs.pingcap.com/)

---

**Última atualização**: Dezembro 2024  
**Versão do Schema**: 0.2.0  
**Mantido por**: MSC Consultorias
