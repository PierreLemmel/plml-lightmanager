import { v4 as uuidv4 } from 'uuid';

export function stringify(value: boolean): string {
    return value ? "true" : "false";
}

export function clamp(value: number, min: number, max: number): number {
    return value > min ? (value < max ? value : max) : min;
}

export function clampByte(value: number): number {
    return clamp(value, 0x00, 0xff);
}

export function uuid(): string {
    return uuidv4();
}


export function inverseMap<K, V>(map: Map<K, V>): Map<V, K> {

    const result = new Map<V, K>();
    map.forEach((value, key) => result.set(value, key));

    return result;
}