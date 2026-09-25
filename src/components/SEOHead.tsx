import React, { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://www.formaplayjogos.com.br/hero.png',
  ogType = 'website',
  schema,
}) => {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper function to set or update meta tag
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta description & general
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'title', title);
    setMetaTag('name', 'robots', 'index, follow');

    // 3. Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'FormaPlay – Jogos Educacionais');
    setMetaTag('property', 'og:locale', 'pt_BR');

    // 4. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 6. Schema JSON-LD
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const cleanupScript = document.getElementById('json-ld-schema');
      if (cleanupScript) {
        cleanupScript.remove();
      }
    };
  }, [title, description, canonicalUrl, ogImage, ogType, schema]);

  return null;
};
