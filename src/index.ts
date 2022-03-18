import { createProxyMiddleware, Filter, Options } from "http-proxy-middleware";


interface configOptions extends Options{
  filter?: Filter
}

interface options {
  [url: string]: configOptions;
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
            optionSingleValue
          )
        );
      });
    },
  };
}
