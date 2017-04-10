/// <reference types="node" />
export interface IFileSpec {
    name: string;
    index?: number;
}
export declare class U7Object {
    protected identifier: IFileSpec;
    readonly count: number;
    protected index: number;
    constructor(identifier: IFileSpec);
    read(): Promise<Buffer>;
}
