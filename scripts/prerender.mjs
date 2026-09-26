import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Run build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Helper to generate and save pre-rendered HTML
function createPrerenderedPage({
  subPath,
  title,
  description,
  canonicalUrl,
  ogImage = 'https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png',
  ogType = 'website',
  schemas,
  noscriptContent
}) {
  let html = baseHtml;

  html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  html = html.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${title}" />`);
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`);
  html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${ogImage}" />`);
  html = html.replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="${ogType}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${ogImage}" />`);

  const schemasScript = `<script id="json-ld-schema" type="application/ld+json">${JSON.stringify(schemas)}</script>`;
  if (html.includes('id="json-ld-schema"')) {
    html = html.replace(/<script id="json-ld-schema".*?<\/script>/s, schemasScript);
  } else {
    html = html.replace('</head>', `  ${schemasScript}\n  </head>`);
  }

  if (noscriptContent) {
    html = html.replace(
      /<noscript>[\s\S]*?<\/noscript>/,
      `<noscript>
      <div style="padding: 2rem; text-align: center; font-family: sans-serif; background: #0f172a; color: #ffffff;">
        ${noscriptContent}
      </div>
    </noscript>`
    );
  }

  const targetDir = subPath ? path.join(distDir, subPath) : distDir;
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
  console.log(`[+] Pre-rendered: ${subPath ? `dist/${subPath}/index.html` : 'dist/index.html'}`);
}

// 1. HOME SCHEMAS
const homeOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FormaPlay – Jogos Educacionais',
  legalName: 'FormaPlay Jogos Educacionais',
  url: 'https://www.formaplayjogos.com.br',
  logo: 'https://www.formaplayjogos.com.br/icone.png',
  image: 'https://www.formaplayjogos.com.br/hero.png',
  description: 'Empresa especializada no desenvolvimento de jogos educacionais físicos e experiências práticas de aprendizagem para escolas, professores e instituições de ensino.',
  email: 'contato@formaplayjogos.com.br',
  telephone: '+55-14-99844-2917',
  taxID: '66.710.107/0001-31',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'BR'
  },
  knowsAbout: [
    'Jogos Educacionais',
    'Metodologias Ativas',
    'Ensino de Logística',
    'Gamificação na Educação'
  ]
};

const homeWebsiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FormaPlay – Jogos Educacionais',
  url: 'https://www.formaplayjogos.com.br',
  inLanguage: 'pt-BR'
};

createPrerenderedPage({
  subPath: '',
  title: 'FormaPlay | Jogos Educacionais para Aprender na Prática',
  description: 'Jogos educacionais que transformam o aprendizado em experiências práticas. Ferramentas didáticas que estimulam estratégia, tomada de decisão e trabalho em equipe.',
  canonicalUrl: 'https://www.formaplayjogos.com.br/',
  ogImage: 'https://www.formaplayjogos.com.br/hero.png',
  ogType: 'website',
  schemas: [homeOrganizationSchema, homeWebsiteSchema]
});

// 2. DESAFIO LOGISTICO
const desafioWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Desafio Logístico | Jogo Educacional de Logística – FormaPlay',
  description: 'Conheça o Desafio Logístico, jogo de tabuleiro educacional que transforma o ensino de logística em uma experiência prática de planejamento e tomada de decisão.',
  url: 'https://www.formaplayjogos.com.br/desafio-logistico',
  inLanguage: 'pt-BR',
  publisher: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br',
    logo: 'https://www.formaplayjogos.com.br/icone.png'
  }
};

const desafioBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.formaplayjogos.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Desafio Logístico', item: 'https://www.formaplayjogos.com.br/desafio-logistico' }
  ]
};

const desafioVideoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Apresentação do Desafio Logístico – FormaPlay',
  description: 'Conheça o Desafio Logístico em 1 minuto: jogo educacional de logística para aprender na prática.',
  thumbnailUrl: 'https://img.youtube.com/vi/fs2an3x7TXs/hqdefault.jpg',
  uploadDate: '2024-06-01T00:00:00Z',
  embedUrl: 'https://www.youtube.com/embed/fs2an3x7TXs',
  contentUrl: 'https://youtu.be/fs2an3x7TXs'
};

createPrerenderedPage({
  subPath: 'desafio-logistico',
  title: 'Desafio Logístico | Jogo Educacional de Logística – FormaPlay',
  description: 'Conheça o Desafio Logístico, jogo de tabuleiro educacional que transforma o ensino de logística em uma experiência prática de planejamento e tomada de decisão.',
  canonicalUrl: 'https://www.formaplayjogos.com.br/desafio-logistico',
  ogImage: 'https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png',
  ogType: 'website',
  schemas: [desafioWebPageSchema, desafioBreadcrumbSchema, desafioVideoSchema],
  noscriptContent: `
    <h1>Desafio Logístico: jogo educacional de logística para aprender na prática</h1>
    <p>Jogo de tabuleiro educacional desenvolvido pela FormaPlay para 2 a 4 jogadores, simulando planejamento de rotas, custos e tomadas de decisão.</p>
    <p>Solicite seu orçamento: <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" style="color: #f97316;">Solicitar Orçamento FormaPlay</a></p>
    <p>Contato: <a href="mailto:contato@formaplayjogos.com.br" style="color: #f97316;">contato@formaplayjogos.com.br</a></p>
  `
});

// 3. LOGISTICA EM SALA DE AULA
const educadoresWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Logística em Sala de Aula | Atividades Práticas para Professores',
  description: 'Conheça atividades práticas, dinâmicas e jogos educacionais para tornar o ensino de logística mais participativo e próximo de situações reais de tomada de decisão.',
  url: 'https://www.formaplayjogos.com.br/logistica-em-sala-de-aula',
  inLanguage: 'pt-BR',
  publisher: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br',
    logo: 'https://www.formaplayjogos.com.br/icone.png'
  }
};

const educadoresBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.formaplayjogos.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Logística em Sala de Aula', item: 'https://www.formaplayjogos.com.br/logistica-em-sala-de-aula' }
  ]
};

createPrerenderedPage({
  subPath: 'logistica-em-sala-de-aula',
  title: 'Logística em Sala de Aula | Atividades Práticas para Professores',
  description: 'Conheça atividades práticas, dinâmicas e jogos educacionais para tornar o ensino de logística mais participativo e próximo de situações reais de tomada de decisão.',
  canonicalUrl: 'https://www.formaplayjogos.com.br/logistica-em-sala-de-aula',
  ogImage: 'https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png',
  ogType: 'website',
  schemas: [educadoresWebPageSchema, educadoresBreadcrumbSchema],
  noscriptContent: `
    <h1>Logística em sala de aula: atividades práticas para ensinar além da teoria</h1>
    <p>Guia didático da FormaPlay com atividades práticas, dinâmicas e jogos educacionais de logística para cursos técnicos e instituições de ensino.</p>
    <p>Conheça o Desafio Logístico: <a href="https://www.formaplayjogos.com.br/desafio-logistico" style="color: #f97316;">Jogo Educacional Desafio Logístico</a></p>
    <p>Solicite seu orçamento: <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" style="color: #f97316;">Solicitar Orçamento FormaPlay</a></p>
  `
});

// 4. CENTRAL DE CONTEÚDOS (HUB)
const conteudosWebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Conteúdos sobre Logística, Educação e Aprendizagem | FormaPlay',
  description: 'Conteúdos sobre ensino de logística, atividades práticas, gamificação, metodologias ativas e aprendizagem para professores e instituições.',
  url: 'https://www.formaplayjogos.com.br/conteudos',
  inLanguage: 'pt-BR',
  publisher: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br',
    logo: 'https://www.formaplayjogos.com.br/icone.png'
  }
};

const conteudosBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.formaplayjogos.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Conteúdos', item: 'https://www.formaplayjogos.com.br/conteudos' }
  ]
};

createPrerenderedPage({
  subPath: 'conteudos',
  title: 'Conteúdos sobre Logística, Educação e Aprendizagem | FormaPlay',
  description: 'Conteúdos sobre ensino de logística, atividades práticas, gamificação, metodologias ativas e aprendizagem para professores e instituições.',
  canonicalUrl: 'https://www.formaplayjogos.com.br/conteudos',
  ogImage: 'https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png',
  ogType: 'website',
  schemas: [conteudosWebPageSchema, conteudosBreadcrumbSchema],
  noscriptContent: `
    <h1>Conteúdos para transformar conhecimento em aprendizagem prática</h1>
    <p>Central de conteúdos da FormaPlay com artigos, ideias práticas e guias pedagógicos para professores e instituições de ensino de logística.</p>
    <p><a href="https://www.formaplayjogos.com.br/conteudos/gamificacao-no-ensino-de-logistica" style="color: #f97316;">Gamificação no Ensino de Logística</a></p>
    <p><a href="https://www.formaplayjogos.com.br/conteudos/atividades-praticas-para-aulas-de-logistica" style="color: #f97316;">5 Atividades Práticas para Aulas de Logística</a></p>
    <p><a href="https://www.formaplayjogos.com.br/conteudos/tomada-de-decisao-em-logistica" style="color: #f97316;">Tomada de Decisão em Logística</a></p>
  `
});

// 5. ARTIGO 1: GAMIFICAÇÃO NO ENSINO DE LOGÍSTICA
const art1Schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Gamificação no Ensino de Logística: Como Aplicar em Sala de Aula',
  description: 'Entenda como a gamificação pode ser usada no ensino de logística com desafios, decisões, interação e atividades práticas em sala de aula.',
  image: 'https://www.formaplayjogos.com.br/hero.png',
  datePublished: '2026-09-25T10:00:00Z',
  dateModified: '2026-09-25T10:00:00Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.formaplayjogos.com.br/conteudos/gamificacao-no-ensino-de-logistica'
  },
  author: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br'
  },
  publisher: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.formaplayjogos.com.br/icone.png'
    }
  }
};

const art1Breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.formaplayjogos.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Conteúdos', item: 'https://www.formaplayjogos.com.br/conteudos' },
    { '@type': 'ListItem', position: 3, name: 'Gamificação no Ensino de Logística', item: 'https://www.formaplayjogos.com.br/conteudos/gamificacao-no-ensino-de-logistica' }
  ]
};

createPrerenderedPage({
  subPath: 'conteudos/gamificacao-no-ensino-de-logistica',
  title: 'Gamificação no Ensino de Logística: Como Aplicar em Sala de Aula',
  description: 'Entenda como a gamificação pode ser usada no ensino de logística com desafios, decisões, interação e atividades práticas em sala de aula.',
  canonicalUrl: 'https://www.formaplayjogos.com.br/conteudos/gamificacao-no-ensino-de-logistica',
  ogImage: 'https://www.formaplayjogos.com.br/hero.png',
  ogType: 'article',
  schemas: [art1Schema, art1Breadcrumb],
  noscriptContent: `
    <h1>Gamificação no ensino de logística: como aplicar em sala de aula</h1>
    <p>Artigo pedagógico sobre como aplicar mecânicas de jogos, regras, tomada de decisão e feedbacks no ensino de logística para cursos técnicos e superiores.</p>
    <p><a href="https://www.formaplayjogos.com.br/conteudos" style="color: #f97316;">Ver todos os conteúdos</a> | <a href="https://www.formaplayjogos.com.br/desafio-logistico" style="color: #f97316;">Conhecer o Desafio Logístico</a></p>
  `
});

// 6. ARTIGO 2: 5 ATIVIDADES PRÁTICAS PARA AULAS DE LOGÍSTICA
const art2Schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '5 Atividades Práticas para Aulas de Logística',
  description: 'Veja cinco ideias de atividades práticas para trabalhar planejamento, custos, rotas, imprevistos e tomada de decisão em aulas de logística.',
  image: 'https://www.formaplayjogos.com.br/desafio-logistico-2.png',
  datePublished: '2026-09-25T10:00:00Z',
  dateModified: '2026-09-25T10:00:00Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.formaplayjogos.com.br/conteudos/atividades-praticas-para-aulas-de-logistica'
  },
  author: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br'
  },
  publisher: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.formaplayjogos.com.br/icone.png'
    }
  }
};

const art2Breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.formaplayjogos.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Conteúdos', item: 'https://www.formaplayjogos.com.br/conteudos' },
    { '@type': 'ListItem', position: 3, name: '5 Atividades Práticas para Aulas de Logística', item: 'https://www.formaplayjogos.com.br/conteudos/atividades-praticas-para-aulas-de-logistica' }
  ]
};

createPrerenderedPage({
  subPath: 'conteudos/atividades-praticas-para-aulas-de-logistica',
  title: '5 Atividades Práticas para Aulas de Logística',
  description: 'Veja cinco ideias de atividades práticas para trabalhar planejamento, custos, rotas, imprevistos e tomada de decisão em aulas de logística.',
  canonicalUrl: 'https://www.formaplayjogos.com.br/conteudos/atividades-praticas-para-aulas-de-logistica',
  ogImage: 'https://www.formaplayjogos.com.br/desafio-logistico-2.png',
  ogType: 'article',
  schemas: [art2Schema, art2Breadcrumb],
  noscriptContent: `
    <h1>5 atividades práticas para aulas de logística</h1>
    <p>Ideias e dinâmicas originais para aplicar em aulas de logística: planejamento de rotas, orçamento limitado, imprevistos, estudos de caso e jogos de tabuleiro.</p>
    <p><a href="https://www.formaplayjogos.com.br/conteudos" style="color: #f97316;">Ver todos os conteúdos</a> | <a href="https://www.formaplayjogos.com.br/desafio-logistico" style="color: #f97316;">Conhecer o Desafio Logístico</a></p>
  `
});

// 7. ARTIGO 3: TOMADA DE DECISÃO EM LOGÍSTICA
const art3Schema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tomada de Decisão em Logística: Como Trabalhar em Cursos e Aulas',
  description: 'Veja formas práticas de trabalhar tomada de decisão em logística usando cenários, custos, riscos, prioridades e atividades em grupo.',
  image: 'https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png',
  datePublished: '2026-09-25T10:00:00Z',
  dateModified: '2026-09-25T10:00:00Z',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.formaplayjogos.com.br/conteudos/tomada-de-decisao-em-logistica'
  },
  author: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br'
  },
  publisher: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.formaplayjogos.com.br/icone.png'
    }
  }
};

const art3Breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.formaplayjogos.com.br/' },
    { '@type': 'ListItem', position: 2, name: 'Conteúdos', item: 'https://www.formaplayjogos.com.br/conteudos' },
    { '@type': 'ListItem', position: 3, name: 'Tomada de Decisão em Logística', item: 'https://www.formaplayjogos.com.br/conteudos/tomada-de-decisao-em-logistica' }
  ]
};

createPrerenderedPage({
  subPath: 'conteudos/tomada-de-decisao-em-logistica',
  title: 'Tomada de Decisão em Logística: Como Trabalhar em Cursos e Aulas',
  description: 'Veja formas práticas de trabalhar tomada de decisão em logística usando cenários, custos, riscos, prioridades e atividades em grupo.',
  canonicalUrl: 'https://www.formaplayjogos.com.br/conteudos/tomada-de-decisao-em-logistica',
  ogImage: 'https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png',
  ogType: 'article',
  schemas: [art3Schema, art3Breadcrumb],
  noscriptContent: `
    <h1>Como trabalhar tomada de decisão em cursos de logística</h1>
    <p>Guia pedagógico sobre raciocínio estratégico, análise de trade-offs, riscos e critérios formativos de avaliação em logística.</p>
    <p><a href="https://www.formaplayjogos.com.br/conteudos" style="color: #f97316;">Ver todos os conteúdos</a> | <a href="https://www.formaplayjogos.com.br/desafio-logistico" style="color: #f97316;">Conhecer o Desafio Logístico</a></p>
  `
});

console.log('[✓] All 7 static pre-rendered routes generated successfully.');
