import { Exception } from "../Exception/Exception.global";

Exception.Status(Exception.Code.ENVIRONMENT)
export class MissingPropertieError extends Exception {
    constructor(propertie: string) {
        super(`missing propertie(${propertie})`)
    }
}

type EnvVar = string | number | boolean | null

export function Environment(propertie: string, def: string): string;
export function Environment(propertie: string, def: number): number;
export function Environment(propertie: string, def: boolean): boolean;
export function Environment<T extends string | number | boolean>(propertie: string, def: null): T;
export function Environment<T extends string | number | boolean>(propertie: string, def: EnvVar): EnvVar {
    if (def === null) {
        if(!process.env[propertie]) throw new MissingPropertieError(propertie)
        return process.env[propertie] as T
    }

    if (typeof def === 'string') {
        return process.env[propertie]
            ? process.env[propertie] as string
            : def;
    }

    if (typeof def === 'boolean') {
        return process.env[propertie]
            ? process.env[propertie] as string === 'TRUE'
            : def;
    }

    if (typeof def === 'number') {
        return process.env[propertie]
            // tslint:disable-next-line: radix
            ? parseInt(process.env[propertie] as string)
            : def;
    }

    return process.env[propertie]
        ? process.env[propertie] as string
        : def;
};

export type Environment = <T>(propertie: string, def: T) => T

