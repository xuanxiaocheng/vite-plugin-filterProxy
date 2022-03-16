@echo off
rem publish vite-plugin-filter-proxy to https://registry.npmjs.org/

set NPM_ARGS="--registry=https://registry.npmjs.org/"
npm run build && npm login %NPM_ARGS% && npm publish %NPM_ARGS%