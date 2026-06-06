# Quinta do Escuteiro

Site moderno do Centro Escutista Quinta do Escuteiro (Junta Regional Leiria-Fátima, CNE), Batalha.

## Tecnologias

- React 19 + TypeScript
- Vite
- Sass (SCSS modular por componente)
- Framer Motion (animações)

## Estrutura

```
src/
├── styles/              # Globais partilhados
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _layout.scss     # .container, .section, …
│   ├── _buttons.scss
│   ├── _tags.scss
│   ├── global.scss
│   └── main.scss        # ponto de entrada dos estilos
└── components/
    ├── Header/
    │   ├── Header.tsx
    │   ├── Header.scss
    │   └── index.ts
    ├── Hero/
    ├── About/
    ├── Activities/
    ├── ActivityCard/
    ├── ActivityModal/
    ├── Contact/
    └── Footer/
```

Cada componente importa o seu próprio `.scss`. Variáveis e mixins ficam em `src/styles/`.

## Comandos

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # produção
npm run preview  # pré-visualizar build
```

## Reservas (Google Form)

A secção Reservas mostra o **Google Form oficial** num `<iframe>` (`viewform?embedded=true`). O botão «Abrir no Google» usa o mesmo URL em modo normal (`viewform`). Para mudar de formulário, edita `reservationFormUrl` e `reservationFormEmbedUrl` em `src/data/site.ts` (mantém o mesmo ID de formulário nos dois, com `?embedded=true` só no embebido).

## Conteúdo

- Logotipo original extraído do site [quintadoescuteiro.escutismo.pt](https://quintadoescuteiro.escutismo.pt)
- 16 atividades pedagógicas com filtros por categoria
