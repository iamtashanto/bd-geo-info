interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
}
export declare function CodeBlock({ code, language, filename, showLineNumbers }: CodeBlockProps): import("react").JSX.Element;
export {};
