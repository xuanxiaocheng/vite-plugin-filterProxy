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

## filter proxy examples
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

[npm-url]: https://npmjs.com/package/vite-plugin-filter-proxy
[vite-url]: https://vitejs.dev
