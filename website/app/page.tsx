import { Hero } from '@/components/home/hero';
import { Features } from '@/components/home/features';
import { Installation } from '@/components/home/installation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'bd-geo-info — Bangladesh Geographical Data Library',
  description:
    'A lightweight TypeScript library with bilingual (EN/বাংলা) geographical data for Bangladesh — 8 divisions, 64 districts, 610 upazilas, 4540 unions, 1324 postcodes. Zero required dependencies.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Installation />
    </>
  );
}

