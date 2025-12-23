#!/usr/bin/env python3
"""
Script para atualizar o banco de dados com conteúdo expandido das páginas.
Execução: python3 update-database-content.py
"""

import mysql.connector
import os

# Conectar ao banco de dados
conn = mysql.connector.connect(
    host=os.getenv('DB_HOST', '127.0.0.1'),
    user=os.getenv('DB_USER', 'root'),
    password=os.getenv('DB_PASSWORD', ''),
    database=os.getenv('DB_NAME', 'arquimedes')
)

cursor = conn.cursor()

# Ler arquivos de conteúdo
with open('/home/ubuntu/arquimedes/content-adicao-pagina2.md', 'r', encoding='utf-8') as f:
    adicao_pag2 = f.read()

with open('/home/ubuntu/arquimedes/content-adicao-pagina3.md', 'r', encoding='utf-8') as f:
    adicao_pag3 = f.read()

with open('/home/ubuntu/arquimedes/content-subtracao-pagina1.md', 'r', encoding='utf-8') as f:
    subtracao_pag1 = f.read()

print("📝 Atualizando banco de dados com conteúdo expandido...\n")

# Atualizar Adição Página 2 (ID 2)
print("1️⃣ Atualizando Adição Página 2 (Reta Numérica)...")
cursor.execute("""
    UPDATE pages 
    SET mainText = %s, estimatedMinutes = 45, videoUrl = 'PLACEHOLDER_RETA_NUMERICA', updatedAt = NOW()
    WHERE id = 2
""", (adicao_pag2,))
print(f"✅ Página 2 atualizada! ({len(adicao_pag2.split())} palavras)\n")

# Atualizar Adição Página 3 (ID 3)
print("2️⃣ Atualizando Adição Página 3 (Exercícios)...")
cursor.execute("""
    UPDATE pages 
    SET mainText = %s, estimatedMinutes = 50, videoUrl = 'PLACEHOLDER_EXERCICIOS_ADICAO', updatedAt = NOW()
    WHERE id = 3
""", (adicao_pag3,))
print(f"✅ Página 3 atualizada! ({len(adicao_pag3.split())} palavras)\n")

# Atualizar Subtração Página 1 (ID 4)
print("3️⃣ Atualizando Subtração Página 1 (Conceito)...")
cursor.execute("""
    UPDATE pages 
    SET mainText = %s, estimatedMinutes = 45, videoUrl = 'PLACEHOLDER_SUBTRACAO_CONCEITO', updatedAt = NOW()
    WHERE id = 4
""", (subtracao_pag1,))
print(f"✅ Página 4 atualizada! ({len(subtracao_pag1.split())} palavras)\n")

# Commit das mudanças
conn.commit()

total_words = len(adicao_pag2.split()) + len(adicao_pag3.split()) + len(subtracao_pag1.split())
print(f"🎉 Todas as 3 páginas foram atualizadas com sucesso!")
print(f"📊 Total de palavras adicionadas: {total_words}")

# Fechar conexão
cursor.close()
conn.close()

print("\n✅ Banco de dados atualizado com sucesso!")
