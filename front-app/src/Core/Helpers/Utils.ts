import { v4 as uuidv4 } from 'uuid';

export type ValueProvider<T> = T|(() => T);

export function getValue<T>(provider: ValueProvider<T>): T {
    if (provider instanceof Function) {
        return provider();
    }
    else {
        return provider;
    }
}


export function stringify(value: boolean): string {
    return value ? "true" : "false";
}

export function uuid(): string {
    return uuidv4();
}