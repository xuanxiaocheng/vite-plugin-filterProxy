# vite-plugin-filter-proxy

Provide local proxy for [Vite](https://vitejs.dev).

## Install

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
# if using npm
npm i vite-plugin-filter-proxy -D
# if using yarn
yarn add vite-plugin-filter-proxy -D
```

### Run example

```bash
cd ./example
npm install
cd server
node index
cd ..
npm run dev
```

## Usage

- Config plugin in vite.config.ts

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import filterProxy from "../dist";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    filterProxy({
      "/": {
        target: "http://localhost:3000",
        /*  filter: ((reqPath, req) => req.method === 'POST') */
      },
    }),
  ],
  server: {
    port: 3001,
  },
});
```

## Module exports

- filterProxyOptions

```ts
interface configOptions {
  target: string;
  filter?: (pathname: string, req: Request) => boolean;
  pathRewrite?:
    | {
        [regexp: string]: string;
      }
    | ((path: string, req: Request) => string)
    | ((path: string, req: Request) => Promise<string>);
  router?:
    | {
        [hostOrPath: string]: httpProxy.ServerOptions["target"];
      }
    | ((req: Request) => httpProxy.ServerOptions["target"])
    | ((req: Request) => Promise<httpProxy.ServerOptions["target"]>);
  forward?: ProxyTargetUrl | undefined;
  /** Object to be passed to http(s).request. */
  agent?: any;
  /** Object to be passed to https.createServer(). */
  ssl?: any;
  /** If you want to proxy websockets. */
  ws?: boolean | undefined;
  /** Adds x- forward headers. */
  xfwd?: boolean | undefined;
  /** Verify SSL certificate. */
  secure?: boolean | undefined;
  /** Explicitly specify if we are proxying to another proxy. */
  toProxy?: boolean | undefined;
  /** Specify whether you want to prepend the target's path to the proxy path. */
  prependPath?: boolean | undefined;
  /** Specify whether you want to ignore the proxy path of the incoming request. */
  ignorePath?: boolean | undefined;
  /** Local interface string to bind for outgoing connections. */
  localAddress?: string | undefined;
  /** Changes the origin of the host header to the target URL. */
  changeOrigin?: boolean | undefined;
  /** specify whether you want to keep letter case of response header key */
  preserveHeaderKeyCase?: boolean | undefined;
  /** Basic authentication i.e. 'user:password' to compute an Authorization header. */
  auth?: string | undefined;
  /** Rewrites the location hostname on (301 / 302 / 307 / 308) redirects, Default: null. */
  hostRewrite?: string | undefined;
  /** Rewrites the location host/ port on (301 / 302 / 307 / 308) redirects based on requested host/ port.Default: false. */
  autoRewrite?: boolean | undefined;
  /** Rewrites the location protocol on (301 / 302 / 307 / 308) redirects to 'http' or 'https'.Default: null. */
  protocolRewrite?: string | undefined;
  /** rewrites domain of set-cookie headers. */
  cookieDomainRewrite?:
    | false
    | string
    | { [oldDomain: string]: string }
    | undefined;
  /** rewrites path of set-cookie headers. Default: false */
  cookiePathRewrite?:
    | false
    | string
    | { [oldPath: string]: string }
    | undefined;
  /** object with extra headers to be added to target requests. */
  headers?: { [header: string]: string } | undefined;
  /** Timeout (in milliseconds) when proxy receives no response from target. Default: 120000 (2 minutes) */
  proxyTimeout?: number | undefined;
  /** Timeout (in milliseconds) for incoming requests */
  timeout?: number | undefined;
  /** Specify whether you want to follow redirects. Default: false */
  followRedirects?: boolean | undefined;
  /** If set to true, none of the webOutgoing passes are called and it's your responsibility to appropriately return the response by listening and acting on the proxyRes event */
  selfHandleResponse?: boolean | undefined;
  /** Buffer */
  buffer?: stream.Stream | undefined;
  logLevel?: "debug" | "info" | "warn" | "error" | "silent";
  logProvider?: LogProviderCallback;
  onError?: OnErrorCallback;
  onProxyRes?: OnProxyResCallback;
  onProxyReq?: OnProxyReqCallback;
  onProxyReqWs?: OnProxyReqWsCallback;
  onOpen?: OnOpenCallback;
  onClose?: OnCloseCallback;
}

interface options {
  [url: string]: configOptions;
}
```

## filter proxy examples

- all request proxy to port 3000

```ts
export default defineConfig({
  plugins: [
    vue(),
    filterProxy({
      "/": {
        target: "http://localhost:3000",
      },
    }),
  ],
  server: {
    port: 3001,
  },
});
```

- only request methods "POST" proxy to port 3000

```ts
export default defineConfig({
  plugins: [
    vue(),
    filterProxy({
      "/": {
        target: "http://localhost:3000",
        filter: (reqPath, req) => req.method === "POST",
      },
    }),
  ],
  server: {
    port: 3001,
  },
});
```

## License

MIT

[npm-url]: https://npmjs.com/package/vite-plugin-filter-proxy
[vite-url]: https://vitejs.dev
