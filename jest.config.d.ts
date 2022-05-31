export const roots: string[];
export const transform: {
    "^.+\\.ts(x)?$": string;
};
export const globals: {
    "ts-jest": {
        isolatedModules: boolean;
    };
};
export const testEnvironment: string;
export const maxWorkers: number;
export const testRegex: string;
export const moduleFileExtensions: string[];
