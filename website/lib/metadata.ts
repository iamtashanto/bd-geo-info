import type { Metadata } from 'next';

const baseUrl = 'https://bdgeoinfo.tashanto.com';

export const siteConfig = {
  name: 'bd-geo-info',
  description:
    'A lightweight TypeScript library with bilingual geographical data for Bangladesh — divisions, districts, upazilas, unions, postcodes.',
  url: baseUrl,
  ogImage: `${baseUrl}/og-image.png`,
  github: 'https://github.com/iamtashanto/bd-geo-info',
  npm: 'https://www.npmjs.com/package/bd-geo-info',
  support: 'https://www.supportkori.com/iamtashanto',
};

export function createMetadata({
  title,
  description,
  path = '',
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  return {
    title,
    description: description ?? siteConfig.description,
    openGraph: {
      title,
      description: description ?? siteConfig.description,
      url: `${baseUrl}${path}`,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? siteConfig.description,
    },
  };
}

