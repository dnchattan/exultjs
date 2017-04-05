import * as path from 'path';
import * as fs from 'fs';
export function U7Exists(name: string) {
    let root = 'D:\\Games\\Ultima VII\\BG\\STATIC';
    fs.existsSync(path.join(root, name));
}

export function U7Open(name: string): Buffer {
    let root = 'D:\\Games\\Ultima VII\\BG\\STATIC';
    return fs.readFileSync(path.join(root, name));
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
