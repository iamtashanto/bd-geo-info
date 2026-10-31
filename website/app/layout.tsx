import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://bdgeoinfo.tashanto.com'),
  title: {
    default: 'bd-geo-info — Bangladesh Geographical Data Library',
    template: '%s | bd-geo-info',
  },
  description:
    'A lightweight TypeScript library with bilingual (EN/বাংলা) geographical data for Bangladesh — divisions, districts, upazilas, unions, and postcodes. Zero required dependencies.',
  keywords: [
    'bangladesh geographical data',
    'bangladesh npm package',
    'bd-geo-info',
    'bangladesh division district upazila',
    'bangladesh address library',
    'bangladesh typescript library',
    'bangla address form',
    'bd geo',
  ],
  authors: [{ name: 'TA Shanto', url: 'https://tashanto.com' }],
  creator: 'TA Shanto',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bdgeoinfo.tashanto.com',
    title: 'bd-geo-info — Bangladesh Geographical Data Library',
    description:
      'A lightweight TypeScript library with bilingual geographical data for Bangladesh. Zero dependencies. Works with React, Next.js, Vue, Angular, Node.js and more.',
    siteName: 'bd-geo-info',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'bd-geo-info',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bd-geo-info — Bangladesh Geographical Data Library',
    description:
      'A lightweight TypeScript library with bilingual geographical data for Bangladesh.',
    images: ['/og-image.png'],
    creator: '@iamtashanto',
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
      </body>
    </html>
  );
}

