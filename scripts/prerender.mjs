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

// 1. HOME SCHEMAS & STATIC SEO CONTENT
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

const homeSchemasScript = `<script id="json-ld-schema" type="application/ld+json">${JSON.stringify([homeOrganizationSchema, homeWebsiteSchema])}</script>`;

// Inject schema and ensure home title/meta
let homeHtml = baseHtml;
if (homeHtml.includes('id="json-ld-schema"')) {
  homeHtml = homeHtml.replace(/<script id="json-ld-schema".*?<\/script>/s, homeSchemasScript);
} else {
  homeHtml = homeHtml.replace('</head>', `  ${homeSchemasScript}\n  </head>`);
}

fs.writeFileSync(path.join(distDir, 'index.html'), homeHtml);
console.log('[+] dist/index.html updated with JSON-LD Organization Schema');

// 2. DESAFIO LOGISTICO SCHEMAS & PRE-RENDERED HTML
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Desafio Logístico',
  image: [
    'https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png',
    'https://www.formaplayjogos.com.br/desafio-logistico-2.png'
  ],
  description: 'Jogo de tabuleiro educacional que transforma conceitos de logística em uma experiência prática de planejamento, estratégia e tomada de decisão.',
  brand: {
    '@type': 'Brand',
    name: 'FormaPlay'
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'FormaPlay – Jogos Educacionais',
    url: 'https://www.formaplayjogos.com.br'
  },
  category: 'Jogos Educacionais / Material Didático',
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'teacher',
    audienceType: 'Professores, estudantes de cursos técnicos e instituições de ensino'
  }
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Início',
      item: 'https://www.formaplayjogos.com.br/'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Desafio Logístico',
      item: 'https://www.formaplayjogos.com.br/desafio-logistico'
    }
  ]
};

const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Apresentação do Desafio Logístico – FormaPlay',
  description: 'Conheça o Desafio Logístico em 1 minuto: jogo educacional de logística para aprender na prática.',
  thumbnailUrl: 'https://img.youtube.com/vi/fs2an3x7TXs/hqdefault.jpg',
  uploadDate: '2024-06-01T00:00:00Z',
  embedUrl: 'https://www.youtube.com/embed/fs2an3x7TXs',
  contentUrl: 'https://youtu.be/fs2an3x7TXs'
};

const productSchemasScript = `<script id="json-ld-schema" type="application/ld+json">${JSON.stringify([productSchema, breadcrumbSchema, videoSchema])}</script>`;

let desafioHtml = baseHtml;
desafioHtml = desafioHtml.replace(
  /<title>.*?<\/title>/,
  '<title>Desafio Logístico | Jogo Educacional de Logística – FormaPlay</title>'
);
desafioHtml = desafioHtml.replace(
  /<meta name="title" content=".*?" \/>/,
  '<meta name="title" content="Desafio Logístico | Jogo Educacional de Logística – FormaPlay" />'
);
desafioHtml = desafioHtml.replace(
  /<meta name="description" content=".*?" \/>/,
  '<meta name="description" content="Conheça o Desafio Logístico, jogo de tabuleiro educacional que transforma o ensino de logística em uma experiência prática de planejamento e tomada de decisão." />'
);
desafioHtml = desafioHtml.replace(
  /<link rel="canonical" href=".*?" \/>/,
  '<link rel="canonical" href="https://www.formaplayjogos.com.br/desafio-logistico" />'
);
desafioHtml = desafioHtml.replace(
  /<meta property="og:title" content=".*?" \/>/,
  '<meta property="og:title" content="Desafio Logístico | Jogo Educacional de Logística – FormaPlay" />'
);
desafioHtml = desafioHtml.replace(
  /<meta property="og:description" content=".*?" \/>/,
  '<meta property="og:description" content="Conheça o Desafio Logístico, jogo de tabuleiro educacional que transforma o ensino de logística em uma experiência prática de planejamento e tomada de decisão." />'
);
desafioHtml = desafioHtml.replace(
  /<meta property="og:url" content=".*?" \/>/,
  '<meta property="og:url" content="https://www.formaplayjogos.com.br/desafio-logistico" />'
);
desafioHtml = desafioHtml.replace(
  /<meta property="og:image" content=".*?" \/>/,
  '<meta property="og:image" content="https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png" />'
);
desafioHtml = desafioHtml.replace(
  /<meta name="twitter:title" content=".*?" \/>/,
  '<meta name="twitter:title" content="Desafio Logístico | Jogo Educacional de Logística – FormaPlay" />'
);
desafioHtml = desafioHtml.replace(
  /<meta name="twitter:description" content=".*?" \/>/,
  '<meta name="twitter:description" content="Conheça o Desafio Logístico, jogo de tabuleiro educacional que transforma o ensino de logística em uma experiência prática de planejamento e tomada de decisão." />'
);
desafioHtml = desafioHtml.replace(
  /<meta name="twitter:image" content=".*?" \/>/,
  '<meta name="twitter:image" content="https://www.formaplayjogos.com.br/desafio-logistico-produto-mesa.png" />'
);

if (desafioHtml.includes('id="json-ld-schema"')) {
  desafioHtml = desafioHtml.replace(/<script id="json-ld-schema".*?<\/script>/s, productSchemasScript);
} else {
  desafioHtml = desafioHtml.replace('</head>', `  ${productSchemasScript}\n  </head>`);
}

// Inserir fallback semântico de noscript específico para a página do produto
desafioHtml = desafioHtml.replace(
  /<noscript>[\s\S]*?<\/noscript>/,
  `<noscript>
      <div style="padding: 2rem; text-align: center; font-family: sans-serif; background: #0f172a; color: #ffffff;">
        <h1>Desafio Logístico: jogo educacional de logística para aprender na prática</h1>
        <p>Jogo de tabuleiro educacional desenvolvido pela FormaPlay para 2 a 4 jogadores, simulando planejamento de rotas, custos e tomadas de decisão.</p>
        <p>Solicite seu orçamento: <a href="https://formaplay-orcamento.vercel.app/solicitar-orcamento" style="color: #f97316;">Solicitar Orçamento FormaPlay</a></p>
        <p>Contato: <a href="mailto:contato@formaplayjogos.com.br" style="color: #f97316;">contato@formaplayjogos.com.br</a></p>
      </div>
    </noscript>`
);

const desafioDir = path.join(distDir, 'desafio-logistico');
if (!fs.existsSync(desafioDir)) {
  fs.mkdirSync(desafioDir, { recursive: true });
}

fs.writeFileSync(path.join(desafioDir, 'index.html'), desafioHtml);
console.log('[+] dist/desafio-logistico/index.html generated with dedicated SEO tags and Product Schema');
