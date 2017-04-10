"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function U7Exists(name) {
    var root = 'D:\\Games\\Ultima VII\\BG\\STATIC';
    return fs.existsSync(path.join(root, name));
}
exports.U7Exists = U7Exists;
function U7Open(name) {
    var root = 'D:\\Games\\Ultima VII\\BG\\STATIC';
    return fs.readFileSync(path.join(root, name));
}
exports.U7Open = U7Open;
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
exports.applyMixins = applyMixins;

//# sourceMappingURL=utils.js.map
