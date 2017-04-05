export interface IFileSpec {
    name: string;
    index?: number;
}

export class U7Object {
    constructor(protected identifier: IFileSpec) {

    }
    protected index: number;

    public readonly count: number;
    public read(): Promise<Buffer> {
        throw new Error("not implemented");
    }
}