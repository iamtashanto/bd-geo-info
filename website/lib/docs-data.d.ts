export interface DocNavItem {
    title: string;
    href: string;
    description?: string;
}
export interface DocNavSection {
    title: string;
    items: DocNavItem[];
}
export declare const docsNav: DocNavSection[];
export declare function findDocBySlug(slug: string[]): DocNavItem | null;
export declare function getAdjacentDocs(currentHref: string): {
    prev: DocNavItem | null;
    next: DocNavItem | null;
};
