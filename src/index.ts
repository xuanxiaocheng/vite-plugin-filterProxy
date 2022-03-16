import { createProxyMiddleware } from "http-proxy-middleware";
import type * as express from "express";
export interface Request extends express.Request {}


interface configOptions {
  target: string;
  filter?: (pathname: string, req: Request) => boolean;
  rewrite?:
    | { [regexp: string]: string }
    | ((path: string, req: Request) => string)
    | ((path: string, req: Request) => Promise<string>);
  changeOrigin?: boolean;
}

interface options {
  [regexp: string]: configOptions;
}

export default function serverProxy(options: options) {
  return {
    name: "serverProxy",
    configureServer(server: any) {
      Object.keys(options).forEach((item) => {
        let optionSingleValue:configOptions = options[item]
        server.middlewares.use(
          item,
          createProxyMiddleware(
            optionSingleValue.filter || ((pathname, req) => true),
            {
              target: optionSingleValue.target,
              changeOrigin: optionSingleValue.changeOrigin || true,
              pathRewrite: optionSingleValue.rewrite || null,
            }
          )
        );
      });
    },
  };
}
