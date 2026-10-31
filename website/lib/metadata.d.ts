import type { Metadata } from 'next';
export declare const siteConfig: {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    github: string;
    npm: string;
    support: string;
};
export declare function createMetadata({ title, description, path, }: {
    title: string;
    description?: string;
    path?: string;
}): Metadata;
