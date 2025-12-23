import { getDb } from './db';
import { modules, pages } from '../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { readFileSync } from 'fs';

export async function seedLessons() {
  try {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    // Ler conteúdos
    const subtracao1 = readFileSync('/tmp/subtracao_aula1.md', 'utf-8');
    const subtracao2 = readFileSync('/tmp/subtracao_aula2.md', 'utf-8');
    const subtracao3 = readFileSync('/tmp/subtracao_aula3.md', 'utf-8');
    const porcentagem1 = readFileSync('/tmp/porcentagem_regra_tres.md', 'utf-8');
    const porcentagem2 = readFileSync('/tmp/porcentagem_proporcoes.md', 'utf-8');
    const porcentagem3 = readFileSync('/tmp/porcentagem_situacoes_reais.md', 'utf-8');

    // Obter IDs dos módulos
    const [subtracaoModule] = await db
      .select()
      .from(modules)
      .where(and(eq(modules.slug, 'subtracao'), eq(modules.disciplineId, 1)));

    const [porcentagemModule] = await db
      .select()
      .from(modules)
      .where(and(eq(modules.slug, 'porcentagem'), eq(modules.disciplineId, 1)));

    if (!subtracaoModule || !porcentagemModule) {
      throw new Error('Módulos não encontrados');
    }

    console.log(`Módulo Subtração ID: ${subtracaoModule.id}`);
    console.log(`Módulo Porcentagem ID: ${porcentagemModule.id}`);

    // Inserir aulas de Subtração
    const aulasSubtracao = [
      { title: 'O que é Subtrair?', slug: 'o-que-e-subtrair', content: subtracao1, duration: 20, order: 1 },
      { title: 'Subtração com Empréstimo', slug: 'subtracao-com-emprestimo', content: subtracao2, duration: 25, order: 2 },
      { title: 'Aplicações Práticas da Subtração', slug: 'aplicacoes-praticas-subtracao', content: subtracao3, duration: 20, order: 3 },
    ];

    for (const aula of aulasSubtracao) {
      await db.insert(pages).values({
        moduleId: subtracaoModule.id,
        title: aula.title,
        slug: aula.slug,
        mainText: aula.content,
        estimatedMinutes: aula.duration,
        order: aula.order,
      });
      console.log(`✅ Inserida: ${aula.title}`);
    }

    // Inserir aulas de Porcentagem (6 aulas: 3 antigas + 3 novas)
    const aulasPorcentagem = [
      { title: 'Conceito de Porcentagem', slug: 'conceito-porcentagem', content: 'Conteúdo básico de porcentagem', duration: 20, order: 1 },
      { title: 'Cálculos de Porcentagem', slug: 'calculos-porcentagem', content: 'Conteúdo de cálculos', duration: 25, order: 2 },
      { title: 'Aplicações de Porcentagem', slug: 'aplicacoes-porcentagem', content: 'Conteúdo de aplicações', duration: 20, order: 3 },
      { title: 'Regra de Três Simples', slug: 'regra-de-tres-simples', content: porcentagem1, duration: 25, order: 4 },
      { title: 'Proporções e Razões', slug: 'proporcoes-e-razoes', content: porcentagem2, duration: 20, order: 5 },
      { title: 'Porcentagem em Situações Reais', slug: 'porcentagem-situacoes-reais', content: porcentagem3, duration: 25, order: 6 },
    ];

    for (const aula of aulasPorcentagem) {
      await db.insert(pages).values({
        moduleId: porcentagemModule.id,
        title: aula.title,
        slug: aula.slug,
        mainText: aula.content,
        estimatedMinutes: aula.duration,
        order: aula.order,
      });
      console.log(`✅ Inserida: ${aula.title}`);
    }

    return { success: true, message: '🎉 Todas as 9 aulas foram inseridas com sucesso!' };
  } catch (error) {
    console.error('Erro ao inserir aulas:', error);
    return { success: false, error: String(error) };
  }
}
