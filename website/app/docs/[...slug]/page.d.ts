import type { Metadata } from 'next';
interface Props {
    params: {
        slug: string[];
    };
}
export declare function generateStaticParams(): Promise<any>;
export declare function generateMetadata({ params }: Props): Promise<Metadata>;
export default function DocSlugPage({ params }: Props): import("react").JSX.Element;
export {};
