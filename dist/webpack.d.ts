type WebpackConfig = {
    entry?: string;
    mode?: string;
    output?: {
        path: string;
        filename: string;
    };
};
type Webpack = (arg0: WebpackConfig) => {
    outputFileSystem: {
        data: Record<string, string>;
    };
    run: (arg0: (err: Error, stats: {
        hasErrors: () => boolean;
        hasWarnings: () => boolean;
        toString: (arg0: {
            errorDetails: boolean;
            warnings: boolean;
        }) => string;
    }) => void) => void;
};
export declare function webpackCompile({ webpack, config, code, }: {
    webpack: Webpack;
    config?: WebpackConfig;
    code?: string;
}): Promise<string>;
export {};
