import { Filter, Options } from "http-proxy-middleware";
interface configOptions extends Options {
    filter?: Filter;
}
interface options {
    [url: string]: configOptions;
}
export default function serverProxy(options: options): {
    name: string;
    configureServer(server: any): void;
};
export {};
