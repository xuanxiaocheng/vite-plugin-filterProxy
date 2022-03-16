import type * as express from "express";
export interface Request extends express.Request {
}
interface configOptions {
    target: string;
    filter?: (pathname: string, req: Request) => boolean;
    rewrite?: {
        [regexp: string]: string;
    } | ((path: string, req: Request) => string) | ((path: string, req: Request) => Promise<string>);
    changeOrigin?: boolean;
}
interface options {
    [regexp: string]: configOptions;
}
export default function serverProxy(options: options): {
    name: string;
    configureServer(server: any): void;
};
export {};
