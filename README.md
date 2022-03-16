# vite-plugin-mock-server

[![npm][npm-img]][npm-url]

Provide local mocks for [Vite](https://vitejs.dev).

A mock server plugin for [Vite](https://vitejs.dev), developed based on TypeScript. And support using TypeScript and JavaScript to write Mock API. When the Mock API file is modified, it will be hot updated automatically.

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
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import filterProxy from '../dist';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        filterProxy({
            '/': {
                target: 'http://localhost:3000',
                /*  filter: ((reqPath, req) => req.method === 'POST') */
            }
        })
    ],
    server: {
        port: 3001
    }
})
```

## Module exports

- filterProxyOptions

```ts
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
```

## Mock file examples
- all request proxy to port 3000
```ts
export default defineConfig({
    plugins: [
        vue(),
        filterProxy({
            '/': {
                target: 'http://localhost:3000',
            }
        })
    ],
    server: {
        port: 3001
    }
})
```

- only request methods "POST" proxy to port 3000
```ts
export default defineConfig({
    plugins: [
        vue(),
        filterProxy({
            '/': {
                target: 'http://localhost:3000',
                 filter: ((reqPath, req) => req.method === 'POST')
            }
        })
    ],
    server: {
        port: 3001
    }
})
```

## License

MIT

[npm-url]: https://npmjs.com/package/vite-plugin-mock-server
[vite-url]: https://vitejs.dev