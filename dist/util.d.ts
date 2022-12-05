type TempFile = {
    path: string;
    filename: string;
    filepath: string;
    write: (arg0: string) => Promise<void>;
    remove: () => Promise<void>;
};
export declare function getTempFile(key?: string): TempFile;
export {};
