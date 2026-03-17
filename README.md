# GiftLink - Casamento

Este é um projeto NextJS para uma lista de presentes elegante e funcional.

## Repositório Remoto (Secundário)

Para enviar o seu código para o repositório no GitHub, você pode usar os seguintes comandos no seu terminal:

```bash
# Se você já tiver um origin, adicione este como secundário
git remote add secondary https://github.com/heliocalriz/casamento.git

# Para enviar os arquivos
git add .
git commit -m "Cópia do projeto para repositório secundário"
git push secondary main
```

## Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **React 19**
- **Genkit** (IA para descrições de presentes)
- **Tailwind CSS** & **ShadCN UI**
- **Lucide React** (Ícones)

## Estrutura do Projeto

- `src/app`: Rotas e páginas da aplicação.
- `src/components`: Componentes reutilizáveis de UI.
- `src/ai`: Fluxos de inteligência artificial usando Genkit.
- `src/lib`: Funções utilitárias, tipos e simulação de banco de dados.
