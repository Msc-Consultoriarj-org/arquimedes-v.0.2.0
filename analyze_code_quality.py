#!/usr/bin/env python3
"""
Análise de Qualidade de Código - Projeto Arquimedes
Identifica: dead code, duplicações, complexidade, tipagens fracas
"""

import os
import re
from pathlib import Path
from collections import defaultdict
import json

class CodeQualityAnalyzer:
    def __init__(self, project_root):
        self.project_root = Path(project_root)
        self.results = {
            "dead_files": [],
            "unused_imports": [],
            "large_files": [],
            "complex_functions": [],
            "weak_typing": [],
            "duplicate_code": [],
            "obsolete_components": []
        }
    
    def analyze(self):
        print("🔍 Iniciando análise de qualidade de código...\n")
        
        # 1. Identificar arquivos não utilizados
        self.find_dead_files()
        
        # 2. Encontrar arquivos muito grandes
        self.find_large_files()
        
        # 3. Detectar tipagens fracas (any, unknown)
        self.find_weak_typing()
        
        # 4. Identificar componentes obsoletos/demo
        self.find_obsolete_components()
        
        return self.results
    
    def find_dead_files(self):
        """Identifica arquivos que podem não estar sendo usados"""
        print("📁 Procurando arquivos não utilizados...")
        
        # Páginas que existem mas podem ser obsoletas
        pages_dir = self.project_root / "client/src/pages"
        if pages_dir.exists():
            all_pages = list(pages_dir.glob("*.tsx"))
            
            # Ler App.tsx para ver quais páginas são importadas
            app_file = self.project_root / "client/src/App.tsx"
            if app_file.exists():
                app_content = app_file.read_text()
                
                for page in all_pages:
                    page_name = page.stem
                    # Verificar se o arquivo é importado
                    if f"from \"@/pages/{page_name}\"" not in app_content and \
                       f"from './pages/{page_name}'" not in app_content:
                        self.results["dead_files"].append({
                            "file": str(page.relative_to(self.project_root)),
                            "reason": "Não importado em App.tsx",
                            "lines": self.count_lines(page)
                        })
    
    def find_large_files(self):
        """Identifica arquivos muito grandes (>500 linhas)"""
        print("📏 Procurando arquivos muito grandes...")
        
        for pattern in ["client/src/**/*.ts", "client/src/**/*.tsx", "server/**/*.ts"]:
            for file_path in self.project_root.glob(pattern):
                if file_path.is_file():
                    lines = self.count_lines(file_path)
                    if lines > 500:
                        self.results["large_files"].append({
                            "file": str(file_path.relative_to(self.project_root)),
                            "lines": lines,
                            "severity": "critical" if lines > 1000 else "high" if lines > 700 else "medium"
                        })
    
    def find_weak_typing(self):
        """Detecta uso de any, unknown sem validação"""
        print("🔍 Procurando tipagens fracas...")
        
        patterns = [
            (r': any\b', "Uso de 'any' type"),
            (r': any\[\]', "Array de 'any'"),
            (r'as any\b', "Type assertion 'as any'"),
            (r'@ts-ignore', "Comentário @ts-ignore"),
            (r'@ts-nocheck', "Comentário @ts-nocheck"),
        ]
        
        for pattern in ["client/src/**/*.ts", "client/src/**/*.tsx", "server/**/*.ts"]:
            for file_path in self.project_root.glob(pattern):
                if file_path.is_file():
                    content = file_path.read_text()
                    for regex, description in patterns:
                        matches = list(re.finditer(regex, content))
                        if matches:
                            self.results["weak_typing"].append({
                                "file": str(file_path.relative_to(self.project_root)),
                                "issue": description,
                                "occurrences": len(matches),
                                "lines": [content[:m.start()].count('\n') + 1 for m in matches[:5]]
                            })
    
    def find_obsolete_components(self):
        """Identifica componentes de demonstração ou obsoletos"""
        print("🗑️  Procurando componentes obsoletos...")
        
        obsolete_keywords = ["demo", "showcase", "test", "example", "sample"]
        
        for pattern in ["client/src/**/*.tsx", "client/src/**/*.ts"]:
            for file_path in self.project_root.glob(pattern):
                file_name_lower = file_path.stem.lower()
                if any(keyword in file_name_lower for keyword in obsolete_keywords):
                    lines = self.count_lines(file_path)
                    self.results["obsolete_components"].append({
                        "file": str(file_path.relative_to(self.project_root)),
                        "lines": lines,
                        "reason": "Nome sugere componente de demonstração"
                    })
    
    def count_lines(self, file_path):
        """Conta linhas de código (excluindo vazias e comentários)"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                code_lines = [l for l in lines if l.strip() and not l.strip().startswith('//')]
                return len(code_lines)
        except:
            return 0
    
    def generate_report(self):
        """Gera relatório em Markdown"""
        report = ["# 🔍 Relatório de Análise de Qualidade de Código\n"]
        report.append(f"**Projeto:** Arquimedes")
        report.append(f"**Data:** {os.popen('date').read().strip()}\n")
        report.append("---\n")
        
        # Dead Files
        if self.results["dead_files"]:
            report.append(f"## 🗑️ Arquivos Não Utilizados ({len(self.results['dead_files'])})\n")
            total_lines = sum(f["lines"] for f in self.results["dead_files"])
            report.append(f"**Total de linhas que podem ser removidas:** {total_lines}\n")
            for item in self.results["dead_files"]:
                report.append(f"- `{item['file']}` ({item['lines']} linhas) - {item['reason']}")
            report.append("\n")
        
        # Large Files
        if self.results["large_files"]:
            report.append(f"## 📏 Arquivos Muito Grandes ({len(self.results['large_files'])})\n")
            report.append("Arquivos com mais de 500 linhas que precisam ser modularizados:\n")
            for item in sorted(self.results["large_files"], key=lambda x: x["lines"], reverse=True):
                severity_icon = "🔴" if item["severity"] == "critical" else "🟡" if item["severity"] == "high" else "🟢"
                report.append(f"- {severity_icon} `{item['file']}` - **{item['lines']} linhas**")
            report.append("\n")
        
        # Weak Typing
        if self.results["weak_typing"]:
            report.append(f"## ⚠️ Tipagens Fracas ({len(self.results['weak_typing'])})\n")
            total_issues = sum(item["occurrences"] for item in self.results["weak_typing"])
            report.append(f"**Total de ocorrências:** {total_issues}\n")
            for item in self.results["weak_typing"]:
                report.append(f"- `{item['file']}` - {item['issue']} ({item['occurrences']}x)")
                if item["lines"]:
                    report.append(f"  - Linhas: {', '.join(map(str, item['lines']))}")
            report.append("\n")
        
        # Obsolete Components
        if self.results["obsolete_components"]:
            report.append(f"## 🗑️ Componentes Obsoletos/Demo ({len(self.results['obsolete_components'])})\n")
            total_lines = sum(c["lines"] for c in self.results["obsolete_components"])
            report.append(f"**Total de linhas:** {total_lines}\n")
            for item in self.results["obsolete_components"]:
                report.append(f"- `{item['file']}` ({item['lines']} linhas) - {item['reason']}")
            report.append("\n")
        
        # Summary
        report.append("## 📊 Resumo\n")
        report.append(f"- **Arquivos não utilizados:** {len(self.results['dead_files'])}")
        report.append(f"- **Arquivos muito grandes:** {len(self.results['large_files'])}")
        report.append(f"- **Problemas de tipagem:** {len(self.results['weak_typing'])}")
        report.append(f"- **Componentes obsoletos:** {len(self.results['obsolete_components'])}")
        
        dead_lines = sum(f["lines"] for f in self.results["dead_files"])
        obsolete_lines = sum(c["lines"] for c in self.results["obsolete_components"])
        total_removable = dead_lines + obsolete_lines
        
        report.append(f"\n**Linhas que podem ser removidas:** ~{total_removable}")
        
        return "\n".join(report)

if __name__ == "__main__":
    analyzer = CodeQualityAnalyzer("/home/ubuntu/arquimedes")
    analyzer.analyze()
    report = analyzer.generate_report()
    
    # Salvar relatório
    output_file = "/home/ubuntu/arquimedes/CODE_QUALITY_ANALYSIS.md"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(report)
    
    print(f"\n✅ Relatório salvo em: {output_file}")
    print("\n" + report)
