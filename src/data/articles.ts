export interface Article {
  slug: string;
  url: string;
  title: string;
  seoTitle: string;
  h1: string;
  description: string;
  category: string;
  categorySlug: string;
  readTime: string;
  publishedDate: string;
  formattedDate: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  author: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'gamificacao-no-ensino-de-logistica',
    url: '/conteudos/gamificacao-no-ensino-de-logistica',
    title: 'Gamificação no Ensino de Logística: Como Aplicar em Sala de Aula',
    seoTitle: 'Gamificação no Ensino de Logística: Como Aplicar em Sala de Aula',
    h1: 'Gamificação no ensino de logística: como aplicar em sala de aula',
    description: 'Entenda como a gamificação pode ser usada no ensino de logística com desafios, decisões, interação e atividades práticas em sala de aula.',
    category: 'Gamificação',
    categorySlug: 'gamificacao',
    readTime: '6 min de leitura',
    publishedDate: '2026-09-25',
    formattedDate: '25 de setembro de 2026',
    image: '/hero.png',
    imageAlt: 'Alunos participando de dinâmica gamificada de logística em sala de aula',
    excerpt: 'Como elementos de jogos — regras, objetivos, consequências e pontuações — podem transformar conceitos teóricos de logística em experiências dinâmicas de tomada de decisão.',
    author: 'FormaPlay – Jogos Educacionais'
  },
  {
    slug: 'atividades-praticas-para-aulas-de-logistica',
    url: '/conteudos/atividades-praticas-para-aulas-de-logistica',
    title: '5 Atividades Práticas para Aulas de Logística',
    seoTitle: '5 Atividades Práticas para Aulas de Logística',
    h1: '5 atividades práticas para aulas de logística',
    description: 'Veja cinco ideias de atividades práticas para trabalhar planejamento, custos, rotas, imprevistos e tomada de decisão em aulas de logística.',
    category: 'Atividades Práticas',
    categorySlug: 'atividades-praticas',
    readTime: '7 min de leitura',
    publishedDate: '2026-09-25',
    formattedDate: '25 de setembro de 2026',
    image: '/desafio-logistico-2.png',
    imageAlt: 'Materiais e componentes práticos para aplicação em aulas e dinâmicas de logística',
    excerpt: 'Sugestões originais e aplicáveis de exercícios práticos para cursos técnicos e superiores: simulação de rotas, gestão de imprevistos, orçamento limitado e estudos de caso.',
    author: 'FormaPlay – Jogos Educacionais'
  },
  {
    slug: 'tomada-de-decisao-em-logistica',
    url: '/conteudos/tomada-de-decisao-em-logistica',
    title: 'Tomada de Decisão em Logística: Como Trabalhar em Cursos e Aulas',
    seoTitle: 'Tomada de Decisão em Logística: Como Trabalhar em Cursos e Aulas',
    h1: 'Como trabalhar tomada de decisão em cursos de logística',
    description: 'Veja formas práticas de trabalhar tomada de decisão em logística usando cenários, custos, riscos, prioridades e atividades em grupo.',
    category: 'Tomada de Decisão',
    categorySlug: 'tomada-de-decisao',
    readTime: '6 min de leitura',
    publishedDate: '2026-09-25',
    formattedDate: '25 de setembro de 2026',
    image: '/desafio-logistico-produto-mesa.png',
    imageAlt: 'Jogo de estratégia logística utilizado para simular decisões de rotas e custos',
    excerpt: 'Por que a tomada de decisão sob incerteza é o núcleo da competência logística e como estruturar critérios de avaliação formativa através de justificativas e trade-offs.',
    author: 'FormaPlay – Jogos Educacionais'
  }
];

export const CATEGORIES = [
  { name: 'Ensino de Logística', count: 3 },
  { name: 'Atividades Práticas', count: 2 },
  { name: 'Gamificação', count: 2 },
  { name: 'Jogos Educacionais', count: 3 },
  { name: 'Tomada de Decisão', count: 2 },
  { name: 'Metodologias Ativas', count: 3 }
];
