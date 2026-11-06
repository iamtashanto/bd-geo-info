import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingSupport } from '@/components/ui/floating-support';

export const metadata: Metadata = {
  metadataBase: new URL('https://bdgeoinfo.tashanto.com'),
  title: {
    default: 'bd-geo-info — Bangladesh Geographical Data Library',
    template: '%s | bd-geo-info',
  },
  description:
    'Complete Bangladesh geographical data for JavaScript & TypeScript — 8 divisions, 64 districts, 610 upazilas/thanas, 4,540 unions, 1,324 postcodes. Developed by TA Shanto.',
  keywords: [
    'bangladesh geographical data',
    'bangladesh npm package',
    'bd-geo-info',
    'bangladesh division district upazila',
    'bangladesh address library',
    'bangladesh typescript library',
    'bangla address form',
    'bd geo info',
    'TA Shanto',
    'tashanto',
    'bangladesh post codes',
    'bangladesh location search',
    'bangladesh address validation',
    'bangladesh postcode lookup',
    'bangladesh geolocation npm',
  ],
  authors: [{ name: 'TA Shanto', url: 'https://tashanto.com' }],
  creator: 'TA Shanto',
  publisher: 'TA Shanto',
  alternates: {
    canonical: 'https://bdgeoinfo.tashanto.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bdgeoinfo.tashanto.com',
    title: 'bd-geo-info — Bangladesh Geographical Data Library',
    description:
      'Lightweight, bilingual Bangladesh geographical data library with zero dependencies. Developed by TA Shanto.',
    siteName: 'bd-geo-info',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'bd-geo-info by TA Shanto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bd-geo-info — Bangladesh Geographical Data Library',
    description:
      'Lightweight, bilingual Bangladesh geographical data library. Zero dependencies. Developed by TA Shanto.',
    images: ['/og-image.png'],
    creator: '@iamtashanto',
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'bd-geo-info',
    operatingSystem: 'Any',
    applicationCategory: 'DeveloperApplication',
    description:
      'Complete Bangladesh geographical data for JavaScript & TypeScript — divisions, districts, upazilas, unions, postcodes.',
    url: 'https://bdgeoinfo.tashanto.com',
    author: {
      '@type': 'Person',
      name: 'TA Shanto',
      url: 'https://tashanto.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingSupport />
      </body>
    </html>
  );
}
